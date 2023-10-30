import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';

const OnboardingTwo = ({ navigation }) => {
  // Handle navigation to the next screen
  const handleNext = () => {
    navigation.navigate('Onboarding3');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Upload your Plant</Text>
      <Image
        source={require("../assets/upload.png")} // Check the path to your image
        style={styles.upload}
      />        

      <Text style={styles.description}>
        Take a photo of your plant and upload your image in the scan screen. Once the image is uploaded, you can view your plant in the home screen.
      </Text>
      <TouchableOpacity style={styles.nextButton} onPress={handleNext}>
                <Text style={styles.buttonText}>Next</Text>
        </TouchableOpacity>    

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    backgroundColor: 'white',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#0B4D21',
  },
  upload: {
    height: 100,
    width: 100,
    margin: 50,
  },
  description: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 30,
    color: '#5A5A5A',

  },
  nextButton: {
    backgroundColor: "#0B4D21",
    borderRadius: 5,
    top: 50,
    padding: 10,
  },
  buttonText: {
    fontSize: 16,
    color: "white",
    textAlign: "center",
  },
});

export default OnboardingTwo;
