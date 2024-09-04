// src/store/layananSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    layanan: [],
    isLoading: false,
    isError: false,
    isSucces: false,
    msg: ""
};

export const fetchLayanan = createAsyncThunk("layanan/fetchLayanan", async (_, thunkAPI) => {
    try {
        const response = await axios.get("http://localhost:5000/layanan/");
        return response.data;
    } catch (error) {
        if (error.response) {
            return thunkAPI.rejectWithValue(error.response.data.msg);
        } else {
            return thunkAPI.rejectWithValue("An unexpected error occurred.");
        }
    }
});

const layananSlice = createSlice({
    name: "layanan",
    initialState,
    reducers: {
        resetLayanan: (state) => initialState
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchLayanan.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(fetchLayanan.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSucces = true;
                state.layanan = action.payload;
            })
            .addCase(fetchLayanan.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.msg = action.payload;
            });
    }
});

export const { resetLayanan } = layananSlice.actions;
export default layananSlice.reducer;
