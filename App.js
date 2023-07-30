import React, { useEffect, useRef, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Animated, PanResponder } from 'react-native';
import { CardComponent, CardComponentBlank } from './Components/CardComponent';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './src/HomeScreen';
import AddFunctionsScreen from './src/AddFunctionsScreen';
const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{
        headerShown: false
      }}>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="AddFunction" component={AddFunctionsScreen} />


      </Stack.Navigator>
    </NavigationContainer>

  );
}


