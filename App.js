import { StatusBar } from 'expo-status-bar';
import { Button, StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import 'react-native-gesture-handler';
import React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';

import Login from './auth-screens/Login';
import Register from './auth-screens/Register';
import MainNavigation from './screens/MainNavigation';
import { FlatList } from 'react-native-gesture-handler';

const Stack = createNativeStackNavigator();


axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.xsrfHeaderName = 'X-CSRFToken';
axios.defaults.withCredentials = true;

const client = axios.create({
  baseURL: 'http://127.0.0.1:8000'
})

export default function App() {
  const [currentUser, setCurrentUser] = useState();

  useEffect(()=> {
    client.get('/user_api/user/')
    .then(function(res) {
      setCurrentUser(true);
    })
    .catch(function(error) {
      setCurrentUser(false);
    })
  }, [])

  return (
    <NavigationContainer style={styles.container}>
      <Stack.Navigator
        screenOptions={{ 
          // LOGO ICON TO SIDE
          headerTitle: '',
          headerStyle: { backgroundColor: 'purple' } 
        }}
      >
          <Stack.Screen name="Register" component={Register} />
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="Main" component={MainNavigation} options={{ headerBackVisible:false }}/>
      </Stack.Navigator>
      <StatusBar style="auto" />
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 22,
  },
});
