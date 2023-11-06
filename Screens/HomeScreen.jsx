import React, { useState, useEffect }from 'react';
import {StyleSheet, Text, View, Button, TouchableOpacity, Image, ScrollView } from 'react-native';
import { getAuth, signOut } from 'firebase/auth';
import { useRoute } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import {useUserEmail} from '../Services/firebaseAuth';
import { fetchUserImages } from '../Services/firebaseDb';
import { useNavigation } from '@react-navigation/native';
//import * as FileSystem from 'expo-file-system';
//import RNFS from 'react-native-fs'; //convert to base64 image

import { identifyPlant } from '../Services/PlantIdService';
import { assessPlantHealth } from '../Services/PlantIdService';

const auth = getAuth();


const HomeScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const userEmail = useUserEmail();
  const [images, setImages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [base64, setBase64] = useState(null);
  const details = true;  //details
  const language = 'en'; //details

  const getImages = async () => {

    setIsLoading(true);
    try {
      const userImages = await fetchUserImages(userEmail);
      setImages(userImages);
    } catch (error) {
      console.error('Error fetching images:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (userEmail) {
     getImages();
    }
  }, [userEmail]);
   

  //logout from homescreen
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

    const convertBlobToBase64 = (blob) => {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => {
          resolve(reader.result);
        };
        reader.onerror = reject;
        reader.readAsDataURL(blob);
      });
    };

    const fetchBase64ForImage = async (imageUri) => {
      try {
        const response = await fetch(imageUri);
        const blob = await response.blob();
        const base64 = await convertBlobToBase64(blob);
        return base64;
      } catch (error) {
        console.error('Error fetching base64 for image:', error);
        return null; // Handle the error case as needed
      }
    };
  
  //navigate to detail screen based on base64
  const handleImageClick = async (imageUri, base64) => {
    const latitude = 49.207; // Set your desired latitude
    const longitude = 16.608;
    try {
      const details = true; 
      const language = 'en';
      const result = await identifyPlant(base64, latitude, longitude, true, details, language);
      console.log('Identification Result:', result); // Add this line
  
       navigation.navigate('PlantDetailScreen', { imageUri, identificationResult: result, imageBase64: base64 });
      // Rest of your code
    } catch (error) {
      console.error('Error identifying plant:', error);
    }
  }

    return (
        <View style={styles.container}>
        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Text style={styles.buttonText}>Log Out</Text>
        </TouchableOpacity>  

        <Image
        source={require("../assets/plantLogo2.png")} // Check the path to your image
        style={styles.logo}
        />        
<View>
        <Text style={styles.heading}>My Plant Collection</Text>
        <TouchableOpacity onPress={handleScanNavigation}>
          <Ionicons style={styles.addIcon} name="add" size={30} color="#0B4D21" />
        </TouchableOpacity>

        
        <ScrollView style={{ marginTop: 20 }}>
          {isLoading ? (
            <Text>Loading images...</Text>
          ) : images.length === 0 ? (
            <View style={{ width: 1000 }}>
              <Text style={styles.noImage}>
                Let's make this collection feel like{' '}
              <Text style={styles.boldRedText}>HOME</Text>. Let's fetch some plants!
        </Text>             
        <Image
              source={require("../assets/carryPlant2.png")} // Check the path to your image
              style={styles.carryPlant}
              />        
            </View>
          ) : (
            <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
              {images.map((image, index) => (
                <View key={index} style={styles.imageContainer} >
                  <TouchableOpacity onPress={() => handleImageClick(image.image_url, image.base64)}>
                  <Image source={{ uri: image.image_url }} style={styles.image} />
                  
                  </TouchableOpacity>
                </View>
              ))}
            </View>
          )}
        </ScrollView>


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
    imageRow: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      marginVertical: 10,
    },
    image: {
      width: 150,
      height: 150,
      margin: 15,
      marginTop: 15,

      borderRadius:20,
    },
    logo: {
      width: 100, // Adjust the width as needed
      height: 150, // Adjust the height as needed
      position: 'absolute',
      left: 0, 
      top: -30,
    },
    carryPlant: {
      width: 400, // Adjust the width as needed
      height: 450, // Adjust the height as needed
      position: 'absolute',
      left: 10, 
      top: 150,
    },
    noImage:{
      color: 'black',
      left: 110,
      width: 200,
      textAlign: 'center',
      top: 30,
    },
    boldRedText: {
      fontWeight: 'bold',
      color: '#0B4D21',
    },
    addIcon: {
      marginTop: 18, 
      left: 245, 

    },

    heading:{
        fontWeight: 'bold',
        fontSize: 20,
        top: 20,
        left: 40,
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

    uploadedImage:{
      width: 160,
      height: 160,
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
    imageContainer: {
      width: '50%', // To display two images per row, set the container width to 50%.
      padding: 10,
    },
    image: {
      width: '100%', // Make sure the image fills the container width.
      height: 150, // Adjust the height as needed.
      borderRadius: 20,
    },
  });