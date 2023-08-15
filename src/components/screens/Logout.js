import React from 'react';
import { View, ActivityIndicator, Text, Button, TouchableOpacity, StyleSheet } from 'react-native';
// import Login from './Login';


const Logout = ({ route, navigation }) => {
  const handleLogout = () => {
    navigation.navigate(Login)
  }
  return (
    <View style={styles.container}>
      <Text style={styles.youSure}>Are you sure?</Text>
      <TouchableOpacity 
        style={styles.logoutButton} 
        onPress={ handleLogout }
        // hitSlop={{ bottom: 30, left: 30, right: 30 }}
      > 
        <Text style={{ color: '#007AFF', fontSize: 25 }} >Logout</Text>
      </TouchableOpacity>
    </View>
  )
}

export default Logout;

const styles = StyleSheet.create({
  container: {
      flex: 1, 
      alignItems: 'center', 
      justifyContent: 'center'
  },
  youSure: {
    flex: 1,
    marginTop: 20,
    fontSize: 20
  },
  logoutButton: {
    flex: 5
  }
})