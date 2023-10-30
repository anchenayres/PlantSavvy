import React from 'react';
import { View, Text, Button, StyleSheet, TouchableOpacity } from 'react-native';

const OnboardingOne = ({ navigation }) => {
  // Handle navigation to the next screen
  const handleNext = () => {
    navigation.navigate('Onboarding2');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to PlantSavvy</Text>
      <Text style={styles.description}>
        Take controll of your plants. A complete health assessmnet will be given to ensure your plants quality. There is no time to waist so let's get started!
      </Text>
      <TouchableOpacity style={styles.nextButton} onPress={handleNext}>
                <Text style={styles.buttonText}>Let's Go</Text>
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
    backgroundColor: '#69A579',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: 'white',
  },
  description: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 30,
    color: 'white',

  },

  nextButton: {
    backgroundColor: "#0B4D21",
    borderRadius: 5,
    marginTop: 80,
    padding: 10,
  },
  buttonText: {
    fontSize: 16,
    color: "white",
    textAlign: "center",
  },

});

export default OnboardingOne;
