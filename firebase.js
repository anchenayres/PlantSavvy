import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth";
import { getFirestore } from "firebase/firestore";

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
const auth = getAuth(app);
const db = getFirestore(app);
export { auth, db };
