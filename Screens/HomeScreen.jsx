import React, { useState, useEffect }from 'react';
import {StyleSheet, Text, View, Button, TouchableOpacity, Image } from 'react-native';
import { getAuth, signOut } from 'firebase/auth';
import { useRoute, useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';

const auth = getAuth();


const HomeScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();

    const handleLogout = async () => {
      try {
        await signOut(auth);
        console.log('Logged out user');
        navigation.navigate('LogInScreen');
      } catch (error) {
        console.error('Sign out failed:', error);
      }
    };

    const handleScanNavigation = () => {
      navigation.navigate('ScanScreen');
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
        <TouchableOpacity onPress={handleScanNavigation}>
          <Ionicons style={styles.addIcon} name="add" size={30} color="#0B4D21" />
        </TouchableOpacity>

        <View style={styles.placeholderContainer}>
                <View style={styles.placeholderImageContainer}>
            <Image
              source={require('../assets/test.jpg')}
              style={styles.placeholderImage}
            />
            <Text style={styles.placeholderText}>Placeholder Plant Name One</Text>
          </View>

          <View style={styles.placeholderImageContainer}>
            <Image
              source={require('../assets/test4.jpg')}
              style={styles.placeholderImage}
            />
            <Text style={styles.placeholderText}>Placeholder Plant Name Two</Text>
          </View>

          <View style={styles.placeholderImageContainer}>
            <Image
              source={require('../assets/test3.jpg')}
              style={styles.placeholderImage}
            />
            <Text style={styles.placeholderText}>Placeholder Plant Name Three</Text>
          </View>
          
          <View style={styles.placeholderImageContainer}>
            <Image
              source={require('../assets/test2.jpg')}
              style={styles.placeholderImage}
            />
            <Text style={styles.placeholderText}>Placeholder Plant Name Four</Text>
          </View>


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
      paddingTop: 100, 
    },
    logo: {
      width: 100, // Adjust the width as needed
      height: 150, // Adjust the height as needed
      position: 'absolute',
      left: 0, 
      top: -30,
    },

    addIcon: {
      marginTop: -55, 
      marginLeft: -50, 

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
      flexDirection: 'row', 
      flexWrap: 'wrap',
      justifyContent: 'center', // Center items horizontally
    paddingVertical: 10,
      justifyContent: 'space-between', 
    },

    
    placeholderImageContainer: {
      width: '50%', // Adjust the width as needed
      marginBottom: 10, // Add some space between rows
      display: 'flex',
      alignItems: 'center',
    },
    placeholderImage: {
      width: 160,
      height: 160,
      aspectRatio: 1, 
      borderRadius: 10,
    },
    placeholderText: {
      marginTop: 10,
      fontSize: 12,
      fontWeight: 'bold',
      textAlign: 'center', 
      width: 160,

    },
  });