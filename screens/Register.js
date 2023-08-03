import React from 'react';
import {View, Text} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

function AuthScreens() {
    return (
        <View>
            <Text>Login/Register</Text>
        </View>
    )
}

export default AuthScreens;