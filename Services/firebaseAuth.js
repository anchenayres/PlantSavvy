import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut  } from "firebase/auth";
import { initializeAuth, getAuth, onAuthStateChanged } from 'firebase/auth';
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';
import { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getReactNativePersistence } from 'firebase/auth';
import { auth } from '../firebase'; 

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

// signInUser function
const signInUser = (email, password) => {
  return signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Successfully signed in
      const user = userCredential.user;
      console.log("Signed in User: " + user.email);
      return user; // Return the user object on success
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorCode + ": " + errorMessage);
      throw new Error(errorMessage); // Throw an error on failure
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
