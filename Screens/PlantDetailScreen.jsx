import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Image, Text, ScrollView } from 'react-native';

import {useRoute} from '@react-navigation/native';
import { identifyPlant } from '../Services/PlantIdService';



const PlantDetailScreen = ({route}) => {
  const { identificationResult } = route.params;

  // Extract the image URL from the identification result
  const imageUrl = identificationResult?.images[0]?.url;

  return (
    <ScrollView style={styles.container}>
      <Image source={{ uri: imageUrl }} style={styles.plantImage} />
      <Text style={styles.plantName}>Plant Name: {identificationResult?.classification.suggestions[0].name}</Text>
      {/* Add more details as needed */}
    </ScrollView>
  );
};
  

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  plantImage: {
    width: '100%',
    aspectRatio: 4 / 3, 
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 10,
  },
  plantName: {
    fontSize: 24,
    fontWeight: 'bold',
    marginVertical: 10,
  },
  detailText: {
    fontSize: 16,
    marginBottom: 10,
  },
});

export default PlantDetailScreen;
