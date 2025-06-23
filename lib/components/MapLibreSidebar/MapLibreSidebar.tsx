import 'sidebar-v2/css/leaflet-sidebar.css'
import {Map} from "maplibre-gl";
import {TabType} from "../../main.ts";
import React, {useContext} from "react";
import {clsx} from "clsx";
import Icon from "../Icon";
import './MapLibreSidebar.css'
import {SidebarContext} from "../../context/SidebarContext";
import {SidebarContextType} from "../../@types/sidebar";

export interface MapLibreSidebarOptions {
  className?: string;
  tabsClassName?: string;
  contentsClassName?: string;
  map: Map;
  position: 'left'|'right';
  autopan: boolean;
  tabs: TabType[];
}

export const MapLibreSidebar = ({className, tabsClassName, contentsClassName, map, position, autopan, tabs}: MapLibreSidebarOptions) => {
  const {activeTab, setActiveTab, collapsed, setCollapsed, positionClass, innerRef, getPanWidth, sidebarTabsRef} = useContext(SidebarContext) as SidebarContextType;
  sidebarTabsRef.current = tabs;
  
  const panMap = (enable:boolean) => {
    if(enable && map !== undefined && innerRef.current != null)
      map.panBy([getPanWidth(), 0], {duration: 500});
  }

  const closeTab = () => {
    setActiveTab("");
    setCollapsed(true);
    panMap(autopan);
  }

  const openTab = (ev: React.MouseEvent<HTMLAnchorElement>) => {
    const tab = ev.currentTarget.hash.slice(1);
    if(map != undefined && sidebarTabsRef.current && sidebarTabsRef.current.filter((f: TabType) => (!f.disabled && f.id == tab)).length) {
      if(activeTab == tab) {
        map.fire("closing", {id: tab});
        closeTab();
      } else {
        map.fire("opening", {id:tab});
        setActiveTab(tab);
        setCollapsed(false);
        map.fire("content", {id:tab});
        if(activeTab == "")
          panMap(autopan);
      }
    }
  }

  //append to maplibre control container
  if(innerRef.current !== null && positionClass !== null) {
    const div = document.getElementsByClassName(positionClass)[0] as HTMLElement;
    div.style.zIndex = '3'; //bugfix for maplibre control race condition affecting responsiveness
    div.append(innerRef.current);
  }

  return <div ref={innerRef} className={clsx(`sidebar sidebar-${position} ${collapsed ? 'collapsed': ''}`, className)}>
    <div className={clsx("sidebar-content", contentsClassName)}>
      {sidebarTabsRef.current && sidebarTabsRef.current.map((t: TabType) => {
        return <div key={t.id} id={t.id} className={clsx(`sidebar-pane ${activeTab == t.id ? 'active' : ''}`, t.contentClassName)}>
          <h1 className="sidebar-header">{t.title}</h1>
          {t.content}
          <span className="sidebar-close" onClick={closeTab}>
            {position == "left" && <Icon name="CircleChevronLeft" size={20} style={{margin:10}} color={"white"}/>}
            {position == "right" && <Icon name="CircleChevronRight" size={20} style={{margin: 10}} color={"white"}/>}
          </span>
        </div>
      })}
    </div>
    <div className={clsx("sidebar-tabs", tabsClassName)} role="tablist">
      <ul>
        {sidebarTabsRef.current && sidebarTabsRef.current.filter((f: TabType) => f.position=='top').map((t: TabType) => {
          return <li key={t.id} className={clsx(`${activeTab == t.id ? 'active' : ''} ${t.disabled ? 'disabled' : ''}`, t.tabClassName)} title={typeof t.title == 'string'? t.title: ''}>
            <a href={`#${t.id}`} role="tab" onClick={openTab}>
              <Icon name={t.icon} size={20} style={position == 'left'? {margin:10, marginLeft:10} : {margin: 10, marginLeft: 10}} active={activeTab == t.id}/>
            </a>
          </li>;
        })}
      </ul>
      <ul>
        {sidebarTabsRef.current && sidebarTabsRef.current.filter((f: TabType) => f.position=='bottom').map((t: TabType) => {
          return <li key={t.id} className={clsx(`${activeTab == t.id ? 'active' : ''} ${t.disabled ? 'disabled' : ''}`, t.tabClassName)} title={typeof t.title == 'string'? t.title: ''}>
            <a href={`#${t.id}`} role="tab" onClick={openTab}>
              <Icon name={t.icon} size={20} style={position == 'left'? {margin:10, marginLeft:10} : {margin: 10, marginLeft: 10}} active={activeTab == t.id}/>
            </a>
          </li>;
        })}
      </ul>
    </div>
  </div>;
}