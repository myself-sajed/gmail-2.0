import { createSlice } from '@reduxjs/toolkit'

export const mailSlice = createSlice({
    name: 'mail',
    initialState: {
        isComposeOpen: false,
        random: Math.floor(Math.random() * 10000000 + new Date().getTime()),
        backTo: '/',
        totalInbox: 0,
        totalSent: 0,
    },
    reducers: {
        openCompose: (state) => {
            state.isComposeOpen = true;
        },
        closeCompose: (state) => {
            state.isComposeOpen = false;
        },
        setRandom: (state) => {
            state.random = Math.floor(Math.random() * 10000000 + new Date().getTime());
        },
        setBackTo: (state, action) => {
            state.backTo = action.payload;
        },
        setTotalInbox: (state, action) => {
            state.totalInbox = action.payload;
        },
        setTotalSent: (state, action) => {
            state.totalSent = action.payload;
        },

    },
})

// Action creators are generated for each case reducer function
export const { openCompose, closeCompose, setRandom, setBackTo, setTotalInbox, setTotalSent } = mailSlice.actions

export default mailSlice.reducer