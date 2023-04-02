import React from "react";
import "../styles/ExternalProvider.css"
import { AuthProviderType } from "../types/authentication";
import { signInWithThirdParty } from "../utils/authentication";

function ExternalProvider() {
  return (
    <div className="externalProvider">
      <div className="externalProviderButton" onClick={() => signInWithThirdParty(AuthProviderType.Google)}>
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg"
          className="providerIcon"
          alt=""
        />
        <span className="textContainer">Continue with Google </span>
      </div>
      <div className="externalProviderButton" onClick={() => signInWithThirdParty(AuthProviderType.Facebook)}>
        <img
          src="https://upload.wikimedia.org/wikipedia/en/0/04/Facebook_f_logo_%282021%29.svg"
          className="providerIcon"
          alt=""
        />
        <span className="textContainer">Continue with Facebook </span>
      </div>
    </div>
  );
}

export default ExternalProvider;
