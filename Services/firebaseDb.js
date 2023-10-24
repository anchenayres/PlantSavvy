import {collection, addDoc } from "firebase/firestore";
import {db} from "../firebase";
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { userEmail } from '../Services/firebaseAuth';
import { createUserInDb } from "../Services/firebaseDb";



//user collection
export const registerUser = async (username, email, uid) => {
    try {
        const docRef = await addDoc(collection(db, "users"), {
            username,
            email,
            uid
        });
        console.log("User added doc id: " + docRef.id);
    } catch (e) {
        console.log("Something went wrong: " + e);
    }

    createUserInDb(username, email, uid);
}

//images collection


const addImageToCollection = async (imageUrl, userEmail) => {
  try {
    const docRef = await addDoc(collection(db, 'images'), {
      image_url: imageUrl,
      user_email: userEmail,
    });

    console.log('Image added with ID: ', docRef.id);
  } catch (error) {
    console.error('Error adding image: ', error);
  }
};

export { db, addImageToCollection };
