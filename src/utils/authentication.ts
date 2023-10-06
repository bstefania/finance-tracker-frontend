import {
  signOut,
  signInWithPopup,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { addDoc, collection, getDocs, query, where } from "firebase/firestore";
import { db, external-providers } from "../config/firebase";
import { auth } from "../config/firebase"
import { AuthProviderType } from "../types/authentication";

const saveUserDetails = async (uid: string, name: string | null, email: string | null) => {
  await addDoc(collection(db, "users"), {
    uid,
    name,
    email,
    wealth: {
      income: 0,
      savings: 0,
      investments: 0,
      credit: 0
    }
  });
}

export const signUpWithEmailAndPassword = async (data: any) => {
  const res = await createUserWithEmailAndPassword(auth, data.email, data.password);
  const user = res.user;
  saveUserDetails(user.uid, data.name, data.email)  
}

export const logInWithEmailAndPassword = async (data: any) => {
  await signInWithEmailAndPassword(auth, data.email, data.password);
}

export const signInWithThirdParty = async (providerType: AuthProviderType) => {
  const provider = providerType === AuthProviderType.Google ? external-providers.google : external-providers.facebook
  const res = await signInWithPopup(auth, provider);
  const user = res.user;
  const q = query(collection(db, "users"), where("uid", "==", user.uid));
  const docs = await getDocs(q);
  if (docs.docs.length === 0) {
    saveUserDetails(user.uid, user.displayName, user.email)
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