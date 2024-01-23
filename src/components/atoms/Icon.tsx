import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

type IconProps = React.ComponentProps<typeof FontAwesomeIcon> & {
  icon: string;
};

function Icon({ icon, ...extraProps }: IconProps) {
  return <FontAwesomeIcon icon={icon} {...extraProps} />;
}

export default Icon;
