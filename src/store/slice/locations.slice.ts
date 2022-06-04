import { Location } from './../../types/index';
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '../'


interface LocationsState {
  locations: Location[],
}

const initialState: LocationsState = { locations: [] };

export const locationsSlice = createSlice({
  name: 'locations',
  initialState,
  reducers: {
    addLocation: (state: LocationsState, { payload }: PayloadAction<Location>) => {
      state.locations.push(payload)
    },
    delLocation: (state: LocationsState, { payload }: PayloadAction<string[]>) => {
      payload.map((selected) => {
        state.locations.splice(state.locations.findIndex((location) => location.key === selected), 1);
      })
    },
  },
})

// Other code such as selectors can use the imported `RootState` type
export const selectLocation = (state: RootState) => state.locations.locations
export const {
  delLocation, addLocation
} = locationsSlice.actions;

export default locationsSlice.reducer