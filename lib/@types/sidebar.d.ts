import {Dispatch, SetStateAction} from "react";

export type SidebarContextType = {
  innerRef: RefObject<HTMLDivElement>;
  activeTab: string;
  setActiveTab: Dispatch<SetStateAction<string>>;
  collapsed: boolean;
  setCollapsed: Dispatch<SetStateAction<boolean>>;
  position: 'left'|'right',
  setPosition: Dispatch<SetStateAction<'left'|'right'>>;
  positionClass: string;
  type: string;
}