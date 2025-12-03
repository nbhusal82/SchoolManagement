import { indexSlice } from "./indexSlice";

export const authApi = indexSlice.injectEndpoints({
  endpoints: (builder) => ({
    signout: builder.mutation({
      query: () => ({
        url: "/auth/signout",
        method: "POST",
      }),
      providesTags: ["auth"],
    }),
  }),
});
export const { useSignoutMutation } = authApi;
