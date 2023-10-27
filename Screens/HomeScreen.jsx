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

//get data
import { identifyPlant } from '../Services/PlantIdService';

const auth = getAuth();


const HomeScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const userEmail = useUserEmail();
  const [images, setImages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

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
  
    
    //navigate to plantDetailScreen NEED TO DO
    const handlePlantDetailNavigation = async (imageUri, latitude, longitude) => {
      try {
        //const imageBase64 = await RNFS.readFile(imageUri, 'base64');    
        const plantDetails = await identifyPlant(imageBase64, latitude, longitude);
    
        if (plantDetails && plantDetails.result.is_plant) {
          const suggestions = plantDetails.result.classification.suggestions;
    
          if (suggestions.length > 0) {
            const mostProbableSuggestion = suggestions[0];
            const plantName = mostProbableSuggestion.name;
            const probability = mostProbableSuggestion.probability;
    //from postman not firestore collection anymore 
            navigation.navigate('PlantDetailScreen', { imageUri, plantName, probability });
          } else {
            console.error('No plant suggestions found');
          }
        } else {
          console.error('The image is not of a plant');
        }
      } catch (error) {
        console.error('Error identifying plant:', error);
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
<View>
        <Text style={styles.heading}>My Plants</Text>
        <TouchableOpacity onPress={handleScanNavigation}>
          <Ionicons style={styles.addIcon} name="add" size={30} color="#0B4D21" />
        </TouchableOpacity>

        
        <ScrollView style={{ marginTop: 20 }}>
        {isLoading ? (
          <Text>Loading images...</Text>
        ) : images.length === 0 ? (
          <Text>No images to display</Text>
        ) : (
          images.map((image, index) => (
            <TouchableOpacity
              key={index}
              onPress={() => handlePlantDetailNavigation(image)}
            >
              <Image source={{ uri: image }} style={styles.image} />
            </TouchableOpacity>
          ))
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

    addIcon: {
      marginTop: 15, 
      marginLeft: 150, 

    },

    heading:{
        fontWeight: 'bold',
        fontSize: 20,
        top: 20,
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
  });