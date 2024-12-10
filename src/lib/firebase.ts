import { initializeApp, getApps } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyBjB1ld7xvPW2gu50rDp1uxzo-2ZElnwYw",
    authDomain: "business-888ec.firebaseapp.com",
    projectId: "business-888ec",
    storageBucket: "business-888ec.firebasestorage.app",
    messagingSenderId: "794726474471",
    appId: "1:794726474471:web:a2fb906ec016fe4c6e3842",
    measurementId: "G-D544YRH69G"
  };

// Initialize Firebase only if it hasn't been initialized already
const app = !getApps().length ? initializeApp(firebaseConfig) : getApps()[0];

// Get Auth instance
export const auth = getAuth(app);

// Get Firestore instance
export const db = getFirestore(app);