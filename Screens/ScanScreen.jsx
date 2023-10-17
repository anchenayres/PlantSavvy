import React, { useState } from 'react';
import { View, Text, Button, Image, StyleSheet, TouchableOpacity } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { useNavigation } from '@react-navigation/native';
import { identifyPlant } from "../Services/PlantIdService";

const ScanScreen = () => {
  const navigation = useNavigation();
  const [imageUri, setImageUri] = useState(null);

  const handlePlantSelection = async (imageUri, plantName, plantId) => {
    navigation.navigate('HomeScreen', {
      imageUri: pickedImageUri,
      plantName: plantName,
      plantId: plantId,
    });
  };

  const handleImagePick = async () => {
    const result = await ImagePicker.launchImageLibraryAsync();
    
    console.log(result);
  
    if (!result.canceled) {
      const pickedImageUri = result.assets[0].uri;
      setImageUri(pickedImageUri);
      const identificationResponse = await identifyPlant(pickedImageUri);
      const plantName = identificationResponse?.result?.classification?.suggestions[0]?.name;
      const plantId = identificationResponse?.result?.classification?.suggestions[0]?.id;
      handlePlantSelection(pickedImageUri, plantName, plantId);    
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
