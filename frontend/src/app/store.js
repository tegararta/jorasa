import { configureStore } from "@reduxjs/toolkit";
import authReducer from '../auth/Authslice';

export const store = configureStore({
    reducer: {
        auth: authReducer
    },
})