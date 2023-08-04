import React, { useState, useEffect } from 'react';
import { View, Text } from 'react-native';
import axios from 'axios';

axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.xsrfHeaderName = 'X-CSRFToken';
axios.defaults.withCredentials = true;
const client = axios.create({
    baseURL: 'http://127.0.0.1:8000/',
})


const Dashboard = ({ route, navigation}) => {
  const [userData, setUserData] = useState({})
  const { sessionId, userId }  = route.params;
  console.log('dashboard: ', sessionId)
  console.log('dashboard: ', userId)
  useEffect(()=> {
    client.get(`/rest_api/users/${userId}`)
    .then((response) => {
      setUserData(response.data)
    })
    .catch((error) => {
      setCurrentUser(false);
    })
  }, [])
  return (
    <View>
        <Text>
            Dashboard
        </Text>
        <Text>
          {JSON.stringify(userData)}
        </Text>
    </View>
  )
}

export default Dashboard;