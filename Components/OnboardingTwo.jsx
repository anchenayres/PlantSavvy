import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

const OnboardingTwo = ({ navigation }) => {
  // Handle navigation to the next screen
  const handleNext = () => {
    navigation.navigate('Onboarding3');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to My App</Text>
      <Text style={styles.description}>
        Check out you plants.
      </Text>
      <Button title="Next" onPress={handleNext} />
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
  },
  description: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 30,
  },
});

export default OnboardingTwo;
