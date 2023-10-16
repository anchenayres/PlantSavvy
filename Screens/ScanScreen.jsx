import React, { useState } from 'react';
import { View, Text, Button, Image, StyleSheet } from 'react-native';

import ImagePicker from 'react-native-image-picker';
import axios from 'axios';

const ScanScreen = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [plantData, setPlantData] = useState(null);

  const handleImagePicker = () => {
    const options = {
      title: 'Select an Image',
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };

    ImagePicker.showImagePicker(options, (response) => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else {
        sendImageToAPI(response.uri);
        setSelectedImage(response.uri);
      }
    });
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
<View style={styles.container}>
      {selectedImage && (
        <Image source={{ uri: selectedImage }} style={styles.selectedImage} />
      )}
      {plantData && (
        <View>
          <Image source={{ uri: plantData.image }} style={styles.plantImage} />
          <Text>{plantData.name}</Text>
        </View>
      )}
      <Button title="Select an Image" onPress={handleImagePicker} />
    </View>  );
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
});

export default ScanScreen;
