import React from 'react';
import { StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
// import { createStackNavigator } from '@react-navigation/stack';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';

import Navigator from './src/components/navigator/navigation';

// const Stack = createStackNavigator();
const App = () => {
  return (
    <SafeAreaView style={{flex: 1}}>
        <NavigationContainer style={styles.container}>
          <Navigator /> 
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