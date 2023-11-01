import { collection, addDoc, query, where, getDocs,Timestamp } from 'firebase/firestore';
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
  const addImageToCollection = async (imageUri, userEmail, base64) => {
    try {
      const docRef = await addDoc(collection(db, 'images'), {
        image_url: imageUri,
        user_email: userEmail,
        base: base64,
      });

      console.log('Image added with ID: ', docRef.id);
    } catch (error) {
      console.error('Error adding image: ', error);
    }
  };

//images showcase
const fetchUserImages = async (userEmail) => {
  try {
    const q = query(
      collection(db, 'images'),
      where('user_email', '==', userEmail)
    );

    const querySnapshot = await getDocs(q);
    const userImages = [];

    querySnapshot.forEach((doc) => {
      const data = doc.data();
      userImages.push({ image_url: data.image_url, base64: data.base });
    });

    return userImages;
  } catch (error) {
    console.error('Error fetching images:', error);
    throw error; // Rethrow the error to propagate it
  }
};

export { db, addImageToCollection, fetchUserImages };
