import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Image, Text, ScrollView } from 'react-native';
import { identifyPlant } from '../Services/PlantIdService';




const PlantDetailScreen = ({ route }) => {
  console.log(route.params)
  
  
  const { latitude, longitude, imageUri } = route.params;
  const [plantDetails, setPlantDetails] = useState(null);

  useEffect(() => {
    console.log('PlantDetailScreen component is rendered.');

    if (imageUri && latitude && longitude) {
      // You need to pass `imageUri` to the `identifyPlant` function
      identifyPlant(imageUri, latitude, longitude)
        .then((result) => {
          setPlantDetails(result);
          console.log('Plant Details: ', result);
        })
        .catch((error) => {
          console.error('Error identifying plant:', error);
        });
    }
  }, [imageUri, latitude, longitude]);
  return (

<ScrollView>
      {plantDetails ? (
        <>
    <Text>Plant Name: {plantDetails.plantName}</Text>
    <Image source={{ uri: imageUri }} style={{ width: 200, height: 200 }} />
    <Text>Probability: {plantDetails.probability}</Text>
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
