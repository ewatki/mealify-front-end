import React, {useContext, createContext } from 'react';
import { StyleSheet, View, Text, Image, TextInput, ActivityIndicator } from 'react-native';
import axios from 'axios';

import { TouchableOpacity } from 'react-native-gesture-handler';


const Register = ({ navigation }) => {
    const [loading, setLoading] = React.useState('false')
    const [errorMessage, setErrorMessage] = React.useState('')
    const [formFields, setFormFields ] = React.useState({
        username: '',
        password: '',
        email: ''
    });

    const handleChange = (text, field) => {
        if (field === 'email') {
            setFormFields({
                ...formFields,
                email: text
            })
        } else if (field === 'password') {
            setFormFields({
                ...formFields,
                password: text
            })
        } else if (field === 'username') {
            setFormFields({
                ...formFields,
                username: text
            })
        }
    }

    const onRegisterHandler = () => {
        setLoading('true')
        axios.post('https://mealify-zclw.onrender.com/users/register', formFields)
        .then(response => {
            const user = response.data
            setLoading('false')
            console.log('Successful Registration!')
            navigation.navigate('Main', {user: user})
        })
        .catch(error => {
            setLoading('false')
            if (error.response.data === 'Invalid password' || error.response.data === 'That email is invalid') {
                setErrorMessage(error.response.data)
                console.log(error.response.data)
            } else {
                console.log('error: ', error)
                setErrorMessage('An error has occured.  Please try again or try another user email and password<br>Also, if at first you dont succeed, try, try again')
            }
        })
    }

    return (
        <View style={styles.container}>
            <Image 
                style={styles.header}
                source={require('../../../assets/images/Mealify-logo.png')} />
            <View style={styles.activityIndicator}>
                <ActivityIndicator animating={loading} size='large' color='#756382' />
            </View>
            <View style={styles.inputContainer}>
                <TextInput 
                    value={formFields.username} 
                    onChangeText={text => handleChange(text, 'username')} 
                    autoCompleteType="username" 
                    autoCapitalize='none'
                    placeholder='Username'
                    placeholderTextColor="lightgrey" 
                    style={styles.input}
                />   
                <TextInput 
                    value={formFields.email} 
                    onChangeText={text => handleChange(text, 'email')} 
                    // textContentType="email" 
                    autoCompleteType="email" 
                    autoCapitalize='none'
                    placeholder='Email'
                    placeholderTextColor="lightgrey" 
                    style={styles.input}
                />   
                <TextInput 
                    value={formFields.password} 
                    onChangeText={text => handleChange(text, 'password')} 
                    autoCompleteType="password" 
                    autoCapitalize='none'
                    placeholder='Password'
                    placeholderTextColor="lightgrey" 
                    style={styles.input}
                />   
                <TouchableOpacity 
                    style={styles.registerButton} 
                    onPress={ onRegisterHandler }
                    // hitSlop={{ bottom: 30, left: 30, right: 30 }}
                > 
                    <Text style={styles.registerButtonText} >Register</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.loginContainer}>
                <Text style={styles.loginTitle}>Already have an account?</Text>
                <TouchableOpacity 
                    onPress={ () => navigation.navigate('Login') }
                    style={styles.loginButton}>
                    <Text style={styles.loginButtonText}>Login</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    activityIndicator: {
        flex: 1,
        marginTop: -30,
    },
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#E2C274',
    },
    header: {
        flex: 4,
        justifyContent: 'center',
    },
    input: {
        height: 40,
        margin: 7,
        padding: 10,
        borderRadius: 10,
        width: 300,
        backgroundColor: 'white',
        // backgroundColor: '#756382',
        borderWidth: 1,
        borderColor: '#756382',
        color: '#756382',
        fontFamily: 'Avenir-Roman'
        // color: '#fffdd0',
    },
    inputContainer: {
        flex: 5, 
        width: 350,
        height: 400,
        margin: 5,
        padding: 35,
        paddingTop: 0,
        alignItems: 'center',
        borderRadius: 10,
    },
   loginButton: {
        marginTop: 3,
        padding: 6,
        borderRadius: 10,
        backgroundColor: '#756382',
    },
    loginButtonText: {
        color: '#fffdd0',
        fontFamily: 'Avenir-Roman'
    },
    loginContainer: {
        flex: 1,
        paddingBottom: 100,
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    loginTitle: {
        color: '#756382',
        fontFamily: 'Avenir-Roman'
    },
    logo: {
        alignContent: 'stretch',
        justifyContent: 'top',
        width: 350,
        height: 250,
        borderRadius: 5,
        borderWidth: 2,
    },
    registerButton: {
        alignSelf: 'center',
        borderRadius: 10,
    },
    registerButtonText: {
        fontSize: 24,
        color: '#756382',
        fontFamily: 'Avenir-Roman'
    },
});


export default Register;