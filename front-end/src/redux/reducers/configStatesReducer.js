import { createSlice } from "@reduxjs/toolkit";

export const slice = createSlice({
    name: "configStates",
    initialState: {
        update: false,
        disabled: false,
        order: "asc"
    },
    reducers: {
        setUpdate: (state, action) => {
            state.update = action.payload
        },
        setDisabled: (state, action) => {
            state.disabled = action.payload
        },
        setOrder: (state, action) => {
            state.order = action.payload
        }
    }
})

export const { setUpdate, setDisabled, setOrder } = slice.actions;
export default slice.reducer;