import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore'
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getStorage } from 'firebase/storage'

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "nopsscea-client.firebaseapp.com",
  projectId: "nopsscea-client",
  storageBucket: "nopsscea-client.appspot.com",
  messagingSenderId: "524404916876",
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId: "G-XST8K9BN59"
};

const app = initializeApp(firebaseConfig)
const db = getFirestore(app)
const auth = getAuth(app)
const google = new GoogleAuthProvider()
const storage = getStorage(app)

export {
    db,
    auth,
    google,
    storage
}