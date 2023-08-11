import React from 'react';
import { StyleSheet, Button } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';

import Register from './src/components/screens/Register';
import Login from './src/components/screens/Login';
import Logout from './src/components/screens/Logout';
import Main from './src/components/screens/Main';

const Stack = createStackNavigator();
const App = () => {
  return (
    <SafeAreaView style={{flex: 1}}>
        <NavigationContainer style={styles.container}>

          {/* <Stack.Navigator initialRouteName="Login" screenOptions={ */}
          <Stack.Navigator initialRouteName="Main" screenOptions={
            { 
                headerTitle: '', 
                headerStyle: { 
                    backgroundColor: 'transparent',                 shadowOpacity: 0,
                    elevation: 0,
                },
            }
          }>

            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="Register" component={Register} />

            <Stack.Screen 
              name="Main" 
              component={Main} 
              options={{headerShown: false}}
            />

        </Stack.Navigator>
        </NavigationContainer>

        <StatusBar hidden={false}/>
    </SafeAreaView>
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

export default App;