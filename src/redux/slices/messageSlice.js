import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    messsage: null,
    messsageLoading: false,
}

export const messageSlice = createSlice({
    name: 'messsage',
    initialState,
    reducers: {
        sendMessage(state, action) {
            state.messsage = action.payload
        },
    },
})

// Action creators are generated for each case reducer function
export const { sendMessage } = messageSlice.actions

export default messageSlice.reducer