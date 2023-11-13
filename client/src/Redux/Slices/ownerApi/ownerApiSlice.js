import { apiSlice } from "../apiSlice";
const OWNER_URL = 'http://localhost:5000/owner';

const ownerApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        ownerLogin: builder.mutation({
            query: (data) => ({
                url: `${OWNER_URL}/login`,
                method: 'POST',
                body: data,
            })
        }),
        ownerSignup: builder.mutation({
            query: (data) => ({
                url: `${OWNER_URL}/signup`,
                method: 'POST',
                body: data
            })
        }),
        ownerVerify: builder.mutation({
            query: (id) => ({
                url: `${OWNER_URL}/verifyOwner/${id}`,
                method: 'PUT'
            })
        }),
        ownerLogout: builder.mutation({
            query: () => ({
                url: `${OWNER_URL}/logout`,
                method: 'POST'
            })
        }),
        addKyc: builder.mutation({
            query: (data)=>({
                url:`${OWNER_URL}/kyc`,
                method:'POST',
                body: data,
            })
        }),
        getOwner: builder.mutation({
            query: (id) => ({
                url: `${OWNER_URL}/getOwner`,
                method: 'POST',
                body: {id},
            })
        }),
    })
})

export const { useOwnerLoginMutation, useOwnerSignupMutation, useOwnerVerifyMutation, useOwnerLogoutMutation, useAddKycMutation, useGetOwnerMutation } = ownerApiSlice;