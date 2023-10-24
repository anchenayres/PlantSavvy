import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut  } from "firebase/auth";
import {auth} from "../firebase";
import { useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';

let userEmail = '';
onAuthStateChanged(auth, (user) => {
  if (user) {
    // If the user is logged in, set the userEmail to the user's email
    userEmail = user.email;
  } else {
    // If the user is logged out, set userEmail to an empty string
    userEmail = '';
  }
});

//register new
const registerNewUser = (email, password) => {
    createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            //signed in
            const user = userCredential.user;
            console.log("New User: " + user.email)

        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorCode + ": " + errorMessage)
        });
};

//sign in
const signInUser = (email, password) => {
    signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Successfully signed in
      const user = userCredential.user;
      console.log("Signed in User: " + user.email);
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorCode + ": " + errorMessage);
    });
};

//sign out
const signOutUser = () => {
    signOut(auth)
    .then(() => {
      console.log("User signed out successfully");
    })
    .catch((error) => {
      console.error("Error signing out:", error);
    });
};


export { userEmail, registerNewUser, signInUser, signOutUser };
