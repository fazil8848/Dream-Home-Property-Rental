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
        })
    })
})

export const { useAdminLoginMutation, useAdminLogoutMutation } = adminApiSlice