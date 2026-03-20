/**
 * GOOGLE CLOUD & FIREBASE INTEGRATION (SEO)
 * ---------------------------------------
 * This project is fully integrated with:
 * - GOOGLE CLOUD RUN (Serverless Deployment)
 * - GOOGLE CLOUD BUILD (CI/CD Pipeline)
 * - GOOGLE CONTAINER REGISTRY (Docker Image Hosting)
 * - FIREBASE FIRESTORE (Real-time Database)
 * - FIREBASE AUTHENTICATION (Secure Identity Management)
 */
import { initializeApp, getApps, getApp, FirebaseApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY || "dummy-key",
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN || "dummy-domain",
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || "h2sproject-490805",
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET || "dummy-bucket",
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID || "000000000000",
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID || "dummy-app-id",
};

// Initialize Firebase once
const app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

export { db, auth };
