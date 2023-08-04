import React, { useState } from 'react';
import { StyleSheet, View, Text, Button, TextInput, Modal, Pressable } from 'react-native';
import axios from 'axios';
import Main from '../screens/MainNavigation';


axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.xsrfHeaderName = 'X-CSRFToken';
axios.defaults.withCredentials = true;
const client = axios.create({
    baseURL: 'http://127.0.0.1:8000/',
})

const Register = ({ navigation }) => {
    const [modalVisible, setModalVisible] = useState(false);
    const [email, onChangeEmail] = useState('');
    const [password, onChangePassword] = useState('');
    const [username, onChangeUsername] = useState('');
    const [invalidLogin, setInvalidLogin] = useState(false)

    const submitRegister = (event) => {
        navigation.navigate('Main')
    }
    
    return (
        <View style={{ flex: 1, alignItems: 'left', justifyContent: 'center' }}>
            {/* LOGO */}
            <Text>LOGO IMAGE HERE</Text>
            {/* MODAL POP-UP FORM */}
            <Modal
                style={styles.wrapModal}
                animationType='slide'

                visible={modalVisible}
                onRequestClose={() => {
                    Alert.alert('Account created successfully!');
                    setModalVisible(!modalVisible);
                }}
            >
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <Text>Create an Account:</Text>
                        <Pressable 
                            onPress={() => {
                            setModalVisible(false)
                            }}
                        >
                            <Text>Close</Text>
                        </Pressable>
                        <TextInput 
                            autoCapitalize='none'
                            placeholder="Username" 
                            value={username} 
                            onChangeText={onChangeUsername}
                        />
                        <TextInput 
                            autoCapitalize='none'
                            placeholder="Email" 
                            value={email} 
                            onChangeText={onChangeEmail}
                        />
                        <TextInput 
                            secureTextEntry={true}
                            autoCapitalize='none'
                            placeholder="Password" 
                            value={password} 
                            onChangeText={onChangePassword}
                        />
                    </View>

                    <Button title="Create account" onPress={(event) => submitRegister(event)}
                    />
                    </View>
            </Modal>


            {/* LOGIN VIEW */}
            <View>
                <Text>Already have an account?</Text>
                <Button title="Login" onPress={() => navigation.navigate('Login')}
                />
                <Button title="Register" onPress={() => setModalVisible(true)}
                />
            </View>

        </View>
    );
}

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 22,
    },
    modalView: {
        width: 350,
        height: 600,
        margin: 10,
        padding: 35,
        backgroundColor: 'white',
        alignItems: 'center',
        shadowColor: '#000',

    }
});


export default Register;