
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getDatabase } from "firebase/database";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "AIzaSyCVSzQS1c7H4BLhsDF_fW8wnqUN4B35LPA",
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "nahid-6714.firebaseapp.com",
  databaseURL: import.meta.env.VITE_FIREBASE_DATABASE_URL || "https://nahid-6714-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "nahid-6714",
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "nahid-6714.appspot.com",
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "505741217147",
  appId: import.meta.env.VITE_FIREBASE_APP_ID || "1:505741217147:web:25ed4e9f0d00e3c4d381de",
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID || "G-QZ7CTRKHCW"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getDatabase(app);
export const firestore = getFirestore(app);
export const googleProvider = new GoogleAuthProvider();

export default app;
