import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';

const OnboardingThree = ({ navigation }) => {
  // Handle navigation to the next screen
  const handleNext = () => {
    navigation.navigate('Onboarding4');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Health Report</Text>
      <Image
        source={require("../assets/planthealth.png")} // Check the path to your image
        style={styles.upload}
      />        

      <Text style={styles.description}>
         Click on your image and view information about the plant and a complete health report.  
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

export default OnboardingThree;
