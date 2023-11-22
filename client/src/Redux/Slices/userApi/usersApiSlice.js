import { apiSlice } from '../apiSlice';
const USERS_URL = process.env.REACT_APP_USERS_URL;

export const usersApiSclice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        login: builder.mutation({
            query: (data) => ({
                url: `${USERS_URL}/loginUser`,
                method: 'POST',
                body: data
            })
        }),
        register: builder.mutation({
            query: (data) => ({
                url: `${USERS_URL}/registerUser`,
                method: 'POST',
                body: data
            })
        }),
        logout: builder.mutation({
            query: () => ({
                url: `${USERS_URL}/logOutUser`,
                method: 'POST',
            })
        }),
        verifyUser: builder.mutation({
            query: (id) => ({
                url: `${USERS_URL}/verifyUser/${id}`,
                method: 'PUT',
            })
        }),
    })
})

export const { useLoginMutation, useLogoutMutation, useRegisterMutation, useVerifyUserMutation } = usersApiSclice;