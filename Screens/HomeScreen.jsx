import React from 'react';
import {StyleSheet, Text, View, Button } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { getAuth, signOut } from 'firebase/auth';

const Stack = createNativeStackNavigator();
const auth = getAuth();


const HomeScreen = ({ navigation }) => {
    const handleLogout = async () => {
      try {
        await signOut(auth);
        // You can also clear any user-related data from your app's state here.
        navigation.navigate('LogInScreen');
      } catch (error) {
        console.error('Sign out failed:', error);
      }
    };

    return (
        <View style={styles.container}>
          <Text style={styles.heading}>Home Screen</Text>
          <Button title="Log Out" onPress={handleLogout} />
        </View>
      );
    };


export default HomeScreen

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
    heading:{
        fontWeight: 'bold',
        fontSize: 20,

    }
  });