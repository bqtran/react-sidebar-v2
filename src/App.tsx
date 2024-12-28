import { Routes, Route } from 'react-router-dom'
import LeafletMap from './LeafletMap'
import MapLibre from './MapLibre'
import Index from './Index'

import './App.css'
function App() {

  return <Routes>
            <Route path="/" element={<Index />}/>
            <Route path="/reactleaflet" element={<LeafletMap />} />
            <Route path="/maplibre" element={<MapLibre />} />
          </Routes>

}

export default App
