import { createSlice } from "@reduxjs/toolkit"


const initialValue = {
    value: {}
}

const authorSlice = createSlice({
    name: "author",
    initialState: initialValue,
    reducers: {
        setAuthor : (state, action) => {
            state.value = action.payload
        }
    }
})

export const { setAuthor } = authorSlice.actions
export default authorSlice.reducer