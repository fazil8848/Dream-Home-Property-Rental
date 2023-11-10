import { apiSlice } from '../apiSlice';
const ADMIN_URL = 'http://localhost:5000/admin';

const adminApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        adminLogin: builder.mutation({
            query: (data) => ({
                url: `${ADMIN_URL}/login`,
                method: 'POST',
                body: data,
            })
        })
    })
})

export const { useAdminLoginMutation } = adminApiSlice