import React, { useState } from 'react';
import { View, Text, Button, Image, StyleSheet, TouchableOpacity } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { useNavigation } from '@react-navigation/native';
import { addImageToCollection } from "../Services/firebaseDb";

const ScanScreen = () => {
  const navigation = useNavigation();
  const [imageUri, setImageUri] = useState(null);

//navigate plant url to home screen
const handleConfirm = async () => {
  if (imageUri) {
    try {
      // Add the image to the Firestore collection
      await addImageToCollection(imageUri, 'USER_ID');
    } catch (error) {
      console.error('Error adding image to Firestore: ', error);
    }
    
    setImageUri(null);
  }
};


const handleImagePick = async () => {
  try {
    const result = await ImagePicker.launchImageLibraryAsync();

    if (!result.canceled) {
      const pickedImageUri = result.assets[0].uri;
      setImageUri(pickedImageUri);
    }
  } catch (error) {
    console.error('Error while picking an image:', error);
  }
};
  
  
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <TouchableOpacity
        style={styles.selectImage}
        onPress={handleImagePick}
      >
        <Text style={styles.buttonText}>Select an image from your camera roll. 
        Please make sure the photo clearly shows the plant for optimal results.</Text>
      </TouchableOpacity>
      {imageUri && <Image source={{ uri: imageUri }} style={styles.selectedImage} />}
      {imageUri && (
         <Button title="Confirm" onPress={handleConfirm} />
      )}
    </View>    
    );
  }

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
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
});

export default ScanScreen;
