import {
  GoogleAuthProvider,
  signOut,
  signInWithPopup,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { addDoc, collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../config/firebase";
import { auth } from "../config/firebase"
import { Provider } from "../types/general";

export const signUpWithEmailAndPassword = async (data: any) => {
  try {
    console.log("Signing up with email and password...")
    const res = await createUserWithEmailAndPassword(auth, data.email, data.password);
    const user = res.user;
    console.log(res)
    // await addDoc(collection(db, "users"), {
    //   uid: user.uid,
    //   name,
    //   authProvider: "local",
    //   email,
    // });
  } catch (error: any) {
    const errorCode = error.code;
    const errorMessage = error.message;
    console.log(errorMessage);
  }
}

export const logInWithEmailAndPassword = async (data: any) => {
  try {
    console.log("Logging in with email and password...")
    const res = await signInWithEmailAndPassword(auth, data.email, data.password);
    const user = res.user;
  } catch (error: any) {
    const errorCode = error.code;
    const errorMessage = error.message;
    console.log(errorMessage);
  }
}

const signUpWithThirdParty = async (provider: GoogleAuthProvider) => {
  const result = await signInWithPopup(auth, provider);
  const credential: any = GoogleAuthProvider.credentialFromResult(result);
  const token = credential.accessToken;
  const user = result.user;
  if (user) {
    // const q = query(collection(db, "users"), where("uid", "==", user.uid));
    // const docs = await getDocs(q);
    // if (docs.docs.length === 0) {
    //   await addDoc(collection(db, "users"), {
    //     uid: user.uid,
    //     name: user.displayName,
    //     authProvider: "google",
    //     email: user.email,
    //   });
    // }
    console.log("User signed in.")
  }
}

export const logOut = () => {
  signOut(auth)
    .then(() => {
      sessionStorage.clear();
    })
    .catch((error) => {
      console.log(error.message);
    });
};