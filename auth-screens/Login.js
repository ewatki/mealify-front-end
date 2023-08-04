import React from 'react';
import { View, Text, TextInput, Form, Button, StyleSheet, Modal } from 'react-native';
import { useState } from 'react';
import axios from 'axios';
import Main from '../screens/MainNavigation';

axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.xsrfHeaderName = 'X-CSRFToken';
axios.defaults.withCredentials = true;
const client = axios.create({
    baseURL: 'http://127.0.0.1:8000/',
})

const Login = ({ navigation }) => {
    const [email, onChangeEmail] = useState('');
    const [password, onChangePassword] = useState('');
    const [invalidLogin, setInvalidLogin] = useState(false)

    function submitLogin(event, email, password) {
        event.preventDefault();
        client.post(
        '/user_api/login/',
        {
            email: email,
            password: password,
        })
        .then(function(response) {
            const sessionId = response.headers['set-cookie'][0].split(';')[0]
            const userId = response.data['pk']
            navigation.navigate('Main', params={
                sessionId: sessionId, 
                userId: userId
            });
        }).catch(error => {
            console.log(error); 
            setInvalidLogin(true);
            
        });
    }
    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text>Login</Text>
            <View>
                <TextInput 
                    autoCapitalize='none'
                    placeholder="email" 
                    value={email} 
                    onChangeText={onChangeEmail}
                />
                <TextInput 
                    autoCapitalize='none'
                    secureTextEntry={true}
                    placeholder="password"
                    value={password}
                    onChangeText={onChangePassword}
                />
            </View>
            <Button
            title="Login"
            onPress={(event) => submitLogin(event, email, password)}
            />
            {invalidLogin ? <Text style={{color:'red'}}>Invalid Username or Password</Text> : null}
        </View>
    );
}

export default Login;

const styles = StyleSheet.create({
    container: {
      marginTop: 50,
    },
    bigBlue: {
      color: 'blue',
      fontWeight: 'bold',
      fontSize: 30,
    },
    red: {
      color: 'red',
    },
  });
  