import React from 'react';
import { View, ActivityIndicator } from 'react-native';
import axios from 'axios';
import App from '../App'

const Logout = ({ route, navigation }) => {
  return (
    <View>
      <ActivityIndicator size="large" color="purple" />
    </View>
  )
}

export default Logout;