import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Image, Text, ScrollView } from 'react-native';
import {useRoute} from '@react-navigation/native';
import { identifyPlant } from '../Services/PlantIdService';



const PlantDetailScreen = ({route}) => {
  const { identifyPlant } = route.params;

  // Extract the image URL from the identification result
  const imageUrl = identifyPlant?.images[0]?.url;
  console.log("Detail Page Image:", identifyPlant) //still undefined API UNDEFINED

  return (
    <ScrollView style={styles.container}>
        <Image
        source={require("../assets/background2.jpg")} // Check the path to your image
        style={styles.bubble}
        />        
      <Image source={{ uri: imageUrl }} style={styles.plantImage} />
      <View>
        
      </View>
      <Text style={styles.plantName}>Common Names:</Text>
      <Image
        source={require("../assets/background.jpg")} // Check the path to your image
        style={styles.bubble2}
        />        
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
    width: 250,
    height: 200,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 10,
    marginTop: 50,
    marginLeft: '18%'
  },
  plantName: {
    fontSize: 14,
    marginVertical: 10,
    
  },
  detailText: {
    fontSize: 16,
    marginBottom: 10,
  },
  bubble:{
    height: 150,
    width: 150,
    borderBottomRightRadius: 150,
    position: 'absolute',
    left: -20,
    top: -20,

  },
  bubble2:{
    height: 150,
    width: 150,
    borderTopLeftRadius: 150,
    position: 'absolute',
    right: -20,
    top: 200,

  },

});

export default PlantDetailScreen;
