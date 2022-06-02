import { Location } from './../../types/index';
import { stringify } from "qs";
import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit'
import { RootState } from '../'
import { client } from '../../api'


const initialState: Location[] = [];
export const fetchLocation = createAsyncThunk<
  // type arguements
  Location,
  { method: google.maps.LatLngLiteral | string }
>("locations/fetchLocation", async (payload, thunkApi) => {
  const location: Location = {
    name: 'current',
    coord: { lat: 0, lng: 0 },
    timezone: 'string',
    localtime: 'string',
    toggle: false,
  }
  // hit endpoint using axios
  const bingLocation = await client.get(
    `Locations${stringify(payload.method)}?key=${import.meta.env.VITE_BING_MAPS_API_KEY}`
  );
  console.log(bingLocation)

  if (bingLocation.status !== 200) {
    // Return the error message:
    console.log("rejected!!");
    return thunkApi.rejectWithValue({
      message: "Failed to fetch location.",
    });
  }
  const bingTimezone = await client.get(
    `Timezone${stringify(payload.method)}?key=${import.meta.env.VITE_BING_MAPS_API_KEY}`
  );

  if (bingTimezone.status !== 200) {
    // Return the error message:
    console.log("rejected!!");
    return thunkApi.rejectWithValue({
      message: "Failed to fetch timezone.",
    });
  }
  console.log(bingTimezone)

  // return response data with type


  return location;
});


export const locationsSlice = createSlice({
  name: 'locations',
  initialState,
  reducers: {
    delLocation: (state: Location[]) => {
      return state.filter(item => item.toggle !== false);
    },
    toggleLocation: (state: Location[], action: PayloadAction<string>) => {
    }
  },
  extraReducers(builder) {
    builder.addCase(fetchLocation.fulfilled, (state, action) => {
      // Add user to the state array
      state.push(action.payload)
    })
  },
})

// Other code such as selectors can use the imported `RootState` type
export const selectCount = (state: RootState) => state.locations
export const {
  delLocation,
  toggleLocation,
} = locationsSlice.actions;

export default locationsSlice.reducer