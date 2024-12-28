import "leaflet/dist/leaflet.css"
import {ReactLeafletSidebar} from "../";
import {MapContainer, TileLayer, ZoomControl} from 'react-leaflet'

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
              id:"profile",
              title:"Profile",
              icon:"User",
              position:"top",
              disabled:false,
              children:<p>Profile Content</p>
            },
            {
              id:"mail",
              title:"Mail",
              icon:"Mail",
              position:"top",
              disabled:false,
              children:<p>Mail Content</p>
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
      <ZoomControl position="topright"/>
    </MapContainer>
  </div>
</div>
}
