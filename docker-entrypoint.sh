#!/bin/sh
set -e

if [ "${USE_NGINX:-false}" = "true" ]; then
  # ---------- VPS mode: Nginx in front of Next.js ----------
  # Nginx listens on NGINX_PORT (default 80). Next.js lives on localhost:3000.
  export NGINX_PORT="${NGINX_PORT:-80}"
  envsubst '$NGINX_PORT' < /etc/nginx/nginx.conf.template > /etc/nginx/http.d/default.conf

  PORT=3000 HOSTNAME=127.0.0.1 su-exec nextjs node /app/server.js &
  NODE_PID=$!

  nginx -g 'daemon off;' &
  NGINX_PID=$!

  stop() {
    echo "Shutting down..."
    kill -TERM "$NODE_PID" "$NGINX_PID" 2>/dev/null || true
    wait "$NODE_PID" 2>/dev/null || true
    wait "$NGINX_PID" 2>/dev/null || true
  }
  trap stop INT TERM

  # If either process dies, exit the container.
  wait -n "$NODE_PID" "$NGINX_PID"
  stop
else
  # ---------- Render mode: Next.js direct ----------
  # Render injects $PORT; we just need to bind to 0.0.0.0 (already set via ENV).
  exec su-exec nextjs node /app/server.js
fi