import { configureStore } from "@reduxjs/toolkit"
import userSlice from "./userSlice"
import authorSlice from "./authorSlice"


export const store = configureStore({
    reducer: {
        user: userSlice,
        author: authorSlice
    }
})