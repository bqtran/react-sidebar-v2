import "leaflet/dist/leaflet.css"
import {ReactLeafletSidebar} from "../";
import {MapContainer, TileLayer} from 'react-leaflet'
import {useRef} from "react";

export default function LeafletMap() {
  const sbRef = useRef<HTMLDivElement>(null);

  return  <div style={{flex:"1 1 auto", height:"100vh", width:"100vw"}} >
            <MapContainer center={[29.648, -95.579]} zoom={13} scrollWheelZoom={false} zoomControl={false} style={{height:"100vh", width:"100vw"}}>
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
                <ReactLeafletSidebar sbRef={sbRef} position="topleft" autopan={true} tabs={[
                  {
                    id: "menu",
                    title:"Menu",
                    icon:"Menu",
                    position:"top",
                    disabled:false,
                    content:<p>Menu Content</p>
                  },
                  {
                    id:"profile",
                    title:"Profile",
                    icon:"User",
                    position:"top",
                    disabled:false,
                    content:<p>Profile Content</p>
                  },
                  {
                    id:"mail",
                    title:"Mail",
                    icon:"Mail",
                    position:"top",
                    disabled:false,
                    content:<p>Mail Content</p>
                  },
                  {
                    id:"settings",
                    title:"Settings",
                    icon:"Settings",
                    position:"bottom",
                    disabled:false,
                    content:<p>Settings Content</p>
                  }
                ]}/>
            </MapContainer>
          </div>
}
