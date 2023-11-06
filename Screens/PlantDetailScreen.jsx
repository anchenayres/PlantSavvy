import React, { useState, useEffect } from 'react';
import { StyleSheet, Button, View, Image, Text, ScrollView, TouchableOpacity } from 'react-native';
import {useRoute} from '@react-navigation/native';
import { Modal } from 'react-native';
import { assessPlantHealth } from '../Services/PlantIdService';


const PlantDetailScreen = ({route}) => {

  const { identificationResult } = route.params;
  const suggestions = identificationResult.result.classification.suggestions;
  const isPlant = identificationResult.result.is_plant;
  
  const [taxonomy, setTaxonomy] = useState(null); //details
  const [description, setDescription] = useState(null); //details

  const [modalVisible, setModalVisible] = useState(false);
  const [selectedImageURL, setSelectedImageURL] = useState('');

  const openModal = () => {
    console.log('Selected Image URL:', similarImageUrl);
    setSelectedImageURL(url);
    setModalVisible(true);
  };
  const closeModal = () => {
    setSelectedImageURL('');
    setModalVisible(false);
  };
  
  
  useEffect(() => {
    if (route.params) {
      const identificationResult = route.params.identificationResult;
  
      if (identificationResult) {
        // Set taxonomy data
        setTaxonomy(identificationResult.result.classification.suggestions[0].details.taxonomy);
  
        // Set description data
        const description = identificationResult.result.classification.suggestions[0].details.description;
        setDescription(description);
        console.log('Identification Result:', identificationResult);
        console.log('Number of Disease Suggestions:', identificationResult.result.disease.suggestions.length);
      }
    }
  }, [route.params]);

  console.log('identificationResult:', identificationResult);
  console.log('Identification Result:', identificationResult);
  console.log('Number of Disease Suggestions:', identificationResult.result.disease.suggestions.length);
  console.log('taxonomy:', taxonomy);
  console.log('description:', description);

  //console.log("Detail Page Image:", identifyPlant) //still undefined API UNDEFINED

  const [displayContent, setDisplayContent] = useState('speciesIdentification');







  return (
    <View style={styles.container}>
      <Image
        source={require("../assets/plantWallpaper.jpg")} // Check the path to your image
        style={styles.backgroundImage}
      />        
    
    <View style={styles.headerBlock}>
        <Text style={styles.headerText}>Plant Identified As</Text>
        <Text style={styles.headerBold}>{identificationResult.result.classification.suggestions[0].name}</Text>
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
                <Text style={styles.probability}>Probability </Text>
                <Text style={styles.probabilityValue}>
                {identificationResult.result.is_plant.probability}
                </Text>
                <Text style={styles.suggestName}>Common Names</Text>
                <Text style={styles.commonNamesValue}>
                  {identificationResult.result.classification.suggestions
                    .map((suggestion) => suggestion.name)
                    .join(', ')}
                </Text>

                <View style={styles.similarImagesContainer}>
              {identificationResult.result.classification.suggestions[0].similar_images?.map(
                (similarImage) => (
                  <TouchableOpacity
                    key={similarImage.id}
                    onPress={() => openModal(similarImage.url_small)}
                  >
                    <Image
                      source={{ uri: similarImage.url_small }}
                      style={styles.similarImage}
                    />
                  </TouchableOpacity>
                )
              )}
            </View>


            <Modal
  animationType="slide"
  transparent={true}
  visible={modalVisible}
  onRequestClose={() => setModalVisible(false)}
>
  <TouchableOpacity
    style={styles.modalContainer}
    activeOpacity={1} // To disable the opacity effect
    onPress={closeModal}
  >
    <Image
      source={{ uri: selectedImageURL }}
      style={styles.modalImage}
    />
  </TouchableOpacity>
</Modal>
  <Text style={styles.bold}>Taxonomy</Text>
  {taxonomy && (
  <View style={styles.taxonomyContainer}>
    <Text style={styles.sectionHeader}>Taxonomy</Text>
    <Text style={styles.taxonomyText}>Class: {taxonomy.class}</Text>
    <Text style={styles.taxonomyText}>Genus: {taxonomy.genus}</Text>
    <Text style={styles.taxonomyText}>Order: {taxonomy.order}</Text>
    <Text style={styles.taxonomyText}>Family: {taxonomy.family}</Text>
    <Text style={styles.taxonomyText}>Phylum: {taxonomy.phylum}</Text>
    <Text style={styles.taxonomyText}>Kingdom: {taxonomy.kingdom}</Text>
  </View>
)}
{!taxonomy && (
  <View>
<Text style={styles.unavailable}>*Unfortunalty there is no taxonomy available, this may be due to an unclear image upload.</Text>
  </View>
)}
    <Text style={styles.bold}>Description</Text>

{description && ( // Check if there's a description
        <View style={styles.descriptionContainer}>
          <Text style={styles.sectionHeader}>Description</Text>
          <Text style={styles.descriptionText}>{description}</Text> {/* Display the description */}
        </View>
      )}
{!description && (
  <View>
<Text style={styles.unavailable}>*Unfortunalty there is no description available, this may be due to an unclear image upload.</Text>
  </View>
)}

      
      </View>
          
        )}




{displayContent === 'healthAssessment' && (
          <View style={styles.healthAssessmentContainer}>
            <Text style={styles.bold}>Health Assessment</Text>
            <Text style={styles.commonNamesValue}>
              {identificationResult.result.classification.suggestions[0].name}
            </Text>



            {identificationResult.result.disease && (
  <View>
    {identificationResult.result.disease.suggestions.map((suggestion, index) => (
      <View key={index}>
        <Text style={styles.healthName}>Disease Name: {suggestion.name}</Text>
        <Text style={styles.healthName}>Probability of Disease: {suggestion.probability}</Text>

        <View style={styles.similarImagesContainer}>
          {suggestion.similar_images?.map((similarImage) => (
            <TouchableOpacity key={similarImage.id} onPress={() => openModal(similarImage.url_large)}>
              <Image source={{ uri: similarImage.url_small }} style={styles.similarImage} />
            </TouchableOpacity>
          ))}
        </View>
      </View>
    ))}
  </View>
)}

<Modal animationType="slide" transparent={true} visible={modalVisible} onRequestClose={closeModal}>
        <View style={styles.modalContainer}>
          <Image source={{ uri: selectedImageURL }} style={styles.modalImage} />
          <TouchableOpacity style={styles.closeModalButton} onPress={closeModal}>
            <Text style={styles.closeModalText}>Close</Text>
          </TouchableOpacity>
        </View>
      </Modal>



            
            {!identificationResult.result.disease && (
              <Text style={styles.light}>
                No health-related information available.
              </Text>
            )}
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
  backgroundImage: {
    position: 'absolute',
    flex: 1,
    width: 430,
    height: 940,
    justifyContent: 'center',
    alignItems: 'center',
  },
  similarImagesContainer:{
    backgroundColor:'red',

  },
  taxonomyText:{
color: 'black',
  },
  probabilityValue:{
    left: 10.,
    padding:10,
  },
  commonNamesValue:{
    left: 10.,
    padding:10,
  },
  unavailable:{
    left: 10.,
    padding:10,
    color: 'red',
  },
  imageContainer: {
    flex: 1,
  },
  headerBold:{
  color:'black',
  },
  healthName:{
    color:'black',
    padding: 30,
    left: -10,
    fontWeight: 'bold',
  },
  healthNameValue:{
    color:'#8FB79A',
    left: 30,

  },
  innerContainer:{
    height: 20,
    width: 370,
    left: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: 30,
    top: 80,
//'#b2dabe'
  },
  headerBlock: {
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    padding: 15,
    borderRadius: 10,
    margin: 10,
    marginTop: 150,
    alignItems: 'center',
  },
  headerText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'black',
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
    color: 'black',
    fontWeight: 'bold',
  },
  suggestName:{
    fontSize: 14,
    marginVertical: 10,
    padding: 2,
    margin: 10,
    color: 'black',
    fontWeight: 'bold',
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
    top: 10,
  },
  buttonText: {
    color: '#0B4D21',
    fontWeight: 'bold',
    fontSize: 12,

  },
  button: {
    backgroundColor: '#a7d4b4',
    padding: 10,
    borderRadius: 5,
    width: 170,
    justifyContent: 'center',
    alignItems: 'center',

  },
  activeButton: {
    backgroundColor: '#d4eadb', // Change the color when active
    padding: 10,
    borderRadius: 5,
    width: 170,
    justifyContent: 'center',
    alignItems: 'center',

  },
  activeButtonText: {
    color: 'white',
  },
  bold:{
    fontWeight: 'bold',
    padding: 10,
    marginTop: 10,
    color: 'black',
    fontSize: 15,

  },

  detailText: {
    fontSize: 16,
    marginBottom: 10,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.7)', // Adjust the background color and opacity
  },
  modalImage: {
    width: 300,
    height: 300,
    resizeMode: 'contain',
    backgroundColor: 'white', // Set the background color for the modal
    borderRadius: 10,
  },
  closeModalButton: {
    backgroundColor: 'white', // Set the background color for the close button
    borderRadius: 5,
    padding: 10,
    marginTop: 10,
  },
  closeModalText: {
    color: 'black',
    fontSize: 16,
    textAlign: 'center',
  },

});

export default PlantDetailScreen;
