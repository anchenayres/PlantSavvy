import React, { useState, useEffect } from "react";
import { TextInput, Button, TouchableOpacity  } from "react-native";
import { StyleSheet, Text, View, Image } from "react-native";
//import AwesomeAlert from 'react-native-awesome-alerts'; //Alerts

import { signInUser } from "../Services/firebaseAuth";

const LogInScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showErrorMessage, setShowErrorMessage] = useState(false); //Alerts
  
  const handleLogin = async () => {
    try {
      const user = await signInUser(email, password);
    if (user && user.email) {
      navigation.navigate("HomeScreen");
    } else {
      setShowErrorMessage(true);
    }
  } catch (error) {
    setShowErrorMessage(true);
  }
  };


  
  return (
      <View style={styles.container}>

      <Image
        source={require("../assets/plantLogo2.png")} // Check the path to your image
        style={styles.logo}
      />        

        <TextInput
          style={styles.input}
          keyboardType="default"
          placeholder="email"
          defaultValue={email}
          onChangeText={(newValue) => setEmail(newValue)}
        />

        <TextInput
          style={styles.input}
          keyboardType="default"
          placeholder="Password"
          secureTextEntry={true}
          defaultValue={password}
          onChangeText={(newValue) => setPassword(newValue)}
        />

        {showErrorMessage && (
          <View style={styles.errorMessage}>
            <Text style={styles.errorText}>
              * Incorrect email or password. Please try again.
            </Text>
          </View>
        )}    


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
  logo: {
    width: 300, // Adjust the width as needed
    height: 150, // Adjust the height as needed
    marginBottom: 80, // Adjust the margin as needed
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
    backgroundColor: "#0B4D21",
    borderRadius: 5,
    marginTop: 80,
    padding: 10,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "white",
    textAlign: "center",
  },
  errorMessage: {
    borderRadius: 5,
    marginLeft: 20,
  },
  errorText: {
    color: "red", // Customize the text color
    fontSize: 8,
    fontWeight: "bold",
  },
  switch: {
    marginTop: 20, 
  },
  switchText: {
    fontSize: 13,
    color: "#0B4D21", 
  },

});
