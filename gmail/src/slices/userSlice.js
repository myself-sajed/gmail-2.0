import { createSlice } from '@reduxjs/toolkit'

export const userSlice = createSlice({
    name: 'user',
    initialState: {
        value: null,
    },
    reducers: {
        signIn: (state, action) => {
            state.value = action.payload;
        },
        signOutUser: (state) => {
            state.value = null;
        }


    },
})

// Action creators are generated for each case reducer function
export const { signIn, signOutUser } = userSlice.actions

export default userSlice.reducer