import * as PhosphorIcons from "phosphor-react";

type IconProps = {
  name: keyof typeof PhosphorIcons;
  weight?:string
};
const Icon = ({ name ,weight="thin"}: IconProps) => {
  const IconComponent = PhosphorIcons[name] as React.ElementType;
  return <IconComponent   weight={weight} />;
};
export default Icon;
