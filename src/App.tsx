import { Routes, Route } from 'react-router-dom'
import LeafletMap from './LeafletMap'
import MapLibre from './MapLibre'
import Index from './Index'
import {SidebarProvider} from '../'
import './App.css'

function App() {

  return <Routes>
            <Route path="/" element={<Index />}/>
              <Route path="/reactleaflet" element={<SidebarProvider type="leaflet"><LeafletMap /></SidebarProvider>} />
              <Route path="/maplibre" element={<SidebarProvider type="maplibre"><MapLibre /></SidebarProvider>} />
          </Routes>

}

export default App
