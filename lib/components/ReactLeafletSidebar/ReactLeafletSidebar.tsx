import 'sidebar-v2/css/leaflet-sidebar.css'
import React, {useContext} from "react";
import L from "leaflet";
import {clsx} from "clsx";
import Icon from "../Icon";
import {TabType} from "../../main.ts";
import './ReactLeafletSidebar.css'
import {SidebarContext} from "../../context/SidebarContext";
import {SidebarContextType} from "../../@types/sidebar";
import {useMap} from "react-leaflet";

export interface ReactLeafletSidebarOptions {
  className?: string;
  tabsClassName?: string;
  contentsClassName?: string;
  position: 'left'|'right';
  autopan: boolean;
  tabs: TabType[];
}

export const ReactLeafletSidebar = ({className, tabsClassName, contentsClassName, position, autopan, tabs}: ReactLeafletSidebarOptions) => {
  const {activeTab, setActiveTab, collapsed, setCollapsed, positionClass, innerRef, getPanWidth, sidebarTabsRef} = useContext(SidebarContext) as SidebarContextType;
  const map = useMap();
  sidebarTabsRef.current = tabs;

  const panMap = (enable:boolean) => {
    if(enable && map != undefined && innerRef.current != null)
      map.panBy([getPanWidth(), 0], {duration: 0.5});
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

  //append to leaflet control container
  if(innerRef.current !== null && positionClass !== null) {
    const div = document.getElementsByClassName(positionClass)[0];
    div.append(innerRef.current);

    //prevent click/scroll propagation from sidebar to map
    L.DomEvent.disableClickPropagation(innerRef.current);
    L.DomEvent.disableScrollPropagation(innerRef.current);
  }

  return <div ref={innerRef} className={clsx(`sidebar leaflet-control sidebar-${position} leaflet-touch ${collapsed ? 'collapsed': ''}`, className)}>
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
        {sidebarTabsRef.current && sidebarTabsRef.current.filter((f: TabType) => f.position=='top').map((t: TabType)=> {
          return <li key={t.id} className={clsx(`${activeTab == t.id ? 'active' : ''} ${t.disabled ? 'disabled' : ''}`, t.tabClassName)} title={typeof t.title == 'string'? t.title: ''}>
                   <a href={`#${t.id}`} role="tab" onClick={openTab}>
                     <Icon name={t.icon} size={20} style={position == 'left'? {margin:10, marginLeft:8} : {margin: 10, marginLeft: 12}} active={activeTab == t.id}/>
                   </a>
                 </li>;
        })}
      </ul>
      <ul>
        {sidebarTabsRef.current && sidebarTabsRef.current.filter((f: TabType) => f.position=='bottom').map((t: TabType) => {
          return <li key={t.id} className={clsx(`${activeTab == t.id ? 'active' : ''} ${t.disabled ? 'disabled' : ''}`, t.tabClassName)} title={typeof t.title == 'string'? t.title: ''}>
                   <a href={`#${t.id}`} role="tab" onClick={openTab}>
                     <Icon name={t.icon} size={20} style={position == 'left'? {margin:10, marginLeft:8} : {margin: 10, marginLeft: 12}} active={activeTab == t.id}/>
                   </a>
                 </li>;
        })}
      </ul>
    </div>
  </div>;
}