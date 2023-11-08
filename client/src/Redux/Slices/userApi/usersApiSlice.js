import { ApiProvider } from '@reduxjs/toolkit/dist/query/react';
import { apiSlice } from '../apiSlice';
const USERS_URL = 'http://localhost:5000';

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
        })
    })
})

export const { useLoginMutation, useLogoutMutation, useRegisterMutation } = usersApiSclice;