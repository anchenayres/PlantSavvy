import React, { useState, useEffect } from 'react';
import { StyleSheet, Button, View, Image, Text, ScrollView, TouchableOpacity } from 'react-native';
import {useRoute} from '@react-navigation/native';
import { identifyPlant } from '../Services/PlantIdService';



const PlantDetailScreen = ({route}) => {

  const { identificationResult } = route.params;
  const suggestions = identificationResult.result.classification.suggestions;
  const isPlant = identificationResult.result.is_plant;
  
  //console.log("Detail Page Image:", identifyPlant) //still undefined API UNDEFINED

  const [displayContent, setDisplayContent] = useState('speciesIdentification');

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
    </View>

      
          
    <ScrollView style={styles.innerContainer}>
      <View style={styles.buttonContainer}>
      <TouchableOpacity
          style={displayContent === 'speciesIdentification' ? styles.activeButton : styles.button}
          onPress={() => setDisplayContent('speciesIdentification')}
        >
        <Text style={styles.buttonText}>Species Identification</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={displayContent === 'healthAssessment' ? styles.activeButton : styles.button}
          onPress={() => setDisplayContent('healthAssessment')}
        >
          <Text style={styles.buttonText}>Health Assessment</Text>
        </TouchableOpacity>
      </View>

        {displayContent === 'speciesIdentification' && (
          <View style={styles.speciesIdentificationContainer}>
                <Text style={styles.bold}>{identificationResult.result.classification.suggestions[0].name}</Text>
                <Text style={styles.probability}>Probability | {identificationResult.result.is_plant.probability}</Text>
                {identificationResult.result.classification.suggestions.length > 0 && (
                  <Text style={styles.suggestName}>Common Names | 
                    {identificationResult.result.classification.suggestions
                      .map((suggestion) => suggestion.name)
                      .join(', ')}
                  </Text>
)}
            </View>
          
        )}
          {displayContent === 'healthAssessment' && (
                      <View style={styles.speciesIdentificationContainer}>
                      <Text style={styles.bold}>{identificationResult.result.classification.suggestions[0].name}</Text>
                      <Text style={styles.bold}>Common Names</Text>
                      <Text style={styles.light}>Sacred Lotus</Text>
                      <Text style={styles.light}>Indian Lotus</Text>
                      <Text style={styles.light}>Bean of India</Text>
                  </View>
      
      )}
      </ScrollView>
    </View>
  );
};
  

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  imageContainer: {
    flex: 1,
  },
  innerContainer:{
    height: 300,
    width: 400,
    left: -5,
    backgroundColor: '#b2dabe',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    top: 40,
//'#b2dabe'
  },
//DATA
  speciesIdentificationContainer: {
    fontSize: 14,
    marginVertical: 10,
    padding: 15,
    margin: 10,
  },
  probability:{
    padding: 2,
    marginLeft: 10,
    color: 'white',
    fontWeight: 'bold',
  },
  suggestName:{
    fontSize: 14,
    marginVertical: 10,
    padding: 2,
    margin: 10,
    color: 'white',
    
  },
  plantImage: {
    width: 430,
    left: -20,
    height: 320,
    borderWidth: 1,
    borderColor: 'red',
    borderRadius: 10,
    marginTop: 50,
  },
  plantName: {
    fontSize: 14,
    marginVertical: 10,
    padding: 15,
    margin: 10,

  },
//DATA END
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10,
  },
  buttonText: {
    color: '#0B4D21',
    fontWeight: 'bold',
  },
  button: {
    backgroundColor: '#a7d4b4',
    padding: 10,
    borderRadius: 5,
  },
  activeButton: {
    backgroundColor: '#d4eadb', // Change the color when active
    padding: 10,
    borderRadius: 5,
  },
  activeButtonText: {
    color: 'white',
  },
  bold:{
    fontWeight: 'bold',
    padding: 10,
    marginTop: 10,
    color: 'white',
    fontSize: 15,

  },

  detailText: {
    fontSize: 16,
    marginBottom: 10,
  },

});

export default PlantDetailScreen;
