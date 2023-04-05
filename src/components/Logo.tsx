import React from "react";
import useAuth from "../hooks/useAuth";

const Logo = (props: any) => {

  return (
    <div className="logo">
      {props.name ? (
        <>
          <img src="logo.png" width="401" height="128" alt="My Logo" />
        </>
      ) : (
        <>
        <img src="logo-square.png" width="127" height="127" alt="My Logo" />
        </>
      )}
    </div>
  );
};

export default Logo;
