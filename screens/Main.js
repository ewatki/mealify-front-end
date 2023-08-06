import React, { useState } from 'react'
import { createDrawerNavigator } from '@react-navigation/drawer';
import Dashboard from './Dashboard'
import Pantry from './Pantry'
import Preferences from './Preferences'
import Logout from './Logout';

const Drawer = createDrawerNavigator();

// Get user id, name from route params
// Get user's name, pantry, preferences

const Main = ({ route, navigation }) => {
    // const {id, username, pantry, savedRecipes, preferences} = route.params;
    // console.log(route.params)
    console.log(route)

    return (
        <Drawer.Navigator>
            <Drawer.Screen 
            name="Dashboard" 
            component={Dashboard} 
            // initialParams={{name: "Jean"}}
            initialParams={{}}

            />
            <Drawer.Screen 
            name="Pantry" 
            component={Pantry} 
            />

            <Drawer.Screen
            name="Preferences" 
            component={Preferences} 
            />

            <Drawer.Screen 
            name="Logout" 
            component={Logout}  
            />
        </Drawer.Navigator>
    )
}


export default Main;