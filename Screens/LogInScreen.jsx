import React, { useState, useEffect } from "react";
import { TextInput, Button, TouchableOpacity  } from "react-native";
import { StyleSheet, Text, View } from "react-native";

import { signInUser } from "../Services/firebaseAuth";
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../firebase'; 

const LogInScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        navigation.navigate('HomeScreen');
      }
    });
    return unsubscribe;
  }, [navigation]);

  
  const handleLogin = async () => {
    try {
      const user = await signInUser(email, password);
    if (user && user.email) {
      console.log("Signed in User:", user.email);
      navigation.navigate("HomeScreen");
    } else {
      console.error("User is not signed in.");
    }
  } catch (error) {
    console.error("Sign-in failed:", error.message);
  }
  };


  
  return (
      <View style={styles.container}>
        
      <Text style={styles.heading}>Login</Text>

        <Text style={styles.label}>Email</Text>
        <TextInput
          style={styles.input}
          keyboardType="default"
          placeholder="john@doe.com"
          defaultValue={email}
          onChangeText={(newValue) => setEmail(newValue)}
        />

        <Text style={styles.label}>Password</Text>
        <TextInput
          style={styles.input}
          keyboardType="default"
          placeholder="Your Password"
          secureTextEntry={true}
          defaultValue={password}
          onChangeText={(newValue) => setPassword(newValue)}
        />

        <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
                <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>        
      
        <TouchableOpacity
        style={styles.switch} // Apply styles here
        onPress={() => navigation.navigate("RegisterScreen")}
      >
        <Text style={styles.switchText}>Don't have an account?</Text>
      </TouchableOpacity>

      </View>
  );
};

export default LogInScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  heading: {
    fontWeight: "bold",
    fontSize: 20,
    marginBottom: 80,
    color: "black",
  },
  label: {
    fontWeight: "bold",
    fontSize: 16,
    color: "black",
    marginBottom: 20,
    alignSelf: "flex-start",
    marginLeft: 100,
  },
  input: {
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 5,
    padding: 15,
    width: 200,
    marginBottom: 20,
  },
  loginButton: {
    backgroundColor: "lightblue",
    borderRadius: 5,
    padding: 10,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "white",
    textAlign: "center",
  },
  switch: {
    marginTop: 20, 
  },
  switchText: {
    fontSize: 13,
    color: "lightblue", 
  },

});
