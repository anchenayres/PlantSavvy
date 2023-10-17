import React from 'react';
import { View, Text, Image, StyleSheet, ScrollView } from 'react-native';
import { useRoute } from '@react-navigation/native';

const PlantDetailScreen = ({ route }) => {
  const { plantId, imageUri, plantName } = route.params;
  
  return (

    <View style={styles.container}>
    <Text>Details for Plant ID: {plantId}</Text>
    <Image source={{ uri: imageUri }} style={styles.plantImage} />
      <Text style={styles.plantName}>{plantName}</Text>
      </View>
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
