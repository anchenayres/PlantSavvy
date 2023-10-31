import React, { useState, useEffect } from 'react';
import { StyleSheet, Button, View, Image, Text, ScrollView, TouchableOpacity } from 'react-native';
import {useRoute} from '@react-navigation/native';
import { identifyPlant } from '../Services/PlantIdService';



const PlantDetailScreen = ({route}) => {
  const { identifyPlant } = route.params;

  // Extract the image URL from the identification result
  const imageUrl = identifyPlant?.images[0]?.url;
  console.log("Detail Page Image:", identifyPlant) //still undefined API UNDEFINED

  const [displayContent, setDisplayContent] = useState('speciesIdentification');

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
      <Image source={{ uri: imageUrl }} style={styles.plantImage} />
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
          // Render Species Identification content here
          <View style={styles.plantName}>
            <Text style={styles.bold}>Nelumbo Nucifera Gaertn</Text>
          
          <Text style={styles.bold}>Common Names</Text>
          <Text style={styles.light}>Sacret Lotus</Text>
          <Text style={styles.light}>Indian Lotus</Text>
          <Text style={styles.light}>Bean of India</Text>
          
          <Text style={styles.bold}>Description</Text>
          <Text style={styles.light}>Nelumbo nucifera, also known as sacred lotus, Laxmi lotus, Indian lotus, or simply lotus, is one of two extant species of aquatic plant in the family Nelumbonaceae. It is sometimes colloquially called a water lily, though this more often refers to members of the family Nymphaeaceae.Lotus plants are adapted to grow in the flood plains of slow-moving rivers and delta areas. Stands of lotus drop hundreds of thousands of seeds every year to the bottom of the pond. While some sprout immediately, and most are eaten by wildlife, the remaining seeds can remain dormant for an extensive period of time as the pond silts in and dries out. During flood conditions, sediments containing these seeds are broken open, and the dormant seeds rehydrate and begin a new lotus colony. Under favorable circumstances, the seeds of this aquatic perennial may remain viable for many years, with the oldest recorded lotus germination being from seeds 1,300 years old recovered from a dry lakebed in northeastern China.</Text>
          
          <Text style={styles.bold}>Taxonomy</Text>
          <Text style={styles.light}>Kingdom | Plantae</Text>
          <Text style={styles.light}>Phylum | Tracheophyta</Text>
          <Text style={styles.light}>Class | Mangoliopsida</Text>
          <Text style={styles.light}>Family | Nelumbonaceae</Text>
          <Text style={styles.light}>Order | Proteales</Text>
          <Text style={styles.light}>Genus | Nelumbo</Text>

          <Text style={styles.bold}>Edible Parts</Text>
          <Text style={styles.light}>Flowers</Text>
          <Text style={styles.light}>Leaves</Text>
          <Text style={styles.light}>Root</Text>
          <Text style={styles.light}>Seeds</Text>
          <Text style={styles.light}>Stem</Text>
        
          <Text style={styles.bold}>Propogation Methods</Text>
          <Text style={styles.light}>Seeds</Text>
          </View>
        )}
          {displayContent === 'healthAssessment' && (
          // Render Health Assessment content here
          <View style={styles.plantName}>
            <Text style={styles.bold}>| Finished Flowering Period </Text>
            <Text style={styles.bold}>Description</Text>
            <Text style={styles.light}>The finished flowering period is part of the physiological process when the flowers die at the end of the flowering period. If fertilized, flowers develop into fruits.</Text>
            <Text style={styles.bold}>Treatment</Text>
            <Text style={styles.light}>Prevention | Regularly remove flowers that have finished flowering. This will encourage the growth of new flowers.</Text>

            <Text style={styles.bold}>| Fungi </Text>
            <Text style={styles.bold}>Description</Text>
            <Text style={styles.light}>Fungi take energy from the plants on which they live, causing damage to the plant. Fungal infections are responsible for approximately two-thirds of infectious plant diseases and cause wilting, molding, rusts, scabs, rotted tissue, and other problems.</Text>
            <Text style={styles.bold}>Treatment</Text>
            <Text style={styles.light}>Biological | If possible remove and destroy the infected parts of the plant. Burn it, toss it into the garbage, or bury it deeply. Do not compost.
Chemical | If necessary, apply a fungicide. If you don' know the fungus species, choose fungicide based on the infected plant (e.g. house plant, garden plant, tree).
Prevention |  Use resistant species and cultivars as well as healthy, certified seeds and seedlings.</Text>

            <Text style={styles.bold}>| Insecta </Text>
            <Text style={styles.bold}>Description</Text>
            <Text style={styles.light}>The finished flowering period is part of the physiological process when the flowers die at the end of the flowering period. If fertilized, flowers develop into fruits.</Text>
            <Text style={styles.bold}>Treatment</Text>
            <Text style={styles.light}>Biological | Remove pests mechanically. Rub the pests off, or remove infested parts or use a strong stream of water to remove the insect.
Chemical | If necessary, apply insecticide. Prevention |  Encourage the presence of natural enemies (e.g. lady beetles, lacewings, parasitic wasps).</Text>

            <Text style={styles.bold}>| Phytoplasma </Text>
                        <Text style={styles.bold}>Description</Text>
                        <Text style={styles.light}>Bacterial diseases caused by phytoplasma are usually transmitted through insects. Symptoms include abnormal floral organ development, smaller leaves, and their yellowing, and bushy appearance of plant organs called witches’ brooms.</Text>
                        <Text style={styles.bold}>Treatment</Text>
                        <Text style={styles.light}>Biological | If possible remove and destroy the infected plant. Burn it or toss it into the garbage. Do not compost.
Prevention |  Use resistant species and cultivars as well as healthy, certified seeds and seedlings.</Text>


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
  light:{
    padding: 2,
    marginLeft: 10,
    color: 'white',

  },
  detailText: {
    fontSize: 16,
    marginBottom: 10,
  },

});

export default PlantDetailScreen;
