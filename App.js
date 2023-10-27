import React, { useState, useEffect } from "react";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { auth } from './firebase';
import { StyleSheet } from 'react-native';

import { Ionicons } from '@expo/vector-icons';


import HomeScreen from './Screens/HomeScreen';
import RegisterScreen from './Screens/RegisterScreen';
import TestScreen from './Screens/TestScreen';
import NewScreen from './Screens/NewScreen';
import LogInScreen from './Screens/LogInScreen';
import ScanScreen from "./Screens/ScanScreen";
import PlantDetailScreen from "./Screens/PlantDetailScreen";

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

  const [loggedIn, setLoggedIn] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setLoggedIn(true); // User is signed in
      } else {
        setLoggedIn(false); // User is not signed in
      }
    });
    return unsubscribe;
  }, []);

  return (
    <NavigationContainer>
          <Stack.Navigator screenOptions={{ headerShown: false }}>
            {loggedIn ? (
             <Stack.Screen name="OuterHomeScreen" component={TabNavigator} />
             ) : (
               <>
                <Stack.Screen name="LogInScreen" component={LogInScreen} />
                <Stack.Screen name="RegisterScreen" component={RegisterScreen} />
               </>
            )}
             <Stack.Screen name="PlantDetailScreen" component={PlantDetailScreen} />
          </Stack.Navigator>
    </NavigationContainer>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
