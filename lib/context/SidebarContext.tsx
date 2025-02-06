import {SidebarContextType} from "../@types/sidebar";
import {TabType} from "../main.ts";
import {createContext, ReactNode, FC, useState, useRef} from "react";

export const SidebarContext = createContext<SidebarContextType | null>(null);

export type SidebarProviderType = {
  type: 'maplibre' | 'leaflet';
  children: ReactNode;
}

export const SidebarProvider: FC<SidebarProviderType> = ({type, children }) => {
  const innerRef = useRef<HTMLDivElement>(null);
  const [sidebarTabs, setSidebarTabs] = useState<TabType[]>([]);
  const [activeTab, setActiveTab] = useState<string>('');
  const [collapsed, setCollapsed] = useState(true);
  const [position, setPosition] = useState<'left'|'right'>('left');
  const positionClass = type == 'maplibre' ? position == "right" ? 'maplibregl-ctrl-top-right' : 'maplibregl-ctrl-top-left'
                                                  : position == "right" ? 'leaflet-top leaflet-right' : 'leaflet-top leaflet-left';

  const getPanWidth = () => {
    if(innerRef.current != null) {
      let panWidth = Number.parseInt(window.getComputedStyle(innerRef.current).getPropertyValue("max-width")) / 2;
      if(!isNaN(panWidth)) {
        if (position == "left" && collapsed || position == "right" && !collapsed) panWidth *= -1;
        return panWidth;
      }
    }
    return -1;
  }

  const toggleTab = (name:string) => {
    const tab = sidebarTabs.find(f => f.id === name);
    if(tab !== undefined) {
      tab.disabled = !tab.disabled;
      return true;
    }
    return false;
  }

  return <SidebarContext.Provider value={{innerRef, activeTab, setActiveTab, collapsed, setCollapsed, position, setPosition, positionClass, getPanWidth, sidebarTabs, setSidebarTabs, toggleTab, type}}>{children}</SidebarContext.Provider>;
}