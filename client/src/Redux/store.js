import { configureStore } from '@reduxjs/toolkit'
import userReducer from './Slices/authSlice';
import adminReducer from './Slices/adminAuthSlice'
import ownerReducer from './Slices/ownerApi/ownerAuthSlicel'
import { apiSlice } from './Slices/apiSlice';


const store = configureStore({
    reducer: {
        user: userReducer,
        admin: adminReducer,
        owner:ownerReducer,
        [apiSlice.reducerPath]: apiSlice.reducer
    },
    middleware: (getDefualtMiddleware) => getDefualtMiddleware().concat(apiSlice.middleware),
    devTools: true,
})

export default store;