import {Dispatch, SetStateAction} from "react";
import {TabType} from "../main.ts";

export type SidebarContextType = {
  innerRef: RefObject<HTMLDivElement>;
  activeTab: string;
  setActiveTab: Dispatch<SetStateAction<string>>;
  collapsed: boolean;
  setCollapsed: Dispatch<SetStateAction<boolean>>;
  positionRef: RefObject<'left'|'right'>,
  positionClass: string;
  getPanWidth: () => number;
  sidebarTabsRef: RefObject<TabType[]>;
  toggleTab: (string) => boolean;
  type: string;
}