import React, { useState, useEffect } from 'react';
import { StyleSheet, Button, View, Image, Text, ScrollView, TouchableOpacity } from 'react-native';
import {useRoute} from '@react-navigation/native';
import { identifyPlant } from '../Services/PlantIdService';
import { Modal } from 'react-native';


const PlantDetailScreen = ({route}) => {

  const { identificationResult } = route.params;
  const suggestions = identificationResult.result.classification.suggestions;
  const isPlant = identificationResult.result.is_plant;
  

  const [modalVisible, setModalVisible] = useState(false);
  const [selectedImageURL, setSelectedImageURL] = useState('');

  const openModal = () => {
    console.log('Selected Image URL:', url);
    setSelectedImageURL(url);
    setModalVisible(true);
  };
  const closeModal = () => {
    setModalVisible(false);
  };
  

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


{displayContent === 'speciesIdentification' && (
  <View style={styles.speciesIdentificationContainer}>
    {/* ...other content */}
    <Text style={styles.sectionHeader}>Similar Images</Text>
    <View style={styles.similarImagesContainer}>
      {Array.isArray(identificationResult.result.classification.suggestions[0].similar_images) ? (
        identificationResult.result.classification.suggestions[0].similar_images.map(
          (similarImage, index) => (
            <TouchableOpacity
              key={index}
              onPress={() => {
                openModal(similarImage.url_small);
              }}
            >
              <Image
                source={{ uri: similarImage.url_small }}
                style={styles.similarImage}
              />
            </TouchableOpacity>
          )
        )
      ) : (
        <Text>No similar images found.</Text>
      )}
    </View>
  </View>
)}


            <View style={styles.similarImagesContainer}>
    {identificationResult.result.classification.suggestions[0].similar_images?.map(
      (similarImage) => (
        <TouchableOpacity
          key={similarImage.id}
          onPress={() => openModal(similarImage.url_small)} // Open the modal with the selected image URL
        >
          <Image
            source={{ uri: similarImage.url_small }}
            style={styles.similarImage}
          />
        </TouchableOpacity>
      )
    )}
  </View>

      {/* Similar Image Modal */}
      <Modal
    animationType="slide"
    transparent={true}
    visible={modalVisible}
    onRequestClose={() => setModalVisible(false)}
  >
    <View style={styles.modalContainer}>
      <Image
        source={{ uri: selectedImageURL }}
        style={styles.modalImage}
      />
      <TouchableOpacity onPress={closeModal}>
        <Text style={styles.closeModalText}>Close</Text>
      </TouchableOpacity>
    </View>
  </Modal>


      
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
  backgroundImage: {
    position: 'absolute',
    flex: 1,
    width: 430,
    height: 940,
    justifyContent: 'center',
    alignItems: 'center',
  },
  probabilityValue:{
    left: 10.,
    padding:10,
  },
  commonNamesValue:{
    left: 10.,
    padding:10,
  },

  imageContainer: {
    flex: 1,
  },
  headerBold:{
color:'black',
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
    backgroundColor: 'pink',
  },
  modalImage: {
    width: 300,
    height: 300,
    resizeMode: 'contain',
    backgroundColor: 'red',
  },
  closeModalText: {
    color: 'black',
    fontSize: 16,
    margin: 20,
    textAlign: 'center',
  },

});

export default PlantDetailScreen;
