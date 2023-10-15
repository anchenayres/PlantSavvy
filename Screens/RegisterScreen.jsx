import React, {useState} from "react";
import { SafeAreaView, TextInput, Button, TouchableOpacity  } from "react-native";
import {StyleSheet, Text, View, Image } from 'react-native';

import { registerNewUser } from "../Services/firebaseAuth";

const RegisterScreen = ({navigation}) => {

    const [email, setEmail] = useState('')
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const handleRegister = () => {
        registerNewUser(email, password);
      };

    return (
            <View style={styles.container}>

            <Image
                    source={require("../assets/plantLogo2.png")} // Check the path to your image
                    style={styles.logo}
            />        

                    <TextInput
                        style={styles.input} // Add this line for TextInput styling
                        keyboardType="default"
                        placeholder="Username"
                        defaultValue={username}
                        onChangeText={(newValue) => setUsername(newValue)}
                    />

                        <TextInput
                        style={styles.input} // Add this line for TextInput styling
                        keyboardType="default"
                        placeholder="Email"
                        defaultValue={email}
                        onChangeText={(newValue) => setEmail(newValue)}
                        />

                        <TextInput
                        style={styles.input} // Add this line for TextInput styling
                        keyboardType="default"
                        placeholder="Password"
                        secureTextEntry={true}
                        defaultValue={password}
                        onChangeText={(newValue) => setPassword(newValue)}
                        />

                <TouchableOpacity
                        style={styles.registerButton}
                        onPress={handleRegister}
                    >
                        <Text style={styles.buttonText}>Register</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.switch} 
                    onPress={() => navigation.navigate("LogInScreen")}
                >
                    <Text style={styles.switchText}>Already have an account?</Text>
                </TouchableOpacity>



            </View>
    )
}
export default RegisterScreen

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
    logo: {
      width: 300, // Adjust the width as needed
      height: 150, // Adjust the height as needed
      marginBottom: 80, // Adjust the margin as needed
    },  
    heading: {
      fontWeight: 'bold',
      fontSize: 20,
      marginBottom: 80, 
      color: 'black',

    },
    label: {
      fontWeight: 'bold',
      fontSize: 16,
    color: 'black',
    marginBottom: 20, 
    alignSelf: "flex-start",
    marginLeft: 100,
    },
    input: {
      borderWidth: 1,
      borderColor: 'gray',
      borderRadius: 5,
      padding: 15,
      width: 200,
      marginBottom: 20,
    },
    registerButton: {
        backgroundColor: "#0B4D21",
        borderRadius: 5, 
        padding: 10,
        marginTop: 80,
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
      color: "#0B4D21", 
    },
    
  });