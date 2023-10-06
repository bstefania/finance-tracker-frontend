import { faChartSimple } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import useAuth from "../hooks/useAuth";

const Logo = (props: any) => {
  return (
    <div className="logo">
      <div className="logo-svg-background"/>
        <div className="logoSvg">
          <FontAwesomeIcon icon={faChartSimple} className="logo-icon" />
        </div>
      {props.name && <span>WiseWallet</span>}
    </div>
  );
};

export default Logo;
