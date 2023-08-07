import React, { createContext, useContext } from 'react';
import { StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { UserContext, Provider } from "./components/globalContext/globalContext.js";

import Navigator from './components/navigation/navigator.js';

const App = () => {
  return (
    <Provider>
      <SafeAreaView style={{flex: 1}}>
          <NavigationContainer style={styles.container}>
            <Navigator /> 
          </NavigationContainer>
          <StatusBar hidden={true} />
      </SafeAreaView>
    </Provider>
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