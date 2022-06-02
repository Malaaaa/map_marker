import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '..'

const initialState: boolean = false;


export const mapSlice = createSlice({
    name: 'map',
    initialState,
    reducers: {
        mapReady: (state: boolean, action: PayloadAction<boolean>) => {
            return action.payload
        },
    },
})

// Other code such as selectors can use the imported `RootState` type
export const selectMap = (state: RootState) => state.map

export default mapSlice.reducer