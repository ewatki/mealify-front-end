import React from 'react';
import { StyleSheet, View, Text, Button, TextInput, Pressable } from 'react-native';
import axios from 'axios';

import Main from './Main';
import Login from './Login';

const Register = ({ navigation }) => {
    const [currentUser, setCurrentUser] = React.useState(); // user dict
    const [isLoggedIn, setIsLoggedIn] = React.useState(false);

    const [formFields, setFormFields ] = React.useState({
        username: '',
        password: ''
        
    });

    const onRegisterHandler = () => {
        // setCurrentUser to new user id
        // setIsLoggedIn to true
        // When new user is registered, passed their name down to Main component
        navigation.navigate(Main, {name: 'Jean'})
    }

    const onLoginHandler = () => {
        navigation.navigate(Login)
    }

    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <View style={styles.centeredView}>
                <View style={styles.logo}>
                    <Text>LOGO IMAGE HERE</Text>
                </View>
                <View style={styles.modalView}>
                    <Text>Create a username : </Text>
                    <TextInput 
                        value={formFields.username} 
                        onChangeText={text => setFormFields.username(text)} textContentType="username" autoCompleteType="username" 
                        style={styles.textbox}
                    />   

                    <Text>Create a password :</Text>
                    <TextInput 
                        value={formFields.password} 
                        onChangeText={text => setFormFields.password(text)} textContentType="password"
                        style={styles.textbox}
                    />   
                    <Button 
                    title = "Register" 
                    onPress = { onRegisterHandler }
                    />

                    <View>
                        <Text>Already have an account?</Text>
                        <Pressable onPress={ onLoginHandler }>
                            <Text>Sign In</Text>
                        </Pressable>
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
    modalView: {
        width: 350,
        height: 400,
        margin: 5,
        padding: 35,
        backgroundColor: 'white',
        alignItems: 'left',
        justifyContent: 'center',
        backgroundColor: 'lightgray',
        borderRadius: 10,
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