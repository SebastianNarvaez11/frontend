import { configureStore } from '@reduxjs/toolkit'
import authSlice from './slices/authSlice'
import uiSlice from './slices/uiSlice'
import assistanceSlice from './slices/assistanceSlice'

const authMiddleware = (store) => (next) => (action) => {

    switch (action.type) {

        case 'auth/login':
            localStorage.setItem('TOKEN', action.payload.token)
            return next(action);

        case 'auth/logout':
            localStorage.removeItem('TOKEN')
            return next(action);

        default:
            next(action);
    }
}




const store = configureStore({
    reducer: {
        auth: authSlice,
        ui: uiSlice,
        assistance: assistanceSlice
    },

    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(authMiddleware)
})

export default store