
import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getDatabase } from "firebase/database";
import { getFirestore } from "firebase/firestore";
import firebaseConfig from "../../firebase-applet-config.json";

export const getFirebaseApp = () => {
  if (typeof window === 'undefined') return null; // Prevents server-side issues
  
  try {
    return getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);
  } catch (error) {
    console.error("Failed to initialize Firebase:", error);
    return null;
  }
};

export const getFirebaseAuth = () => {
  const app = getFirebaseApp();
  return app ? getAuth(app) : null as any;
};

export const getFirebaseDb = () => {
  const app = getFirebaseApp();
  return app ? getDatabase(app) : null as any;
};

export const getFirebaseFirestore = () => {
  const app = getFirebaseApp();
  return app ? getFirestore(app) : null as any;
};
export const googleProvider = new GoogleAuthProvider();

// For backward compatibility where we can't easily refactor
export const auth = {
    get current() { return getFirebaseAuth(); }
} as any; // This is a bit hacky, better to use getters in consumer code
