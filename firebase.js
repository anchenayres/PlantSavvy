// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

import { onAuthStateChanged } from 'firebase/auth';

import {getAuth} from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAJkC50zuOnT7HztPzuIIbSSRErHyQehp4",
  authDomain: "term4final2023.firebaseapp.com",
  projectId: "term4final2023",
  storageBucket: "term4final2023.appspot.com",
  messagingSenderId: "538576463591",
  appId: "1:538576463591:web:a3dbd4a78d39d895d1a442",
  measurementId: "G-PJL0M4E9K9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const analytics = getAnalytics(app);

export const auth = getAuth(app);
export const db = getFirestore(app);
export { onAuthStateChanged };
