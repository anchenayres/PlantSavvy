import React from 'react';
import {StyleSheet, Text, View } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

const Tab = createBottomTabNavigator();

const NewScreen = () => {
    return (
        <View style={styles.container}>
            <Text style={styles.heading}>New Screen</Text>
        </View>
    )
}



export default NewScreen

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