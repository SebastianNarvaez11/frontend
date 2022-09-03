import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    isLoading: false,
    sidebarActive: ''
}

export const uiSlice = createSlice({
    name: 'ui',
    initialState,

    reducers: {

        startLoading: (state) => {
            state.isLoading = true
        },

        stopLoading: (state) => {
            state.isLoading = false
        },

        setShowSidebar: (state, action) => {
            if (state.sidebarActive === action.payload) {
                state.sidebarActive = ''
            } else {
                state.sidebarActive = action.payload
            }
        }
    }
})

export const { startLoading, stopLoading, setShowSidebar } = uiSlice.actions

export default uiSlice.reducer
