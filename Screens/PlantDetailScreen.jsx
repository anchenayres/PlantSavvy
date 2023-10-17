import React from 'react';
import { View, Text, Image, StyleSheet, ScrollView } from 'react-native';
import { useRoute } from '@react-navigation/native';

const PlantDetailScreen = ({ route }) => {
  const { plantData } = route.params;

  //navigate from home to here:
  const route = useRoute();
  const { plantId } = route.params;
  
  return (
    <Text>Details for Plant ID: {plantId}</Text>

//<ScrollView style={styles.container}>
//<Image source={{ uri: plantData.image }} style={styles.plantImage} />
//<Text style={styles.plantName}>{plantData.name}</Text>
//<Text style={styles.detailText}>Description: Lorem ipsum dolor sit amet, consectetur adipiscing elit...</Text>
//<Text style={styles.detailText}>Diseases: Fusarium wilt, Aphids, Powdery mildew...</Text>
//</ScrollView>
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
