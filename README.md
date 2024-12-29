# React-Sidebar-v2
![GitHub Actions Workflow Status](https://img.shields.io/github/actions/workflow/status/bqtran/react-sidebar-v2/super-linter.yml?style=flat-square)
![GitHub License](https://img.shields.io/github/license/bqtran/react-sidebar-v2?style=flat-square)
![NPM Version](https://img.shields.io/npm/v/%40bqtran%2Freact-sidebar-v2?style=flat-square)
![GitHub Release Date](https://img.shields.io/github/release-date/bqtran/react-sidebar-v2?style=flat-square)

This is a React friendly port of [Turbo87's sidebar-v2](https://github.com/Turbo87/sidebar-v2) map control for React-Leaflet & MapLibre GL JS.

A big shoutout to Andreas Riedmüller for creating the [my-component-library](https://github.com/receter/my-component-library/tree/revision-1) scaffolding that this project leverages.
You can read his excellent overview article [here](https://dev.to/receter/how-to-create-a-react-component-library-using-vites-library-mode-4lma).
## Features
- Recreates all the original sidebar-v2 functionality (markup, events) in React (leverages the original CSS only)
- Includes the nifty map autopan functionality found in [Norwin's leaflet-sidebar-v2](https://github.com/noerw/leaflet-sidebar-v2).
- Includes both components for [React-Leaflet](https://react-leaflet.js.org/) and [MapLibre GL JS](https://maplibre.org/) libraries.
- TypeScript declarations provided
- MIT license
### React-Leaflet Example
```javascript
import "leaflet/dist/leaflet.css"
import "./LeafletMap.css"
import {ReactLeafletSidebar} from "@bqtran/react-sidebar-v2";
import {MapContainer, TileLayer} from 'react-leaflet'

export default function LeafletMap() {
  return <div className="flex h-screen w-screen">
    <div className="flex-1">
      <MapContainer center={[29.648, -95.579]} zoom={13} scrollWheelZoom={false} zoomControl={false}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <ReactLeafletSidebar position="topleft" autopan={true} tabs={[
          {
            id: "menu",
            title:"Menu",
            icon:"Menu",
            position:"top",
            disabled:false,
            children:<p>Menu Content</p>
          },
          {
            id:"settings",
            title:"Settings",
            icon:"Settings",
            position:"bottom",
            disabled:false,
            children:<p>Settings Content</p>
          }
        ]}/>
      </MapContainer>
    </div>
  </div>
}

```
Note: `ReactLeafletSidebar` needs to be a child component of `MapContainer`, and position values follow the React-Leaflet's naming convention ('topleft' for Left, 'topright' for Right).
### MapLibre GL JS Example

```javascript
import {MapLibreSidebar} from "@bqtran/react-sidebar-v2";
import maplibre from "maplibre-gl"
import "maplibre-gl/dist/maplibre-gl.css"
import {useEffect, useState} from "react"

export default function MapLibre() {
  const [map, setMap] = useState<maplibre.Map>();
  const navCtrl = new maplibre.NavigationControl();

  useEffect(() => {
    if(map == undefined) {
      setMap(new maplibre.Map({
        container: "map",
        zoom: 2,
        style: 'https://demotiles.maplibre.org/style.json'
      }));
    }
  }, []);

  useEffect(() => {
    if(map && !map.hasControl(navCtrl)) {
      map.addControl(navCtrl, 'top-right');
    }
  }, [map]);

  return  <div className="flex h-screen w-screen">
            <div className="flex-1">
              <div id="map" style={{width: "100%", height: "100%"}}/>
              {map && <MapLibreSidebar map={map} position="top-left" autopan={false} tabs={[
                  {
                    id: "menu",
                    title: "Menu",
                    icon: "Menu",
                    position: "top",
                    disabled: false,
                    children: <p>Menu Content</p>
                  },
                  {
                    id: "settings",
                    title: "Settings",
                    icon: "Settings",
                    position: "bottom",
                    disabled: false,
                    children: <p>Settings Content</p>
                  }
                ]} />
              }
            </div>
          </div>
}

```
Note: Due to MapLibre's class component architecture, the `Map` component needs exist/be passed to `MapLibreSidebar`, and position values follow MapLibre's naming convention ('top-left' for Left, 'top-right' for Right).
## API
### [ReactLeafletSidebar / MapLibreSidebar] Component Properties
- `position`: _String_ - Sidebar control placement
  - React-Leaflet Values: 'topleft', 'topright'
  - MapLibre GL JS Values: 'top-left', 'top-right'
- `autopan`: _Boolean_ - Pan map on Sidebar expand/collapse
- `tabs`: Tab[]- Array of Sidebar tabs
  - `id`: _String_ - tab unique identifier
  - `title`: _String/Component_ - tab header text or component
  - `icon`: _String_ - icon name from [Lucide Icon](https://lucide.dev/) collection
  - `position`: _String_ - fix tab icon to 'top' or 'bottom'. Values: 'top', 'bottom'
  - `disabled`: _Boolean_ - disable/enable sidebar tab
  - `children`: _String/Component_ - Sidebar tab content

### [ReactLeafletSidebar / MapLibreSidebar] Events
- `"closing"` : (_tab_id_) - close tab event triggered
- `"opening"` : (_tab_id_) - open tab event triggered
- `"content"` : (_tab_id_) - content event triggered