import React, { useContext, createContext } from 'react';
import { View, Text, TextInput, Button, StyleSheet, ActivityIndicator } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import axios from 'axios';
import Register from './Register';


const Login = ({ route, navigation }) => {

    const [formFields, setFormFields ] = React.useState({
        email: '',
        password: '',
    });
    const [errorMessage, setErrorMessage] = React.useState('')
    const [loading, setLoading] = React.useState('false')
    // const UserContext = createContext(formFields);
    // const user = useContext(UserContext)  

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
        }
    }

    const handleUserLogin = () => {
        setLoading('true')
        axios.post('https://mealify-zclw.onrender.com/users/login', formFields)
        .then(response => {
            setLoading('false')
            console.log('response.data:', response.data)
            const user = response.data
            console.log('Successful login!')
            navigation.navigate('Main', {user: user})
        })
        .catch(error => {
            setLoading('false')
            if (error.response.data === 'Invalid password' || error.response.data === 'That email is invalid') {
                setErrorMessage(error.response.data)
                console.log(error.response.data)
            } else {
                console.log('error: ', error)
                setErrorMessage('An error has occured.  Please try again or try another user email and password\nAlso, if at first you dont succeed, try, try again')
            }
        })
    }

    return (
        <View style={styles.container}>
            <View style={styles.centeredView}>
                <Text style={styles.header}>Login</Text>
                <ActivityIndicator animating={loading} size='small' />
                <View style={styles.inputContainer}>
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
                        // textContentType="password"
                        autoCapitalize='none'
                        placeholder='Password'
                        style={styles.input}
                    /> 
                    <TouchableOpacity 
                        style={styles.loginButton} 
                        onPress={ handleUserLogin }
                        // hitSlop={{ bottom: 30, left: 30, right: 30 }}
                    > 
                        <Text style={{ color: '#007AFF', fontSize: 25 }} >Login</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.errorContainer}>
                    <Text style={styles.errorMessage}>{errorMessage}</Text>
                </View>
                <View style={styles.registerContainer}>
                    <Text>Don't have an account? </Text>
                    <TouchableOpacity onPress={ () => navigation.navigate(Register) }> 
                        <Text style={styles.registerButton}>Register</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
}

export default Login;

const styles = StyleSheet.create({
    container: {
        marginTop: 50,
        flex: 1, 
        // alignItems: 'center', 
        // justifyContent: 'center'
    },
    centeredView: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    errorContainer: {
        flex: 1, 
        alignItems: 'center',
        padding: 20,
    },
    errorMessage: {
        color: 'red',
        justifyContent: 'center'
    },
    header:{
        flex: 1, 
        justifyContent: 'flex-start',
        fontSize: 40,
        fontWeight: 'bold'
    },
    input: {
        // flex: 1,
        height: 40,
        margin: 12,
        borderWidth: 1,
        padding: 10,
        borderRadius: 10,
        // width: '100%',
        width: 300,
        // justifyContent: 'center',
        // alignItems: 'center'
    },
    inputContainer: {
        flex:2,
    },
    loginButton: {
        // backgroundColor: 'blue',
        // justifyContent: 'center',
        // alignItems: 'center',
        // flex:1, 
        alignSelf: 'center',
        // borderWidth: 1,
        marginTop: 3,
        marginBottom: 5,
        padding: 5,
        paddingLeft: 7,
        borderRadius: 10,
    },
    registerButton: {
        borderWidth: 1,
        marginTop: 3,
        padding: 5,
        paddingLeft: 7,
        borderRadius: 10,
    },
    registerContainer: {
        flex: 1,
        paddingBottom: 100,
        justifyContent: 'flex-end',
        alignItems: 'center'
    }
});
