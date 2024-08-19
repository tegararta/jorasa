import { configureStore } from "@reduxjs/toolkit";
import authReducer from '../auth/Authslice';
import layananReducer from '../auth/Layananslice';

export const store = configureStore({
    reducer: {
        auth: authReducer,
        layanan: layananReducer

    },
})