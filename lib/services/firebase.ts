
import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getDatabase } from "firebase/database";
import { getFirestore } from "firebase/firestore";
import firebaseConfigJson from "../../firebase-applet-config.json";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY || process.env.apiKey || (firebaseConfigJson as any)?.apiKey,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN || process.env.authDomain || (firebaseConfigJson as any)?.authDomain,
  databaseURL: process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL || process.env.databaseURL || (firebaseConfigJson as any)?.databaseURL,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || process.env.projectId || (firebaseConfigJson as any)?.projectId,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET || process.env.storageBucket || (firebaseConfigJson as any)?.storageBucket,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID || process.env.messagingSenderId || (firebaseConfigJson as any)?.messagingSenderId,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID || process.env.appId || (firebaseConfigJson as any)?.appId,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID || process.env.measurementId || (firebaseConfigJson as any)?.measurementId,
};

export const getFirebaseApp = () => {
  if (typeof window === 'undefined') return null; // Prevents server-side issues
  
  if (!firebaseConfig.apiKey) {
    console.warn("Firebase API Key is missing. Check your environment variables (must start with NEXT_PUBLIC_ for client side).");
    return null;
  }
  
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
