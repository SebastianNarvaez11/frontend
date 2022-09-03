import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    token: null,
    user: null,
    isAuthenticated: false,
    isChecking: true
}


export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {

        login: (state, action) => {
            state.token = action.payload.token
            state.user = action.payload.user
            state.isAuthenticated = true
        },

        logout: (state) => {
            state.token = null
            state.user = null
            state.isAuthenticated = false
        },

        restore: (state, action) => {
            state.token = action.payload.token
            state.user = action.payload.user
            state.isAuthenticated = true
            state.isChecking = false
        },

        setChecking: (state) => {
            state.isChecking = !state.isChecking
        }
    }
})


export const { login, logout, setChecking, restore } = authSlice.actions
export default authSlice.reducer