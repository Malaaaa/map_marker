import { configureStore } from '@reduxjs/toolkit'
import locationsReducer from './slice/locations.slice'
import mapReducer from './slice/map.slice'

const persistedState = localStorage.getItem('reduxState')
    ? JSON.parse(localStorage.getItem('reduxState') || '{}')
    : {}

export const store = configureStore({
    reducer: {
        locations: locationsReducer,
        map: mapReducer,
    },
    preloadedState: persistedState,

})
store.subscribe(() => {
    localStorage.setItem('reduxState', JSON.stringify(store.getState()))
})
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch