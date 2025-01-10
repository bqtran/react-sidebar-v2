import {SidebarContextType} from "../@types/sidebar";
import {createContext, ReactNode, FC, useState, useRef} from "react";

export const SidebarContext = createContext<SidebarContextType | null>(null);

export type SidebarProviderType = {
  type: 'maplibre' | 'leaflet';
  children: ReactNode;
}

export const SidebarProvider: FC<SidebarProviderType> = ({type, children }) => {
  const innerRef = useRef<HTMLDivElement>(null);
  const [activeTab, setActiveTab] = useState<string>('');
  const [collapsed, setCollapsed] = useState(true);
  const [position, setPosition] = useState<'left'|'right'>('left');
  const positionClass = type == 'maplibre' ? position == "right" ? 'maplibregl-ctrl-top-right' : 'maplibregl-ctrl-top-left'
                                                  : position == "right" ? 'leaflet-top leaflet-right' : 'leaflet-top leaflet-left';

  return <SidebarContext.Provider value={{innerRef, activeTab, setActiveTab, collapsed, setCollapsed, position, setPosition, positionClass, type}}>{children}</SidebarContext.Provider>;
}