// src/store/respondenSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    responden: [],
    isLoading: false,
    isError: false,
    isSucces: false,
    msg: ""
};

export const fetchResponden = createAsyncThunk("responden/fetchResponden", async (_, thunkAPI) => {
    try {
        const response = await axios.get("http://localhost:5000/responden/");
        return response.data;
    } catch (error) {
        if (error.response) {
            return thunkAPI.rejectWithValue(error.response.data.msg);
        } else {
            return thunkAPI.rejectWithValue("An unexpected error occurred.");
        }
    }
});

const respondenSlice = createSlice({
    name: "responden",
    initialState,
    reducers: {
        resetresponden: (state) => initialState
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchResponden.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(fetchResponden.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSucces = true;
                state.responden = action.payload;
            })
            .addCase(fetchResponden.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.msg = action.payload;
            });
    }
});

export const { resetResponden } = respondenSlice.actions;
export default respondenSlice.reducer;
