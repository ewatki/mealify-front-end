import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import Register from '../screens/Register';
import Login from '../screens/Login';
import Main from '../screens/Main';
import RecipeList from '../screens/RecipeList';
import Recipe from '../screens/Recipe';

const Stack = createStackNavigator();
const Navigator = () => {
    return (
        <Stack.Navigator initialRouteName="Login" screenOptions={
        // <Stack.Navigator initialRouteName="Main" screenOptions={
        { 
            headerTitle: '', 
            headerStyle: { 
                backgroundColor: 'transparent',                 
                shadowOpacity: 0,
                elevation: 0,
            },
        }
        }>

            <Stack.Screen 
                name="Login" 
                component={Login} 
                options={{
                    headerStyle: {
                        backgroundColor: '#E2C274',
                    },
                    headerTintColor: '#756382',
                }}
            />
            <Stack.Screen 
                name="Register" 
                component={Register} 
                options={{
                    headerStyle: {
                        backgroundColor: '#E2C274',
                    },
                    headerTintColor: '#756382',
                }}
            />

            {/* <Stack.Screen name="RecipeList" component={RecipeList}  /> */}
            <Stack.Screen 
                name="RecipeDetails" 
                component={Recipe}  
                options={{
                    headerStyle: {
                        backgroundColor: '#E2C274',
                    },
                    headerTintColor: '#756382',
                }}
            />

            <Stack.Screen 
                name="Main" 
                component={Main} 
                options={{headerShown: false}}
            />

        </Stack.Navigator>
    )
}

export default Navigator;