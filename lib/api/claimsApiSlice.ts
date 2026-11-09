import { voxcheckApiSlice } from "./apiSlice";
import type { ClaimRead, ClaimPage, ClaimReview } from "@/types/claim.types";
import type { APIResponse } from "@/types/api.types";

export const claimsApiSlice = voxcheckApiSlice.injectEndpoints({
  endpoints: (builder) => ({
    listClaims: builder.query<
      APIResponse<ClaimPage>,
      { page?: number; page_size?: number; status?: string }
    >({
      query: (params) => ({
        url: "/v1/claims",
        params,
      }),
      providesTags: (result) =>
        result?.data?.items
          ? [
              ...result.data.items.map(({ id }) => ({
                type: "Claim" as const,
                id,
              })),
              { type: "Claim", id: "LIST" },
            ]
          : [{ type: "Claim", id: "LIST" }],
    }),
    getClaim: builder.query<APIResponse<ClaimRead>, string>({
      query: (id) => `/v1/claims/${id}`,
      providesTags: (_result, _error, id) => [{ type: "Claim", id }],
    }),
    reviewClaim: builder.mutation<
      APIResponse<ClaimRead>,
      { id: string; data: ClaimReview }
    >({
      query: ({ id, data }) => ({
        url: `/v1/claims/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: (_result, _error, { id }) => [
        { type: "Claim", id },
        { type: "Claim", id: "LIST" },
      ],
    }),
  }),
});

export const { useListClaimsQuery, useGetClaimQuery, useReviewClaimMutation } =
  claimsApiSlice;
