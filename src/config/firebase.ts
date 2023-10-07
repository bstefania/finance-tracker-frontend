import config from './firebaseConfig'
import { initializeApp } from "firebase/app"
import { getAnalytics } from "firebase/analytics"
import { FacebookAuthProvider, getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore'

const app = initializeApp(config)
const analytics = getAnalytics(app)

// Add or Remove authentification methods here.
export const externalProviders = {
    google: new GoogleAuthProvider().addScope("https://www.googleapis.com/auth/contacts.readonly"),
    facebook: new FacebookAuthProvider(),
};

export const auth = getAuth(app);
export const db = getFirestore(app);

export default app;