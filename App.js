import React from 'react'
import { useState, useEffect } from 'react';
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
// import { createStackNavigator } from '@react-navigation/stack';
import 'react-native-gesture-handler';
import axios from 'axios';

const Stack = createNativeStackNavigator();
// const Stack = createStackNavigator(); 

import Login from './screens/Login.js';
import Register from './screens/Register.js';
import Main from './screens/Main.js';

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{ 
          // LOGO ICON TO SIDE
          headerTitle: '',
          headerStyle: { backgroundColor: 'gray' } 
        }}
      >
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="Register" component={Register} />
          <Stack.Screen name="Main" component={Main} options={{ headerBackVisible:false }}/>
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default App;
