import "maplibre-gl/dist/maplibre-gl.css"
import maplibre from "maplibre-gl"
import {MapLibreSidebar} from "../";
import {useEffect, useState, useRef} from "react"

export default function MapLibre() {
  const [map, setMap] = useState<maplibre.Map>();
  const sbRef = useRef<HTMLDivElement>(null);
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
              {map && <MapLibreSidebar ref={sbRef} map={map} position="top-left" autopan={true} tabs={[
                  {
                    id: "menu",
                    title: "Menu",
                    icon: "Menu",
                    position: "top",
                    disabled: false,
                    content: <p>Menu Content</p>
                  },
                  {
                    id: "profile",
                    title: "Profile",
                    icon: "User",
                    position: "top",
                    disabled: false,
                    content: <p>Profile Content</p>
                  },
                  {
                    id: "mail",
                    title: "Mail",
                    icon: "Mail",
                    position: "top",
                    disabled: false,
                    content: <p>Mail Content</p>
                  },
                  {
                    id: "settings",
                    title: "Settings",
                    icon: "Settings",
                    position: "bottom",
                    disabled: false,
                    content: <p>Settings Content</p>
                  }
                ]} />
              }
            </div>
          </div>
}
