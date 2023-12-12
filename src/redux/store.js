import { configureStore } from '@reduxjs/toolkit'
import user from './slices/userSlice'
import message from './slices/messageSlice'

export const store = configureStore({
    reducer: {
        user,
        message,
    },
})