import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { RootState } from "@/lib/store";
import type { APIResponse } from "@/types/api.types";
import type {
  Token,
  UserCreate,
  UserLogin,
  UserResponse,
} from "@/types/auth.types";

const baseQuery = fetchBaseQuery({
  baseUrl: process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000",
  prepareHeaders: (headers, { getState }) => {
    const token = (getState() as RootState).auth.accessToken;
    if (token) {
      headers.set("authorization", `Bearer ${token}`);
    }
    return headers;
  },
});

export const voxcheckApiSlice = createApi({
  reducerPath: "voxcheckApi",
  baseQuery,
  tagTypes: ["User", "Claim"],
  endpoints: (builder) => ({
    login: builder.mutation<APIResponse<Token>, UserLogin>({
      query: (credentials) => ({
        url: "/v1/auth/login",
        method: "POST",
        body: credentials,
      }),
    }),
    register: builder.mutation<APIResponse<UserResponse>, UserCreate>({
      query: (data) => ({
        url: "/v1/auth/signup",
        method: "POST",
        body: data,
      }),
    }),
    refresh: builder.mutation<APIResponse<Token>, { refresh_token: string }>({
      query: (data) => ({
        url: "/v1/auth/refresh",
        method: "POST",
        body: data,
      }),
    }),
    logout: builder.mutation<void, { refresh_token: string }>({
      query: (data) => ({
        url: "/v1/auth/logout",
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const {
  useLoginMutation,
  useRegisterMutation,
  useRefreshMutation,
  useLogoutMutation,
} = voxcheckApiSlice;
