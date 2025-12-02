import { initializeApp, getApps, getApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyDm3byMJKkQMovkiPuVCW4Kjl70sSzgYp0",
  authDomain: "restaurant-c1649.firebaseapp.com",
  projectId: "restaurant-c1649",
  storageBucket: "restaurant-c1649.firebasestorage.app",
  messagingSenderId: "13416372222",
  appId: "1:13416372222:web:698d2c9b553b4257e112af",
  measurementId: "G-PR57727HD8"
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const auth = getAuth(app);
const db = getFirestore(app);
const googleProvider = new GoogleAuthProvider();

export { app, auth, db, googleProvider };
