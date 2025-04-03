import { initializeApp , getApp, getApps} from "firebase/app";
import { getAuth } from "firebase-admin/auth";
import { getFirestore } from "firebase-admin/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBtFe4t94WlnvHB1AMSf2XdeHIufnfw...",
  authDomain: "intview-d4....firebaseapp.com",
  projectId: "intview-d4...",
  storageBucket: "intview-d4....firebasestorage.app",
  messagingSenderId: "318429474907",
  appId: "1:318429474907:web:4d2a6ee92a7b262807cf7e",
  measurementId: "G-59HKFNXR4P"
};

const app = !getApps.length ? initializeApp(firebaseConfig) : getApp();

export const auth  = getAuth(app)

export const db = getFirestore(app)
