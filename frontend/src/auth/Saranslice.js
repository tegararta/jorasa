// src/store/SaranSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    saran: [],
    isLoading: false,
    isError: false,
    isSucces: false,
    msg: ""
};

export const fetchSaran = createAsyncThunk("Saran/fetchSaran", async (_, thunkAPI) => {
    try {
        const response = await axios.get("http://localhost:5000/responden/saran");
        return response.data;
    } catch (error) {
        if (error.response) {
            return thunkAPI.rejectWithValue(error.response.data.msg);
        } else {
            return thunkAPI.rejectWithValue("An unexpected error occurred.");
        }
    }
});

export const updateSaranStatus = createAsyncThunk("Saran/updateSaranStatus", async ({ uuidsaran, status }, thunkAPI) => {
    try {
        const endpoint = `http://localhost:5000/responden/saran/status/${uuidsaran}/${status}`;
        await axios.patch(endpoint);
        // Fetch latest data after updating
        const response = await axios.get("http://localhost:5000/responden/saran");
        return response.data; // Return updated data for the state
    } catch (error) {
        console.log("error");
        if (error.response) {
            return thunkAPI.rejectWithValue(error.response.data.msg);
        } else {
            return thunkAPI.rejectWithValue("An unexpected error occurred.");
        }
    }
});

const saranSlice = createSlice({
    name: "saran",
    initialState,
    reducers: {
        resetSaran: (state) => initialState
    },
    extraReducers: (builder) => {
        builder
        .addCase(fetchSaran.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(fetchSaran.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSucces = true;
                state.saran = action.payload;
            })
            .addCase(fetchSaran.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.msg = action.payload;
            })
            .addCase(updateSaranStatus.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSucces = true;
                state.saran = action.payload; // Update state with the latest data
            })
            .addCase(updateSaranStatus.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.msg = action.payload;
            });
    }
});

export const { resetSaran } = saranSlice.actions;
export default saranSlice.reducer;
