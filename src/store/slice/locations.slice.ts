import { client } from './../../api';
import { Location } from './../../types/index';
import { stringify } from "qs";
import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit'
import { RootState } from '../'


interface LocationsState {
  locations: Location[],
}

const initialState: LocationsState = { locations: [] };
export const fetchLocation = createAsyncThunk<
  // type arguements
  Location,
  {
    method: string, location: Location
  }
>("locations/fetchLocation",
  async (payload, thunkApi) => {
    const location: Location = payload.location
    // base url    
    if (payload.method === 'geolocation') {
      const response = await client.get(`${import.meta.env.VITE_GEONAMES_MAPS_API_URL}findNearby?${stringify({ lat: location.lat, lng: location.lng })}${import.meta.env.VITE_GEONAMES_MAPS_API_KEY}`);
      if (response.status !== 200) {
        // Return the error message:
        console.log("rejected!!");
        return thunkApi.rejectWithValue({
          message: "Failed to fetch location.",
        });
      }
      const data = response.data
      location.lat = data.geonames[0].lat
      location.lng = data.geonames[0].lng
      location.name = data.geonames[0].name + ", " + data.geonames[0].adminName1 + ", " + data.geonames[0].countryName
    }
    const timeZoneResponse = await client.get(
      `${import.meta.env.VITE_GEONAMES_MAPS_API_URL}timezone?${stringify({ lat: location.lat, lng: location.lng })}${import.meta.env.VITE_GEONAMES_MAPS_API_KEY}`
    );
    if (timeZoneResponse.status !== 200) {
      // Return the error message:
      console.log("rejected!!");
      return thunkApi.rejectWithValue({
        message: "Failed to fetch timezone.",
      });
    }
    location.timezone = timeZoneResponse.data.timezoneId
    // return response data with type
    return location;
  });


export const locationsSlice = createSlice({
  name: 'locations',
  initialState,
  reducers: {
    delLocation: (state: LocationsState, { payload }: PayloadAction<string[]>) => {
      payload.map((selected) => {
        state.locations.splice(state.locations.findIndex((location) => location.key === selected), 1);
      })
    },
  },
  extraReducers(builder) {
    builder.addCase(fetchLocation.fulfilled, (state, action) => {
      // Add user to the state array
      state.locations.push(action.payload)
    })
  },
})

// Other code such as selectors can use the imported `RootState` type
export const selectLocation = (state: RootState) => state.locations.locations
export const {
  delLocation,
} = locationsSlice.actions;

export default locationsSlice.reducer