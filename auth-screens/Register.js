import React from 'react';
import { StyleSheet, View, Text, Button, TextInput, Modal, Pressable } from 'react-native';

import Main from '../screens/MainNavigation';

const Register = ({ navigation }) => {
    const [modalVisible, setModalVisible] = React.useState(false);
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
                        <TextInput placeholder="Username" />
                        <TextInput placeholder="Email" />
                        <TextInput 
                            secureTextEntry={true}
                            placeholder="Password"
                        />
                    </View>

                    <Button title="Create account" onPress={() => navigation.navigate('Main')}
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