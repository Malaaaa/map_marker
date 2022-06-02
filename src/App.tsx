import React, { FC } from 'react';
import './App.less';
import LocationSearchPanel from './components/LoacationSearchPanel';
import LocationTable from './components/LocationTable';
import Map from './components/Map';

const App: FC = () => (
  <div className="App">
    <LocationSearchPanel />
    <Map />
    <LocationTable />
  </div>
);

export default App;