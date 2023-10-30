import { collection, addDoc, query, where, getDocs } from 'firebase/firestore';
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
  const addImageToCollection = async (imageUri, userEmail, imageName) => {
    try {
      const docRef = await addDoc(collection(db, 'images'), {
        image_url: imageUri,
        user_email: userEmail,
        name: imageName
      });

      console.log('Image added with ID: ', docRef.id);
    } catch (error) {
      console.error('Error adding image: ', error);
    }
  };

//images showcase
const fetchUserImages = async (userEmail) => {
  const q = query(
    collection(db, 'images'),
    where('user_email', '==', userEmail)
  );

  const querySnapshot = await getDocs(q);
  const userImages = [];

  querySnapshot.forEach((doc) => {
    const data = doc.data();
    userImages.push(data.image_url);
  });

  return userImages;
};

export { db, addImageToCollection, fetchUserImages };
