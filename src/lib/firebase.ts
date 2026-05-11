import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

// Initialize Firebase only once
let app: any;
let auth: any = null;
let db: any = null;
let storage: any = null;
const googleProvider = new GoogleAuthProvider();

const isConfigValid = !!firebaseConfig.apiKey && 
                     firebaseConfig.apiKey !== "undefined" && 
                     firebaseConfig.apiKey !== "";

try {
  if (typeof window === "undefined" && !isConfigValid) {
    // Mock initialization for build time
    app = getApps().length ? getApp() : initializeApp({ apiKey: "mock-key", projectId: "mock-id" });
  } else if (!isConfigValid) {
    // If we're on client but keys are missing, don't initialize real firebase
    console.warn("Firebase keys are missing. Auth and database features will be disabled.");
    app = getApps().length ? getApp() : initializeApp({ apiKey: "missing-key", projectId: "missing-id" });
  } else {
    app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
  }

  // Safely initialize services
  if (app) {
    auth = getAuth(app);
    db = getFirestore(app);
    storage = getStorage(app);
  }
} catch (error) {
  console.error("Firebase critical initialization error:", error);
  // Fallback to empty objects to prevent crashes on undefined access
  auth = auth || {};
  db = db || {};
  storage = storage || {};
}

export { app, auth, db, storage, googleProvider };
