import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import Reddit from "../../api/Reddit";

export const fetchUser = createAsyncThunk("user/fetchUser", async () => {
    const token = await Reddit.getAccessToken().then(val => {
        return val;
    })
    try {    
        const url = "https://oauth.reddit.com/api/v1/me"
        const headers = {
            "Authorization": `Bearer ${token}`,
            "User-Agent": "fgc-reddit by u/DavyK17_ (Codecademy portfolio project)",
        };

        const response = await fetch(url, { headers: headers });
        if (response.ok) {
            const jsonResponse = await response.json();
            return jsonResponse.name;
        }
    } catch(error) {
        console.log(error);
    }
})

export const userSlice = createSlice({
    name: "user",
    initialState: {
        name: "",
        authState: false,
        isLoading: false,
        hasError: false,
    },
    extraReducers: {
        [fetchUser.pending]: (state) => {
            state.authState = false;
            state.isLoading = true;
            state.hasError = false;
        },
        [fetchUser.fulfilled]: (state, action) => {
            state.authState = true;
            state.isLoading = false;
            state.hasError = false;
            state.name = action.payload;
        },
        [fetchUser.rejected]: (state) => {
            state.authState = false;
            state.isLoading = false;
            state.hasError = true;
        },
    }
});

export const selectUsername = state => state.user.name;
export const selectAuthState = state => state.user.authState;
export default userSlice.reducer;