import React, { useState } from 'react'
import { createDrawerNavigator } from '@react-navigation/drawer';
import Dashboard from './Dashboard'
import Pantry from './Pantry'
import Preferences from './Preferences'
import Logout from './Logout';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

// const Drawer = createDrawerNavigator();
const Tab = createBottomTabNavigator();

// Get user id, name from route params
// Get user's name, pantry, preferences

const Main = ({ route, navigation }) => {
    // const {id, username, pantry, savedRecipes, preferences} = route.params;
    // console.log(route.params)
    // console.log("Main Route", route.params.user)

    return (
        <Tab.Navigator>
            <Tab.Screen 
            name={"Dashboard"}
            component={Dashboard} 
            initialParams={{user: route.params.user}}
            
            />
            <Tab.Screen 
            name="Pantry" 
            component={Pantry} 
            />

            <Tab.Screen
            name="Preferences" 
            component={Preferences} 
            />

            <Tab.Screen 
            name="Logout" 
            component={Logout}  
            />
        </Tab.Navigator>
    )
}

//     return (
//         <Drawer.Navigator>
//             <Drawer.Screen 
//             name={`Hello, ${route.params.user.username}!`}
//             component={Dashboard} 
//             initialParams={{user: route.params.user}}

//             />
//             <Drawer.Screen 
//             name="Pantry" 
//             component={Pantry} 
//             />

//             <Drawer.Screen
//             name="Preferences" 
//             component={Preferences} 
//             />

//             <Drawer.Screen 
//             name="Logout" 
//             component={Logout}  
//             />
//         </Drawer.Navigator>
//     )
// }


export default Main;