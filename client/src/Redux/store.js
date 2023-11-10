import { configureStore } from '@reduxjs/toolkit'
import userReducer from './Slices/authSlice';
import adminReducer from './Slices/adminAuthSlice'
import { apiSlice } from './Slices/apiSlice';


const store = configureStore({
    reducer: {
        user: userReducer,
        admin: adminReducer,
        [apiSlice.reducerPath]: apiSlice.reducer
    },
    middleware: (getDefualtMiddleware) => getDefualtMiddleware().concat(apiSlice.middleware),
    devTools: true,
})

export default store;