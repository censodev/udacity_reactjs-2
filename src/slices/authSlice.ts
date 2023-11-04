import { createSlice } from "@reduxjs/toolkit";
import { UserModel } from "../types/models";

const initialState: { user: UserModel | null } = {
    user: null,
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        login: (state, action) => {
            state.user = action.payload
        },
        logout: (state) => {
            state.user = null
        },
    },
})

export const { login, logout } = authSlice.actions;

export default authSlice.reducer;