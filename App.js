import React from 'react'
import { useState, useEffect } from 'react';
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import 'react-native-gesture-handler';
import axios from 'axios';


const Stack = createNativeStackNavigator();

function App() {
  return (
    <View>
      {/* SCREENS */}
      <AuthScreens />
      <MainScreens />
    </View>
  )
}

export default App;