import React from 'react';
import { View, Text, TextInput, Form, Button } from 'react-native';

import Main from '../screens/MainNavigation';

const Login = ({ navigation }) => {
    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text>Login</Text>
            <View>
                <TextInput placeholder="Username" />
                <TextInput 
                    secureTextEntry={true}
                    placeholder="Password"
                />
            </View>
            <Button
            title="Login"
            onPress={() => navigation.navigate('Main')}
            />
        </View>
    );
}

export default Login;