import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';

const OnboardingFour = ({ navigation }) => {
  // Handle navigation to the next screen
  const handleNext = () => {
    navigation.navigate('Home');
  };

  return (
    <View style={styles.container}>
      <Image
        source={require("../assets/plantbackground.jpg")} // Check the path to your image
        style={styles.logo}
      />        

      <Text style={styles.title}>Let's get started</Text>
      <Text style={styles.description}>
        View your profile and get started!
      </Text>
      <TouchableOpacity style={styles.nextButton} onPress={handleNext}>
                <Text style={styles.buttonText}>Done</Text>
        </TouchableOpacity>    

        <Image
        source={require("../assets/plantbackground.jpg")} // Check the path to your image
        style={styles.logo2}
      />        


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
  description: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 30,
    color: '#5A5A5A',

  },
  logo: {
    height: 120,
    width: 200,
    top: -150,
    left: -120,
    borderTopRightRadius: 200,
    borderBottomRightRadius: 200,

  },
  logo2: {
    height: 100,
    width: 200,
    top: 190,
    right: -120,
    borderTopLeftRadius: 200,
    borderBottomLeftRadius: 200,

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

export default OnboardingFour;
