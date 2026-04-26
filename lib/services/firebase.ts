
import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getDatabase } from "firebase/database";
import { getFirestore } from "firebase/firestore";
import firebaseConfigJson from "../../firebase-applet-config.json";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY || (firebaseConfigJson as any)?.apiKey,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN || (firebaseConfigJson as any)?.authDomain,
  databaseURL: process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL || (firebaseConfigJson as any)?.databaseURL,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || (firebaseConfigJson as any)?.projectId,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET || (firebaseConfigJson as any)?.storageBucket,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID || (firebaseConfigJson as any)?.messagingSenderId,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID || (firebaseConfigJson as any)?.appId,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID || (firebaseConfigJson as any)?.measurementId,
};

// Validating config to avoid silent failures
const missingKeys = Object.entries(firebaseConfig)
  .filter(([key, value]) => !value && key !== 'measurementId') // measurementId is often optional
  .map(([key]) => key);

if (missingKeys.length > 0 && typeof window !== 'undefined') {
  console.warn("Firebase configuration is incomplete. Missing:", missingKeys.join(', '));
}

export const getFirebaseApp = () => {
  if (typeof window === 'undefined') return null;
  
  if (!firebaseConfig.apiKey) {
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
