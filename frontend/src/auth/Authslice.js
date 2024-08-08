import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    user: null,
    isError: false,
    isSucces: false,
    isLoading: false,
}

export const LoginUser = createAsyncThunk("user/LoginUser", async (user, thunkAPI) => {
    try {
        const response = await axios.post("http://localhost:5000/login", {
            username: user.username,
            password: user.password
        });
        console.log(response.username);
        return response.data;
    } catch (error) {
        if (error.response) {
            console.log(error.response.data.msg);
            return thunkAPI.rejectWithValue(error.response.data.msg);
        } else {
            console.log("An unexpected error occurred.");
            return thunkAPI.rejectWithValue("An unexpected error occurred.");
        }
    }
})

export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        reset: (state) => initialState
    },
    extraReducers: (builder) => {
        builder
            .addCase(LoginUser.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(LoginUser.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSucces = true;
                state.user = action.payload;
            })
            .addCase(LoginUser.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.msg = action.payload;
            });
    }
});

export const { reset } = authSlice.actions; 
export default authSlice.reducer;
