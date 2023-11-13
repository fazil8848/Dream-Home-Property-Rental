import { apiSlice } from '../apiSlice';
const ADMIN_URL = 'http://localhost:5000/admin';

const adminApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        adminLogin: builder.mutation({
            query: (data) => ({
                url: `${ADMIN_URL}/login`,
                method: 'POST',
                body: data,
            }),
        }),
        adminLogout: builder.mutation({
            query: () => ({
                url: `${ADMIN_URL}/logout`,
                method: 'POST',
            })
        }),
        getUsers: builder.mutation({
            query: () => ({
                url: `${ADMIN_URL}/getUsers`,
                method: 'GET',
            })
        }),
        blockUser: builder.mutation({
            query: (data) => ({
                url: `${ADMIN_URL}/blockUser`,
                method: 'PUT',
                body: data,
            })
        }),
        getOwners: builder.mutation({
            query: ()=>({
                url: `${ADMIN_URL}/getOwners`,
                method: 'GET'
            })
        })
        ,
        blockOwner: builder.mutation({
            query: (data) => ({
                url: `${ADMIN_URL}/blockOwner`,
                method: 'PUT',
                body: data,
            })
        })
    })
})

export const { useAdminLoginMutation, useAdminLogoutMutation, useGetUsersMutation, useBlockUserMutation, useBlockOwnerMutation, useGetOwnersMutation } = adminApiSlice