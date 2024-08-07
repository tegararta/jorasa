import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    user: null,
    isError: false,
    isSucces: false,
    isLoading: false,
    message: ""
}

export const LoginUser = createAsyncThunk("user/LoginUser", async(user, thunkAPI) => {
    try {
        const response = await axios.post("http://localhost:5000/login", {
            username: user.username,
            password: user.password
        });
        return response.data;
    } catch (error) {
        if(error.response) {
            const message = error.response.data.msg;
            return thunkAPI.rejectWithValue(message);
        }
    }
})

export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        reset: (state) => initialState
    },
    extraReducers: (reducers) => {
        reducers[LoginUser.pending] = (state) => {
            state.isLoading = true;
        };
        reducers[LoginUser.fulfilled] = (state, action) => {
            state.isLoading = false;
            state.isSucces = true;
            state.user = action.payload;
        };
        reducers[LoginUser.rejected] = (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.message = action.payload;
        };
    }
});

export const { reset } = authSlice.actions; 
export default authSlice.reducer;