import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import styles from "../../styles/atoms/Icon.module.scss";
import { IconProp } from "@fortawesome/fontawesome-svg-core";

type IconProps = React.ComponentProps<typeof FontAwesomeIcon> & {
  withAction?: boolean;
};

export type IconType = IconProp;

function Icon({ icon, withAction, ...extraProps }: IconProps) {  
  let classList = [styles["icon"]]

  if (extraProps.className) {
    classList.push(extraProps.className)
  }
  if (withAction) {
    classList.push(styles["icon-with-action"]);
  }

  const className = classList.join(" ");

  return <FontAwesomeIcon icon={icon} className={className} {...extraProps} />;
}

export default Icon;
