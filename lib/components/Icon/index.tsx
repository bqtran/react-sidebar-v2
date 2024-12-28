import { icons } from 'lucide-react';

interface IconProps {
  name: keyof typeof icons;
  color?: string;
  size?: number;
  style?: React.CSSProperties;
  active?: boolean;
}

const Icon = ({name, color, size, style, active}:IconProps) => {
  const LucideIcon = icons[name];
  return <LucideIcon color={color} size={size} style={style} className={active == true ? 'active' : ''} />;
};

export default Icon;