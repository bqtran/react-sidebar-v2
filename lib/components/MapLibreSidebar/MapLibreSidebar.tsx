import 'sidebar-v2/css/leaflet-sidebar.css'
import {Map} from "maplibre-gl";
import {TabType} from "../../main.ts";
import React, {useEffect, useRef, useState} from "react";
import L from "leaflet";
import Icon from "../Icon";
import './MapLibreSidebar.css'

export interface MapLibreSidebarOptions {
  map: Map;
  position: "top-left" | "top-right";
  autopan: boolean;
  tabs: TabType[];
}

export const MapLibreSidebar = ({map, position, autopan, tabs}: MapLibreSidebarOptions) => {
  const [activeTab, setActiveTab] = useState<string>('');
  const sbRef = useRef<HTMLDivElement>(null);
  const [collapsed, setCollapsed] = useState(true);
  const positionClass = position == "top-right" ? 'maplibregl-ctrl-top-right' : 'maplibregl-ctrl-top-left';
  const positionLR = position == "top-right" ? "right" : "left";
  const mapRef = useRef<Map>(map);

  const panMap = (enable:boolean) => {
    if(enable) {
      if(sbRef.current != null) {
        //@ts-ignore
        let panWidth = Number.parseInt(L.DomUtil.getStyle(sbRef.current, "max-width")) / 2;
        if(!isNaN(panWidth)) {
          if (positionLR == "left" && collapsed || positionLR == "right" && !collapsed) panWidth *= -1;
          mapRef.current.panBy([panWidth, 0], {duration: 500});
        }
      }
    }
  }
  const closeTab = () => {
    setActiveTab("");
    setCollapsed(true);
    panMap(autopan);
  }
  const openTab = (ev: React.MouseEvent<HTMLAnchorElement>) => {
    const tab = ev.currentTarget.hash.slice(1);
    if(tabs.filter(f=> (!f.disabled && f.id == tab)).length) {
      if(activeTab == tab) {
        mapRef.current.fire("closing", {id: tab});
        closeTab();
      } else {
        mapRef.current.fire("opening", {id:tab});
        setActiveTab(tab);
        setCollapsed(false);
        mapRef.current.fire("content", {id:tab});
        if(activeTab == "")
          panMap(autopan);
      }
    }
  }
  //append to maplibre control container
  useEffect(() => {
    if(sbRef.current !== null) {
      const div = document.getElementsByClassName(positionClass)[0] as HTMLElement;
      div.style.zIndex = '3'; //bugfix for maplibre control race condition affecting responsiveness
      div.append(sbRef.current);
    }
  }, [positionClass]);

  //prevent map clicks
  useEffect(() => {
    if (sbRef.current !== null) {
      L.DomEvent.disableClickPropagation(sbRef.current)
      L.DomEvent.disableScrollPropagation(sbRef.current)
    }
  }, [sbRef]);

  return <div ref={sbRef} className={`sidebar sidebar-${positionLR} ${collapsed ? 'collapsed': ''}`}>
    <div className="sidebar-content bg-slate-100">
      {tabs.map(t => {
        return <div key={t.id} id={t.id} className={`sidebar-pane ${activeTab == t.id ? 'active' : ''}`}>
          <h1 className="sidebar-header">{t.title}</h1>
          {t.children}
          <span className="sidebar-close" onClick={closeTab}>
            {positionLR == "left" && <Icon name="CircleChevronLeft"  size={20} style={{margin:10}} color={"white"}/>}
            {positionLR == "right" && <Icon name="CircleChevronRight" size={20} style={{margin: 10}} color={"white"}/>}
          </span>
        </div>
      })}
    </div>
    <div className="sidebar-tabs" role="tablist">
      <ul className="">
        {tabs.filter(f=>f.position=='top').map(t=> {
          return <li key={t.id} className={`${activeTab == t.id ? 'active' : ''} ${t.disabled ? 'disabled' : ''}`} title={typeof t.title == 'string'? t.title: ''}>
            <a className="" href={`#${t.id}`} role="tab" onClick={openTab}>
              <Icon name={t.icon} size={20} style={positionLR == 'left'? {margin:10, marginLeft:10} : {margin: 10, marginLeft: 10}} active={activeTab == t.id}/>
            </a>
          </li>;
        })}
      </ul>
      <ul>
        {tabs.filter(f=>f.position=='bottom').map(t => {
          return <li key={t.id} className={`${activeTab == t.id ? 'active' : ''} ${t.disabled ? 'disabled' : ''}`} title={typeof t.title == 'string'? t.title: ''}>
            <a className="" href={`#${t.id}`} role="tab" onClick={openTab}>
              <Icon name={t.icon} size={20} style={positionLR == 'left'? {margin:10, marginLeft:10} : {margin: 10, marginLeft: 10}} active={activeTab == t.id}/>
            </a>
          </li>;
        })}
      </ul>
    </div>
  </div>;
}