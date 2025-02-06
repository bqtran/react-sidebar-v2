import {Dispatch, SetStateAction} from "react";
import {TabType} from "../main.ts";

export type SidebarContextType = {
  innerRef: RefObject<HTMLDivElement>;
  activeTab: string;
  setActiveTab: Dispatch<SetStateAction<string>>;
  collapsed: boolean;
  setCollapsed: Dispatch<SetStateAction<boolean>>;
  position: 'left'|'right',
  setPosition: Dispatch<SetStateAction<'left'|'right'>>;
  positionClass: string;
  getPanWidth: () => number;
  sidebarTabs: TabType[];
  setSidebarTabs: Dispatch<SetStateAction<TabType[]>>;
  toggleTab: (string) => boolean;
  type: string;
}