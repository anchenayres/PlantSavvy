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

const getUserImages = async (userUid) => {
    try {
      const imagesQuery = query(collection(db, "images"), where("user_id", "==", userUid));
      const imageSnapshot = await getDocs(imagesQuery);
      const userImages = [];
      imageSnapshot.forEach((doc) => {
        userImages.push(doc.data());
      });
      return userImages;
    } catch (error) {
      console.error("Error retrieving user images: " + error);
      return [];
    }
  };