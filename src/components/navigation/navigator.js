import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import Register from '../screens/Register';
import Login from '../screens/Login';
import Logout from '../screens/Logout';
import Main from '../screens/Main';

const Stack = createStackNavigator();

// POST create new user - /users/register/
// POST login user - /users/logout/

// GET user - /users/user_id/
// DELETE user - /users/user_id/


const Navigator = () => {

    return (
        <Stack.Navigator initialRouteName="Main" screenOptions={
        // <Stack.Navigator initialRouteName="Login" screenOptions={
            { 
                headerTitle: '', 
                headerStyle: { 
                    backgroundColor: 'transparent',                 shadowOpacity: 0,
                    elevation: 0,
                },
            }
        }>
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="Register" component={Register} />

            <Stack.Screen name="Main" component={Main} options={{ headerBackVisible:false }}/>

        </Stack.Navigator>
    )
}

export default Navigator