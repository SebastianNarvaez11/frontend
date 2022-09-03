import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    assistances: [],
    assistanceSelected: null,
    isFetchingAssistance: false,
    isLoadingDetail: false,
    isUpdatingAssistance: false,
}

export const assistanceSlice = createSlice({
    name: 'assistance',
    initialState,

    reducers: {

        // Loaders
        setFetchingAssistance: (state) => {
            state.isFetchingAssistance = !state.isFetchingAssistance
        },

        setLoadingDetail: (state) => {
            state.isLoadingDetail = !state.isLoadingDetail
        },

        setUpdatingAssistance: (state) => {
            state.isUpdatingAssistance = !state.isUpdatingAssistance
        },


        // Logica
        setAssitances: (state, action) => {
            state.assistances = action.payload
        },

        setAssitanceSelected: (state, action) => {
            state.assistanceSelected = action.payload
        },

        setDetailAssistance: (state, action) => {
            state.assistanceSelected.details = state.assistanceSelected.details.map(detail => detail.id === action.payload.id ? (detail = action.payload) : detail)
        },

        updateAssistance: (state, action) => {
            state.assistances = state.assistances.map(assistance => assistance.id === action.payload.id ? (assistance = action.payload) : assistance)
        }
    }
})

export const { setAssitances, setFetchingAssistance, setAssitanceSelected, setLoadingDetail, setDetailAssistance, setUpdatingAssistance, updateAssistance } = assistanceSlice.actions

export default assistanceSlice.reducer
