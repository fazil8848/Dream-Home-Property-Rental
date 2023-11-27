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
            query:()=>({
                url:`${USERS_URL}/getPropertiesuser`,
                method: 'GET',
            })
        }),
        getSingleProperty: builder.mutation({
            query: (id)=>({
                url :`${USERS_URL}/getSingleProperty?id=${id}`,
                method: 'GET'
            })
        })
    })
})

export const { useLoginMutation, useLogoutMutation, useRegisterMutation, useVerifyUserMutation, useGetPropertiesuserMutation, useGetSinglePropertyMutation } = usersApiSclice;