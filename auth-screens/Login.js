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

    const [formFields, setFormFields] = useState({
        email: '',
        password: ''
    })

    const handleChange = (e, name) => {
        setFormFields({...formFields, [name]: e.target.value})
    }

    // const handleSubmit = (event) => {
    //     event.preventDefault();
    //     addNewBoardCallback(formFields);

    //     setFormFields({
    //         owner: '', 
    //         title: ''
    //     });
    // };

    function submitLogin(e) {
        e.preventDefault();
        client.post(
        '/user_api/login/',
        {
            email: formFields.email,
            password: formFields.password
        }
        ).then(function(res) {
            console.log(res.data);
            setFormFields({
                email: '',
                password: ''
            })
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
                <TextInput 
                    autoCapitalize='none'
                    placeholder="email" 
                    value={formFields.email} 
                    onChangeText={() => handleChange("email")}
                />
                <TextInput 
                    autoCapitalize='none'
                    secureTextEntry={true}
                    placeholder="password"
                    value={formFields.password}
                    onChangeText={() => handleChange("password")}
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