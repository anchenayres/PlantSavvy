
import React, { useState, useEffect } from "react";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { auth } from './firebase';
import { StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { useFonts } from 'expo-font';
import { AppLoading } from 'expo';

const customFonts = {
  Caveat: require('./path/to/Caveat-Regular.ttf'),
  'regular': require('./fonts/MPLUSRounded1c-Regular.ttf'),
};

//MPLUSRounded1c-Regular.ttf
import HomeScreen from './Screens/HomeScreen';
import RegisterScreen from './Screens/RegisterScreen';
import TestScreen from './Screens/TestScreen';
import NewScreen from './Screens/NewScreen';
import LogInScreen from './Screens/LogInScreen';
import ScanScreen from "./Screens/ScanScreen";
import PlantDetailScreen from "./Screens/PlantDetailScreen";

import OnboardingOne from "./Components/OnboardingOne";
import OnboardingTwo from "./Components/OnboardingTwo";
import OnboardingThree from "./Components/OnboardingThree";
import OnboardingFour from "./Components/OnboardingFour";



const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const TabNavigator = (uploadedImages) => {
  return (
    <Tab.Navigator>
      <Tab.Screen 
      name="HomeScreen"
      component={HomeScreen}
      initialParams={{uploadedImages}}
      options={{
        headerTitle: '',
      }}
      />
      <Tab.Screen name="TestScreen" component={TestScreen} />
      <Tab.Screen name="NewScreen" component={NewScreen} />
      <Tab.Screen name="ScanScreen" component={ScanScreen} />

    </Tab.Navigator>
  );
};


export default function App() {
  const [loaded] = useFonts(customFonts);
  if (!loaded) {
    return <AppLoading />; // Show a loading screen while fonts are being loaded
  }
  
  const [loggedIn, setLoggedIn] = useState(null);
  const [isNewUser, setIsNewUser] = useState(false); //onboarding

 useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setLoggedIn(true); // User is signed in
        // Check if the user is new
        if (user.metadata.creationTime === user.metadata.lastSignInTime) {
          setIsNewUser(true);
        }
      } else {
        setLoggedIn(false); // User is not signed in
        setIsNewUser(false); // Reset the new user flag
      }
    });
    return unsubscribe;
  }, []);


  return (
<NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {loggedIn ? (
          // Check if the user is new or not to decide which screen to show
          isNewUser ? (
            // Show onboarding screens for new users
            <>
              <Stack.Screen name="Onboarding1" component={OnboardingOne} />
              <Stack.Screen name="Onboarding2" component={OnboardingTwo} />
              <Stack.Screen name="Onboarding3" component={OnboardingThree} />
              <Stack.Screen name="Onboarding4" component={OnboardingFour} />
              <Stack.Screen name="Home" component={TabNavigator} />
            </>
          ) : (
            // Show the home screen for returning users
            <Stack.Screen name="OuterHomeScreen" component={TabNavigator} />
          )
        ) : (
          // Show login and registration screens when the user is not signed in
          <>
            <Stack.Screen name="LogInScreen" component={LogInScreen} />
            <Stack.Screen name="RegisterScreen" component={RegisterScreen} />
          </>
        )}
        <Stack.Screen name="PlantDetailScreen" component={PlantDetailScreen} />
      </Stack.Navigator>
    </NavigationContainer>  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
