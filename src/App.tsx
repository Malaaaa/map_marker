import { useJsApiLoader } from '@react-google-maps/api';
import React, { FC } from 'react';
import './App.less';
import SearchLocation from './components/SearchLocation';
import LocationTable from './components/LocationTable';
import Map from './components/Map';
import LatestSearchedLocation from './components/LatestSearchedLocation';

const App: FC = () => {
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
    libraries: ['places'],
  })
  return (
    <div className="App">
      <SearchLocation isLoaded={isLoaded} />
      <Map isLoaded={isLoaded} />
      <LocationTable />
      <LatestSearchedLocation />
    </div>
  )
};

export default App;