import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Image, Text, ScrollView } from 'react-native';
import { identifyPlant } from '../Services/PlantIdService';
const PlantDetailScreen = ({ route }) => {
  console.log(route.params)
  
  const { imageBase64, latitude, longitude, imageUri } = route.params;
  const [plantDetails, setPlantDetails] = useState(null);
  const [identificationResult, setIdentificationResult] = useState(null);

  useEffect(() => {
    console.log('PlantDetailScreen component is rendered.');

    if (imageBase64 && latitude && longitude) {
      identifyPlant(imageBase64, latitude, longitude)
        .then((result) => {
          setIdentificationResult(result);
          console.log('Identification Result: ', result);
        })
        .catch((error) => {
          console.error('Error identifying plant:', error);
        });
    }
  }, [imageBase64, latitude, longitude]);


  return (

<ScrollView>
      {identificationResult ? (
        <>
    <Text>Plant Name: {plantName}</Text>
    <Image source={{ uri: imageUri }} style={{ width: 200, height: 200 }} />
    <Text>Probability: {probability}</Text>
  </>      ) : (
        <Text>Loading plant details...</Text>
      )}
    </ScrollView>


    )
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
