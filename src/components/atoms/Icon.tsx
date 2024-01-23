import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import styles from "../../styles/atoms/Icon.module.scss";

type IconProps = React.ComponentProps<typeof FontAwesomeIcon> & {
  withAction?: boolean;
  small?: boolean;
  large?: boolean;
};

export type IconType = IconProp;

function Icon({ icon, withAction, small, large, ...extraProps }: IconProps) {  
  let classList = [styles["icon"]]

  if (extraProps.className) {
    classList.push(extraProps.className)
  }
  if (withAction) {
    classList.push(styles["icon-with-action"]);
  }
  if (small) {
    classList.push(styles["icon--small"]);
  }
  if (large) {
    classList.push(styles["icon--large"]);
  }

  const className = classList.join(" ");
  console.log(className)

  return <FontAwesomeIcon icon={icon}  {...extraProps}  className={className}/>;
}

export default Icon;
