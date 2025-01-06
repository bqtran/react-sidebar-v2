import 'sidebar-v2/css/leaflet-sidebar.css'
import React, {useState, useEffect, RefObject} from "react";
import L from "leaflet";
import {useMap} from "react-leaflet";
import {clsx} from "clsx";
import Icon from "../Icon";
import {TabType} from "../../main.ts";
import './ReactLeafletSidebar.css'

export interface ReactLeafletSidebarOptions {
  sbRef: RefObject<HTMLDivElement>;
  className?: string;
  tabsClassName?: string;
  contentsClassName?: string;
  position: "topleft" | "topright";
  autopan: boolean;
  tabs: TabType[];
}

export const ReactLeafletSidebar = ({sbRef, className, tabsClassName, contentsClassName, position, autopan, tabs}: ReactLeafletSidebarOptions) => {
  const [activeTab, setActiveTab] = useState<string>('');
  const [collapsed, setCollapsed] = useState(true);
  const positionClass = position == "topright" ? 'leaflet-top leaflet-right' : 'leaflet-top leaflet-left';
  const positionLR = ["topleft"].includes(position) ? "left" : "right";
  const map = useMap();

  const panMap = (enable:boolean) => {
    if(enable) {
      if(sbRef.current != null) {
        //@ts-ignore
        let panWidth = Number.parseInt(L.DomUtil.getStyle(sbRef.current, "max-width")) / 2;
        if(!isNaN(panWidth)) {
          if (positionLR == "left" && collapsed || positionLR == "right" && !collapsed) panWidth *= -1;
          map.panBy([panWidth, 0], {duration: 0.5});
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
        map.fireEvent("closing", {id: tab});
        closeTab();
      } else {
        map.fireEvent("opening", {id:tab});
        setActiveTab(tab);
        setCollapsed(false);
        map.fireEvent("content", {id:tab});
        if(activeTab == "")
          panMap(autopan);
      }
    }
  }

  //append to leaflet control container
  useEffect(() => {
    if(sbRef.current !== null) {
      const div = document.getElementsByClassName(positionClass)[0];
      div.append(sbRef.current);
    }
  }, [positionClass]);

  //prevent map clicks
  useEffect(() => {
    if (sbRef.current !== null) {
      L.DomEvent.disableClickPropagation(sbRef.current)
      L.DomEvent.disableScrollPropagation(sbRef.current)
    }
  }, [sbRef])

  return <div ref={sbRef} className={clsx(`sidebar leaflet-control sidebar-${positionLR} leaflet-touch ${collapsed ? 'collapsed': ''}`, className)}>
    <div className={clsx("sidebar-content bg-slate-100", contentsClassName)}>
      {tabs.map(t => {
        return <div key={t.id} id={t.id} className={clsx(`sidebar-pane ${activeTab == t.id ? 'active' : ''}`, t.contentClassName)}>
          <h1 className="sidebar-header">{t.title}</h1>
          {t.content}
          <span className="sidebar-close" onClick={closeTab}>
            {positionLR == "left" && <Icon name="CircleChevronLeft"  size={20} style={{margin:10}} color={"white"}/>}
            {positionLR == "right" && <Icon name="CircleChevronRight" size={20} style={{margin: 10}} color={"white"}/>}
          </span>
        </div>
      })}
    </div>
    <div className={clsx("sidebar-tabs", tabsClassName)} role="tablist">
      <ul className="">
        {tabs.filter(f=>f.position=='top').map(t=> {
          return <li key={t.id} className={clsx(`${activeTab == t.id ? 'active' : ''} ${t.disabled ? 'disabled' : ''}`, t.tabClassName)} title={typeof t.title == 'string'? t.title: ''}>
                   <a className="" href={`#${t.id}`} role="tab" onClick={openTab}>
                     <Icon name={t.icon} size={20} style={positionLR == 'left'? {margin:10, marginLeft:8} : {margin: 10, marginLeft: 12}} active={activeTab == t.id}/>
                   </a>
                 </li>;
        })}
      </ul>
      <ul>
        {tabs.filter(f=>f.position=='bottom').map(t => {
          return <li key={t.id} className={clsx(`${activeTab == t.id ? 'active' : ''} ${t.disabled ? 'disabled' : ''}`, t.tabClassName)} title={typeof t.title == 'string'? t.title: ''}>
                   <a className="" href={`#${t.id}`} role="tab" onClick={openTab}>
                     <Icon name={t.icon} size={20} style={positionLR == 'left'? {margin:10, marginLeft:8} : {margin: 10, marginLeft: 12}} active={activeTab == t.id}/>
                   </a>
                 </li>;
        })}
      </ul>
    </div>
  </div>;
}