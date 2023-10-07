import React from "react";
import "../../styles/utils/ExternalProvider.scss"
import { AuthProviderType } from "../../types/authentication";
import { signInWithThirdParty } from "../../utils/authentication";

function externalProvider() {
  return (
    <div className="external-provider">
      <div className="external-provider-button" onClick={() => signInWithThirdParty(AuthProviderType.Google)}>
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg"
          className="provider-icon"
          alt=""
        />
        <span className="text-container">Continue with Google </span>
      </div>
      <div className="external-provider-button" onClick={() => signInWithThirdParty(AuthProviderType.Facebook)}>
        <img
          src="https://upload.wikimedia.org/wikipedia/en/0/04/Facebook_f_logo_%282021%29.svg"
          className="provider-icon"
          alt=""
        />
        <span className="text-container">Continue with Facebook </span>
      </div>
    </div>
  );
}

export default externalProvider;
