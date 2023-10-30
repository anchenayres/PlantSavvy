import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

const OnboardingFour = ({ navigation }) => {
  // Handle navigation to the next screen
  const handleNext = () => {
    navigation.navigate('Home');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to My </Text>
      <Text style={styles.description}>
        This is the three screen of the onboarding flow. You can add your content here.
      </Text>
      <Button title="Done" onPress={handleNext} />
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

export default OnboardingFour;
