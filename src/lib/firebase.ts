import { initializeApp, getApps, getApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID
};

// --- LOGIKA ANTI-CRASH UNTUK BUILD NETLIFY ---
// Kita buat variabel kosong dulu
let app;
let auth;
let db;
let googleProvider;

// Cek apakah API Key tersedia?
// Jika tersedia (di Browser/Laptop/Netlify Runtime), inisialisasi Firebase.
// Jika TIDAK tersedia (saat Netlify Build awal), jangan jalankan agar tidak error.
if (typeof window !== 'undefined' && firebaseConfig.apiKey) {
  try {
    app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
    auth = getAuth(app);
    db = getFirestore(app);
    
    googleProvider = new GoogleAuthProvider();
    googleProvider.setCustomParameters({
      prompt: 'select_account'
    });
  } catch (error) {
    console.error("Firebase init error:", error);
  }
} else {
  // Dummy initialization saat build agar Next.js tidak error
  // Ini hanya 'pura-pura' agar build sukses
  app = null; 
  auth = null;
  db = null;
  googleProvider = null;
}

// Export dengan casting 'any' agar TypeScript tidak protes saat build
export { app, auth, db, googleProvider };