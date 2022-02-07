import { configureStore } from '@reduxjs/toolkit'
import mailSlice from './slices/mailSlice'
import userSlice from './slices/userSlice'

export default configureStore({
    reducer: {
        mail: mailSlice,
        user: userSlice,
    },
})