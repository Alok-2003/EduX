import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyD26ibiA0p2lwTxfWX4HLeNU29TDwkGt-g",
    authDomain: "edux-99214.firebaseapp.com",
    projectId: "edux-99214",
    storageBucket: "edux-99214.firebasestorage.app",
    messagingSenderId: "285597853911",
    appId: "1:285597853911:web:08cbf1c496254898ada892"
  };

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);