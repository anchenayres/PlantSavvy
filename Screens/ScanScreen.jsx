import React, { useState } from 'react';
import { View, Text, Button, Image, StyleSheet, TouchableOpacity } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { useNavigation } from '@react-navigation/native';
import { addImageToCollection } from "../Services/firebaseDb";
//import { userEmail } from '../Services/firebaseAuth';
import { useUserEmail } from '../Services/firebaseAuth';
import * as FileSystem from 'expo-file-system';

import { identifyPlant } from '../Services/PlantIdService';


const ScanScreen = () => {
  const navigation = useNavigation();
  const [imageUri, setImageUri] = useState(null);
  const userEmail = useUserEmail();





  const handleImagePick = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync();
  
      if (!result.canceled) {
        const pickedImageUri = result.assets[0].uri;
        setImageUri(pickedImageUri);

      const imageBase64 = await FileSystem.readAsStringAsync(pickedImageUri, {
              encoding: FileSystem.EncodingType.Base64,
            });
            identifyPlant(imageBase64);
            console.log('Image as base64:', imageBase64);
          }
        } catch (error) {
          console.error('Error while picking an image:', error);
        }
    };    

    //navigate plant url to home screen
    const handleConfirm = async () => {
      if (imageUri) {
        try {
          // Add the image to the Firestore collection
          await addImageToCollection(imageUri, userEmail);
          setImageUri(null);
  
          // Navigate to the Home screen and pass the imageUri as a parameter
          navigation.navigate('HomeScreen', { imageUri});
        } catch (error) {
          console.error('Error adding image to Firestore: ', error);
        }
      }
    };

  
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: '#fff',
    }}>
        <TouchableOpacity
          style={styles.selectImage}
          onPress={handleImagePick}
        >
          <Text style={styles.buttonText}>Select an image from your camera roll. 
          Please make sure the photo clearly shows the plant for optimal results.</Text>
        </TouchableOpacity>
        {imageUri && <Image source={{ uri: imageUri }} style={styles.selectedImage} />}
        {imageUri && (
        <TouchableOpacity style={styles.loginButton} onPress={handleConfirm}>
          <Text style={styles.buttonLogin}>Confirm</Text>
        </TouchableOpacity>    
)}
      </View>    
      );
    }

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',

  },
  loginButton: {
    backgroundColor: "#0B4D21",
    borderRadius: 5,
    marginTop: 80,
    padding: 10,
  },
  buttonLogin: {
    fontSize: 16,
    color: "white",
    textAlign: "center",
  },

  selectedImage: {
    width: 200,
    height: 200,
    resizeMode: 'contain',
  },
  plantImage: {
    width: 200,
    height: 200,
    resizeMode: 'contain',
  },
  selectImage: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
    borderRadius: 5,
    width: 300,
  },
  buttonText: {
    fontSize: 16,
    color: '#0B4D21',
    textAlign: 'center',
  },
  confirm:{

  }
});

export default ScanScreen;
