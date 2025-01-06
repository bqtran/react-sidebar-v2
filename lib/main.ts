import {ReactNode} from "react";
import {icons} from "lucide-react";

export type TabType = {
  id: string;
  title: ReactNode | string;
  tabClassName?: string;
  contentClassName?: string;
  disabled: boolean;
  icon: keyof typeof icons;
  position: 'top'|'bottom';
  content?: ReactNode;
}

export {ReactLeafletSidebar} from './components/ReactLeafletSidebar/ReactLeafletSidebar'
export {MapLibreSidebar} from './components/MapLibreSidebar/MapLibreSidebar'