import React, {useState} from "react";
import { SafeAreaView, TextInput, Button, TouchableOpacity  } from "react-native";
import {StyleSheet, Text, View } from 'react-native';

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
                    <Text style={styles.heading}>Register</Text>

                <Text style={styles.label}>Username</Text>
                    <TextInput
                        style={styles.input} // Add this line for TextInput styling
                        keyboardType="default"
                        placeholder="john doe"
                        defaultValue={username}
                        onChangeText={(newValue) => setUsername(newValue)}
                    />

                <Text style={styles.label}>Email</Text>
                        <TextInput
                        style={styles.input} // Add this line for TextInput styling
                        keyboardType="default"
                        placeholder="john@doe.com"
                        defaultValue={email}
                        onChangeText={(newValue) => setEmail(newValue)}
                        />

                <Text style={styles.label}>Password</Text>
                        <TextInput
                        style={styles.input} // Add this line for TextInput styling
                        keyboardType="default"
                        placeholder="Your Password"
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
        backgroundColor: "lightblue",
        borderRadius: 5, 
        padding: 10,
    },
    button: {
        marginVertical: 10,
    },
      switch: {
        marginTop: 20, 
    },
        switchText: {
        fontSize: 13,
        color: "lightblue", 
    },
    
  });