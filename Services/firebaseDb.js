import {collection, addDoc } from "firebase/firestore";
import {db} from "../firebase";


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
const addImageToCollection = async (imageUrl, userId) => {
  try {
    const docRef = await addDoc(collection(db, 'images'), {
      image_url: imageUrl,
      user_id: userId,
    });

    console.log('Image added with ID: ', docRef.id);
  } catch (error) {
    console.error('Error adding image: ', error);
  }
};

export { db, addImageToCollection };
