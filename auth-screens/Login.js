import React from 'react';
import { View, Text, TextInput, Form, Button } from 'react-native';
import { useState } from 'react';
import axios from 'axios';
import Main from '../screens/MainNavigation';
const client = axios.create({
    baseURL: 'http://127.0.0.1:8000'
  })
  
const Login = ({ navigation }) => {
    const [loggedIn, setLoggedIn] = useState(false);

    function submitLogin(e) {
        e.preventDefault();
        client.post(
        '/user_api/login/',
        {
            email:'test@example.com',
            password:'testing123'
        }
        ).then(function(res) {
            console.log(res.data);
            navigation.navigate('Main');
        // setCurrentUser(true);
        }).catch(error => {
            console.log(error);
        });
    }

    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text>Login</Text>
            <View>
                <TextInput placeholder="email"/>
                <TextInput 
                    secureTextEntry={true}
                    placeholder="Password"
                />
            </View>
            <Button
            title="Login"
            onPress={submitLogin}
            />
        </View>
    );
}

export default Login;