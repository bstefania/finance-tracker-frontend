import { GoogleAuthProvider, getAuth, signOut, getRedirectResult, signInWithPopup } from "firebase/auth";
import { useState } from "react";

export const GoogleAuth = () => {
  const provider = new GoogleAuthProvider();
  provider.addScope("https://www.googleapis.com/auth/contacts.readonly");
  const auth = getAuth();

  const [authorizedUser, setAuthorizedUser] = useState(false || sessionStorage.getItem("accessToken") === "true" ? true : false);


  const signInWithGoogle = () => {
    signInWithPopup(auth, provider)
      .then((result: any) => {
        // This gives you a Google Access Token. You can use it to access Google APIs.
        const credential: any = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;

        // The signed-in user info.
        const user = result.user;
        // IdP data available using getAdditionalUserInfo(result)
        // ...
        if (user) {
          user.getIdToken().then((tkn: any) => {
            // set access token in session storage
            sessionStorage.setItem("accessToken", tkn);
            setAuthorizedUser(true);
          })
        }
      }).catch((error: any) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.customData.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        // ...
      });
  }

  const logoutUser = () => {
    signOut(auth).then(() => {
      // clear session storage
      sessionStorage.clear();
      setAuthorizedUser(false);
      // window.location.replace("/");
      alert('Logged Out Successfully');
    }).catch((error) => {
      // An error happened.
      alert(error);
    });
  }

  return (
    <div>
     {authorizedUser ? (
        <>
          <p>Authorized user</p>
          <button onClick={logoutUser}>Logout Button</button>
        </>
      ): (
        <>
      <button onClick={signInWithGoogle}>Sign In With Google</button>
        </>
      )}
    </div>
  );
}