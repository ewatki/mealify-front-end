import React, {useContext, createContext } from 'react';
import { StyleSheet, View, Text, Button, TextInput, Pressable, ActivityIndicator } from 'react-native';
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
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <View style={styles.centeredView}>
                <ActivityIndicator animating={loading} size='small' />
                <View style={styles.logo}>
                    <Text>LOGO IMAGE HERE</Text>
                </View>
                <View style={styles.modalView}>
                    <TextInput 
                        value={formFields.username} 
                        onChangeText={text => handleChange(text, 'username')} 
                        autoCompleteType="username" 
                        autoCapitalize='none'
                        placeholder='Username'
                        style={styles.input}
                    />   
                    <TextInput 
                        value={formFields.email} 
                        onChangeText={text => handleChange(text, 'email')} 
                        // textContentType="email" 
                        autoCompleteType="email" 
                        autoCapitalize='none'
                        placeholder='Email'
                        style={styles.input}
                    />   
                    <TextInput 
                        value={formFields.password} 
                        onChangeText={text => handleChange(text, 'password')} 
                        autoCompleteType="password" 
                        autoCapitalize='none'
                        placeholder='Password'
                        style={styles.input}
                    />   
                    <Button 
                    title="Create New Account" 
                    onPress={ onRegisterHandler }
                    />

                    <View style={styles.loginContainer}>
                        <Text>Already have an account?</Text>
                        <TouchableOpacity onPress={ () => navigation.navigate(Login) }>
                            <Text style={styles.loginButton}>Login</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        alignItems: 'center',
    },
    input: {
        height: 40,
        margin: 12,
        borderWidth: 1,
        padding: 10,
        borderRadius: 10,
        width: '50%',
        // justifyContent: 'center',
        // alignItems: 'center'
    },
    modalView: {
        width: 350,
        height: 400,
        margin: 5,
        padding: 35,
        // backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center',
        // backgroundColor: 'lightgray',
        borderRadius: 10,
    },
    loginButton: {
        borderWidth: 1,
        marginTop: 3,
        padding: 5,
        paddingLeft: 7,
        borderRadius: 10,
    },
    loginContainer: {
        flex: 1, 
        justifyContent: 'flex-end',
        alignItems: 'center',
    },  
    logo: {
        alignContent: 'stretch',
        justifyContent: 'top',
        width: 350,
        height: 250,
        borderRadius: 5,
        borderWidth: 2,
    },
    textbox: {
        borderRadius: 5,
        borderBottomWidth: 1.5,
        borderColor: 'gray',
        marginTop: 10,
        marginBottom: 30,
    }


    
});


export default Register;