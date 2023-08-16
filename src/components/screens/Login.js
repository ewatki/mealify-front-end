import React from 'react';
import { View, Text, TextInput, Image, StyleSheet, ActivityIndicator } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import axios from 'axios';

import Main from './Main';
import Register from './Register';

const Login = ({ route, navigation }) => {
    const [formFields, setFormFields ] = React.useState({
        email: '',
        password: '',
    });
    const [errorMessage, setErrorMessage] = React.useState('');
    const [showErrorMessage, setShowErrorMessage] = React.useState(false);
    const [loading, setLoading] = React.useState(false);

    const handleChange = (text, field) => {
        if (field === 'email') {
            setFormFields({
                ...formFields,
                email: text
            });
        } else if (field === 'password') {
            setFormFields({
                ...formFields,
                password: text
            });
        };
    };

    const handleUserLogin = () => {
        setLoading('true')
        axios.post('https://mealify-zclw.onrender.com/users/login', formFields)
        .then(response => {
            setLoading(false);
            const user = response.data;
            setShowErrorMessage(false);
            setErrorMessage('');
            console.log('Successful login!');    
            navigation.navigate('Main', {user: user});
        })
        .catch(error => {
            setLoading('false');
            if (error.response.data === 'Invalid password' || error.response.data === 'That email is invalid') {
                setErrorMessage(error.response.data);
                setShowErrorMessage(true);
                console.log(error.response.data);
            } else {
                console.log('error: ', error);
                setErrorMessage('An error has occured.  Please try again or try another user email and password\nAlso, if at first you dont succeed, try, try again');
                setShowErrorMessage(true);
            };
        });
    };

    return (
        <View style={[styles.container, styles.center]}>
            <Image 
                style={styles.header}
                source={require('../../../assets/images/Mealify-logo.png')} />
            <View style={styles.activityIndicator}>
                <ActivityIndicator animating={loading} size='large' color='#756382' />
            </View>
            <View style={styles.inputContainer}>
                <TextInput 
                    value={formFields.email} 
                    onChangeText={text => handleChange(text, 'email')} 
                    autoCompleteType="email" 
                    autoCapitalize='none'
                    placeholder='Email'
                    placeholderTextColor="lightgrey" 
                    style={styles.input}
                />   
                <TextInput 
                    value={formFields.password} 
                    onChangeText={text => handleChange(text, 'password')} 
                    autoCapitalize='none'
                    placeholder='Password'
                    placeholderTextColor="lightgrey" 
                    style={styles.input}
                /> 
                <TouchableOpacity 
                    style={styles.loginButton} 
                    onPress={ handleUserLogin }
                > 
                    <Text style={styles.loginButtonText} >Login</Text>
                </TouchableOpacity>
                { showErrorMessage && 
                    <View style={styles.errorContainer}>
                        <Text style={[styles.errorMessage, styles.center]}>{errorMessage}</Text>
                    </View>
                }
            </View>
            <View style={styles.registerContainer}>
                <Text style={styles.registerTitle}>Don't have an account? </Text>
                <TouchableOpacity 
                    onPress={ () => navigation.navigate(Register)}
                    style={styles.registerButton}    
                > 
                    <Text style={styles.registerButtonText}>Register</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default Login;

const styles = StyleSheet.create({
    activityIndicator: {
        flex: 1,
        paddingTop: 20,
        marginBottom: -30,
    },
    center: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    container: {
        flex: 1, 
        backgroundColor: '#E2C274',
    },
    errorContainer: {
        alignItems: 'center',
        borderRadius: 5,
        backgroundColor: 'lightsalmon',
        alignSelf: 'center',
        padding: 4,
    },
    errorMessage: {
        color: '#8B0000',
    },
    header:{
        flex: 3, 
        justifyContent: 'center',
        marginBottom: -50,
    },
    input: {
        height: 40,
        margin: 7,
        padding: 10,
        borderRadius: 10,
        width: 300,
        backgroundColor: 'white',
        borderWidth: 1,
        borderColor: '#756382',
        fontFamily: 'Avenir-Roman',
        color: '#756382',
        
    },
    inputContainer: {
        flex: 5,
    },
    loginButton: {
        alignSelf: 'center',
        borderRadius: 10,
    },
    loginButtonText: {
        fontSize: 24,
        color: '#756382',
        fontFamily: 'Avenir-Roman'
    },
    registerButton: {
        marginTop: 3,
        padding: 7,
        borderRadius: 10,
        backgroundColor: '#756382',
    },
    registerButtonText: {
        color: '#fffdd0',
        fontFamily: 'Avenir-Roman'
    },
    registerContainer: {
        flex: 1,
        paddingBottom: 100,
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    registerTitle: {
        color: '#756382',
        fontFamily: 'Avenir-Roman'
    },
});
