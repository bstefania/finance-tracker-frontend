import {
  signOut,
  signInWithPopup,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { addDoc, collection, getDocs, query, where } from "firebase/firestore";
import { db, externalProviders } from "../config/firebase";
import { auth } from "../config/firebase"
import { AuthProviderType } from "../types/authentication";

export const signUpWithEmailAndPassword = async (data: any) => {
  const res = await createUserWithEmailAndPassword(auth, data.email, data.password);
  const user = res.user;

  await addDoc(collection(db, "users"), {
    uid: user.uid,
    name: data.name,
    email: data.email,
  });
}

export const logInWithEmailAndPassword = async (data: any) => {
  await signInWithEmailAndPassword(auth, data.email, data.password);
}

export const signInWithThirdParty = async (providerType: AuthProviderType) => {
  const provider = providerType === AuthProviderType.Google ? externalProviders.google : externalProviders.facebook
  const res = await signInWithPopup(auth, provider);
  const user = res.user;
  const q = query(collection(db, "users"), where("uid", "==", user.uid));
  const docs = await getDocs(q);
  if (docs.docs.length === 0) {
    await addDoc(collection(db, "users"), {
      uid: user.uid,
      name: user.displayName,
      email: user.email,
    });
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