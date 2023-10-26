import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView } from 'react-native';
import { identifyPlant } from '../Services/PlantIdService';

const PlantDetailScreen = ({ route }) => {
  const { imageBase64, latitude, longitude } = route.params;

  const [identificationResult, setIdentificationResult] = useState(null);

  useEffect(() => {
    // Call the identification function when the component mounts
    identifyPlant(imageBase64, latitude, longitude)
      .then((result) => {
        setIdentificationResult(result);
      })
      .catch((error) => {
        console.error('Error identifying plant:', error);
      });
  }, [imageBase64, latitude, longitude]);








  return (
<ScrollView>
      <View>
        <Text>Plant Name: {identificationResult?.result?.classification?.suggestions[0]?.name}</Text>
        <Image source={{ uri: identificationResult?.result?.images[0] }} style={{ width: 200, height: 200 }} />
        <Text>Probability: {identificationResult?.result?.classification?.suggestions[0]?.probability}</Text>
        <Text>Plant Description: [Your description data here]</Text>
      </View>

      {identificationResult?.result?.classification?.suggestions[0]?.similar_images?.map((image) => (
        <Image key={image.id} source={{ uri: image.url }} style={{ width: 200, height: 200 }} />
      ))}
    </ScrollView>  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  plantImage: {
    width: '100%',
    aspectRatio: 4 / 3, // Adjust the aspect ratio to match your images
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
