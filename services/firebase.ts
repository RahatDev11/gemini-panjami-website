
import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getDatabase } from "firebase/database";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID
};

export const getFirebaseApp = () => {
  if (!process.env.NEXT_PUBLIC_FIREBASE_API_KEY) {
    throw new Error("Firebase API Key is missing. Please check your environment variables.");
  }
  return getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);
};

export const getFirebaseAuth = () => getAuth(getFirebaseApp());
export const getFirebaseDb = () => getDatabase(getFirebaseApp());
export const getFirebaseFirestore = () => getFirestore(getFirebaseApp());
export const googleProvider = new GoogleAuthProvider();

// For backward compatibility where we can't easily refactor
export const auth = {
    get current() { return getFirebaseAuth(); }
} as any; // This is a bit hacky, better to use getters in consumer code
