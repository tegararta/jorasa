import { configureStore } from "@reduxjs/toolkit";
import authReducer from '../auth/Authslice';
import layananReducer from '../auth/Layananslice';
import respondenReducer from '../auth/Respondenslice';
import saranReducer from '../auth/Saranslice'

export const store = configureStore({
    reducer: {
        auth: authReducer,
        layanan: layananReducer,
        responden: respondenReducer,
        saran: saranReducer,
    },
})