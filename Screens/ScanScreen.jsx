import React, { useState } from 'react';
import { View, Text, Button, Image, StyleSheet, TouchableOpacity } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import axios from 'axios';

const ScanScreen = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [plantData, setPlantData] = useState(null);
  const [image, setImage] = useState(null);
  
    const pickImage = async () => {
      // No permissions request is necessary for launching the image library
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });
  
      console.log(result);
  
      if (!result.canceled) {
        setImage(result.assets[0].uri);
      }
    };


  
  const sendImageToAPI = (imageUri) => {
    const apiUrl = 'https://plant.id/api/v3/identification'; 

    // Create a FormData object and append the image to it
    const formData = new FormData();
    formData.append('image', {
      uri: imageUri,
      type: 'image/jpeg',
      name: 'image.jpg',
    });

    axios
      .post(apiUrl, formData)
      .then((response) => {
        // Handle the API response and extract relevant data
        const { input, result } = response.data;
        if (input && result && result.classification && result.classification.suggestions.length > 0) {
          const { name } = result.classification.suggestions[0];
          setPlantData({ image: imageUri, name });
        }
      })
      .catch((error) => {
        console.error('API Error:', error);
      });
  };

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <TouchableOpacity
        style={styles.selectImage}
        onPress={pickImage}
      >
        <Text style={styles.buttonText}>Select an image from your camera roll. 
        Please make sure the photo clearly shows the plant for optimal results.</Text>
      </TouchableOpacity>
      {image && <Image source={{ uri: image }} style={styles.selectedImage} />}
    </View>    
    );
};

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
