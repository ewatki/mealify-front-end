import React from 'react';
import { View, Text, TextInput, Form, Button } from 'react-native';
import { useState } from 'react';
import axios from 'axios';
import Main from '../screens/MainNavigation';
axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.xsrfHeaderName = 'X-CSRFToken';
axios.defaults.withCredentials = true;

const client = axios.create({
    baseURL: 'http://127.0.0.1:8000'
  })
  
const Login = ({ navigation }) => {
    const [loggedIn, setLoggedIn] = useState(false);
    const [email, onChangeEmail] = React.useState('');
    const [password, onChangePassword] = React.useState('');

    // const [formFields, setFormFields] = useState({
    //     email: '',
    //     password: ''
    // })

    // const handleChange = (e, name) => {
    //     setFormFields({...formFields, [name]: e.target.value})
    // }

    // const handleSubmit = (event) => {
    //     event.preventDefault();
    //     addNewBoardCallback(formFields);

    //     setFormFields({
    //         owner: '', 
    //         title: ''
    //     });
    // };

    function submitLogin(e) {
        console.log(email, password);
        e.preventDefault();
        client.post(
        '/user_api/login/',
        {
            email: email,
            password: password
        }
        ).then(function(res) {
            console.log(res.data);
            // setFormFields({
            //     email: '',
            //     password: ''
            // })
            navigation.navigate('Main');
            // setCurrentUser(true);
        }).catch(error => {
            console.log(error);
            console.log(error.request.xsrfHeaderName)
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

                    // onChange={(e) => handleChange(e, "email")}
                />
                <TextInput 
                    autoCapitalize='none'
                    secureTextEntry={true}
                    placeholder="password"
                    value={password}
                    onChangeText={onChangePassword}
                    // onChange={(e) => handleChange(e, "password")}
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