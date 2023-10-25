import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut  } from "firebase/auth";
import { initializeAuth, getReactNativePersistence } from 'firebase/auth';
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';
import { useState, useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../firebase'; 

//const initializedAuth = initializeAuth(auth, {
  //persistence: getReactNativePersistence(ReactNativeAsyncStorage)
//});

//image saving in images collection

const useUserEmail = () => {
  const [userEmail, setUserEmail] = useState("");

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserEmail(user.email);
      } else {
        setUserEmail("");
      }
    });

    return unsubscribe;
  }, []);

  return userEmail;
};

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

export { useUserEmail, registerNewUser, signInUser, signOutUser };
