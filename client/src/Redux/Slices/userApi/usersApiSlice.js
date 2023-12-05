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
        getPropertiesuser: builder.mutation({
            query: () => ({
                url: `${USERS_URL}/getPropertiesuser`,
                method: 'GET',
            })
        }),
        getSingleProperty: builder.mutation({
            query: (id) => ({
                url: `${USERS_URL}/getSingleProperty?id=${id}`,
                method: 'GET'
            })
        }),
        getUserInfo: builder.mutation({
            query: (id) => ({
                url: `${USERS_URL}/getUserInfo?id=${id}`,
                method: 'GET',
            })
        }),
        updateUser: builder.mutation({
            query: ({ id, data }) => ({
                url: `${USERS_URL}/profile?id=${id}`,
                method: 'PUT',
                body: data,
            })
        }),
        checkPass: builder.mutation({
            query: ({ id, data }) => ({
                url: `${USERS_URL}/checkPass?id=${id}`,
                method: 'POST',
                body: data,
            })
        }),
        updatePass: builder.mutation({
            query: ({ id, data }) => ({
                url: `${USERS_URL}/updatePass?id=${id}`,
                method: 'PUT',
                body: data,
            })
        }),
        bookProperty: builder.mutation({
            query: ({bookingInfo}) => ({
                url: `${USERS_URL}/bookProperty`,
                method: "POST",
                body: bookingInfo
            })
        })
    })
})

export const {
    useLoginMutation, useLogoutMutation, useRegisterMutation,
    useVerifyUserMutation, useGetPropertiesuserMutation,
    useGetSinglePropertyMutation, useGetUserInfoMutation,
    useUpdateUserMutation, useCheckPassMutation, useUpdatePassMutation,
    useBookPropertyMutation,
} = usersApiSclice;