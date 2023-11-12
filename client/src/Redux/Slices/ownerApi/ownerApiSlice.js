import { apiSlice } from "../apiSlice";
const OWNER_URL = 'http://localhost:5000/owner';

const ownerApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        ownerSignup: builder.mutation({
            query: (data) => ({
                url: `${OWNER_URL}/login`,
                method: 'POST',
                body: data,
            })
        })
    })
})

export const { useOwnerSignupMutation } = ownerApiSlice;