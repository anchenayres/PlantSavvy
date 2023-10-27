import React from 'react';
import { View, Text, Image, ScrollView } from 'react-native';

const PlantDetailScreen = ({ route }) => {
  const { imageUri, plantDetails } = route.params;
  
  const commonName = plantDetails?.commonName;
  const scientificName = plantDetails?.scientificName;
  const description = plantDetails?.description;
  return (
    <ScrollView>
      <Image source={{ uri: imageUri }} style={{ width: 200, height: 200, resizeMode: 'contain' }} />
      <Text style={{ fontSize: 20 }}>{commonName}</Text>
      <Text>{scientificName}</Text>
      <Text>{description}</Text>
    </ScrollView>
  );
};

export default PlantDetailScreen;
