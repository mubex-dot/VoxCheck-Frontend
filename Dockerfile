# syntax=docker/dockerfile:1

# ---------- deps ----------
FROM node:22-alpine AS deps
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci

# ---------- builder ----------
FROM node:22-alpine AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

ARG NEXT_PUBLIC_API_URL
ENV NEXT_PUBLIC_API_URL=${NEXT_PUBLIC_API_URL}

RUN npm run build

# ---------- runner ----------
FROM node:22-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production
# Defaults for VPS/Nginx mode; Render overrides PORT at runtime.
ENV PORT=3000
ENV HOSTNAME=0.0.0.0

RUN apk add --no-cache nginx su-exec gettext \
 && addgroup -g 1001 -S nodejs \
 && adduser -S nextjs -u 1001 -G nodejs \
 && mkdir -p /var/cache/nginx /var/log/nginx /var/tmp/nginx /run/nginx

COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

# Nginx config (only used when USE_NGINX=true)
COPY nginx.conf /etc/nginx/nginx.conf.template

COPY docker-entrypoint.sh /usr/local/bin/docker-entrypoint.sh
RUN chmod +x /usr/local/bin/docker-entrypoint.sh

EXPOSE 3000 80
ENTRYPOINT ["docker-entrypoint.sh"]