import React from 'react';
import { View, ActivityIndicator } from 'react-native';
import axios from 'axios';
import App from '../App'

const client = axios.create({
    baseURL: 'http://127.0.0.1:8000/',
})

const Logout = ({ route, navigation }) => {
  client.post(`/user_api/logout/`)
  .then((response) => {
    console.log(response.data)
    navigation.popToTop()
  })
  .catch(error=> {
    console.log(error)
  })
  return (
    <View>
      <ActivityIndicator size="large" color="purple" />
    </View>
  )
}

export default Logout;