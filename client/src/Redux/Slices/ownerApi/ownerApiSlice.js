import { apiSlice } from "../apiSlice";
const OWNER_URL = process.env.REACT_APP_OWNER_URL

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
            query: (data) => ({
                url: `${OWNER_URL}/kyc`,
                method: 'POST',
                body: data,
            })
        }),
        getOwner: builder.mutation({
            query: (id) => ({
                url: `${OWNER_URL}/getOwner?id=${id}`,
                method: 'GET',
            })
        }),
        updateOwner: builder.mutation({
            query: (data) => ({
                url: `${OWNER_URL}/updateOwner`,
                method: 'POST',
                body: data,
            })
        }),
        addProperties: builder.mutation({
            query: (data) => ({
                url: `${OWNER_URL}/addProperties`,
                method: 'POST',
                body: data,
            })
        }),
        getProperties: builder.mutation({
            query: ({ id }) => ({
                url: `${OWNER_URL}/getProperties/${id}`,
                method: 'GET',
            })
        }),
        getProperty: builder.mutation({
            query: (id) => ({
                url: `${OWNER_URL}/getProperty/${id}`,
                method: 'GET',
            })
        }),
        editProperty: builder.mutation({
            query: ({ propertyData, id }) => ({
                url: `${OWNER_URL}/editProperty?id=${id}`,
                method: 'POST',
                body: propertyData,
            })
        }),
        deleteImage: builder.mutation({
            query: (data) => ({
                url: `${OWNER_URL}/deleteImage`,
                method: "DELETE",
                body: data
            })
        }),
        getOwnerConversations: builder.mutation({
            query: (id) => ({
                url: `${OWNER_URL}/getConversations?userId=${id}`,
                method: 'GET',
            })
        }),
        getOwnerMessages: builder.mutation({
            query: (data) => ({
                url: `${OWNER_URL}/getConversationMessages`,
                method: "POST",
                body: data
            })
        }),
        sendOwnerMessage: builder.mutation({
            query: (data) => ({
                url: `${OWNER_URL}/sendMessage`,
                method: 'POST',
                body: data
            })
        })
    })
})

export const {
    useOwnerLoginMutation, useOwnerSignupMutation, useOwnerVerifyMutation,
    useOwnerLogoutMutation, useAddKycMutation, useGetOwnerMutation,
    useUpdateOwnerMutation, useAddPropertiesMutation, useGetPropertiesMutation,
    useGetPropertyMutation, useEditPropertyMutation, useDeleteImageMutation,
    useGetOwnerConversationsMutation, useGetOwnerMessagesMutation, 
    useSendOwnerMessageMutation,
} = ownerApiSlice;