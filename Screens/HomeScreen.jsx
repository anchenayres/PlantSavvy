import React from 'react';
import {StyleSheet, Text, View, Button, TouchableOpacity, Image } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { getAuth, signOut } from 'firebase/auth';

const Stack = createNativeStackNavigator();
const auth = getAuth();


const HomeScreen = ({ navigation }) => {
    const handleLogout = async () => {
      try {
        await signOut(auth);
        console.log('Logged out user');
        navigation.navigate('LogInScreen');
      } catch (error) {
        console.error('Sign out failed:', error);
      }
    };

    return (
        <View style={styles.container}>

        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Text style={styles.buttonText}>Log Out</Text>
        </TouchableOpacity>  

        <Image
        source={require("../assets/plantLogo2.png")} // Check the path to your image
        style={styles.logo}
        />        

        <Text style={styles.heading}>My Plants</Text>

        <View style={styles.placeholderContainer}>
          <View style={styles.placeholderImage} />
          <Text style={styles.placeholderText}>Placeholder Plant</Text>
        </View>

        </View>
      );
    };


export default HomeScreen

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
    logo: {
      width: 200, // Adjust the width as needed
      height: 150, // Adjust the height as needed
      position: 'absolute',
      left: -45, 
      top: -10,
    },
    heading:{
        fontWeight: 'bold',
        fontSize: 20,
        top: 150,
        left: 30,
        position: 'absolute',
      },
    logoutButton:{
      position: 'absolute',
      right: 20, 
      top: 20,
    },
    buttonText:{
      color: "#0B4D21",
    },
    placeholderContainer: {
      width: '50%', // Display two side by side, so take 50% of the width
      alignItems: 'center',
      justifyContent: 'center',
    },
    placeholderImage: {
      width: '100%', // Take up the full width
      aspectRatio: 1, // Maintain a 1:1 aspect ratio for square images
      borderWidth: 1,
      borderColor: 'gray',
      borderRadius: 10,
    },
    placeholderText: {
      marginTop: 10,
      fontSize: 16,
      fontWeight: 'bold',
    },
  });