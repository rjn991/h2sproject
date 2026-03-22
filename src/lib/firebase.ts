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
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

// Log warning if any key is missing or is the build-time placeholder
Object.entries(firebaseConfig).forEach(([key, value]) => {
  if (!value || value === "dummy-key" || value === "dummy-domain" || value === "dummy-app-id") {
    console.error(`FIREBASE CONFIG ERROR: ${key} is missing or has a dummy value! Check your NEXT_PUBLIC environment variables.`);
  }
});

// Initialize Firebase once
const app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig as any);
const db = getFirestore(app);
const auth = getAuth(app);

export { db, auth };
