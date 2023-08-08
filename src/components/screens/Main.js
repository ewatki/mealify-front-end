<<<<<<< HEAD
import React, { useState } from 'react'
import { createDrawerNavigator } from '@react-navigation/drawer';
import Dashboard from './Dashboard'
import Pantry from './Pantry'
import Preferences from './Preferences'
import Logout from './Logout';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

// const Drawer = createDrawerNavigator();
const Tab = createBottomTabNavigator();
=======
import React, { useState } from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import Dashboard from './Dashboard';
import Pantry from './Pantry';
import Preferences from './Preferences';
import Logout from './Logout';
import GetRecipes from './GetRecipes';

const Drawer = createDrawerNavigator();
>>>>>>> be41544a9aa0088498cc009a0fad58b3e8242e87

// Get user id, name from route params
// Get user's name, pantry, preferences

const Main = ({ route, navigation }) => {
    // const {id, username, pantry, savedRecipes, preferences} = route.params;
    // console.log(route.params)
    // console.log("Main Route", route.params.user)

    return (
<<<<<<< HEAD
<<<<<<< HEAD:components/screens/Main.js
        <Tab.Navigator>
            <Tab.Screen 
            name={"Dashboard"}
            component={Dashboard} 
            initialParams={{user: route.params.user}}
            
            />
            <Tab.Screen 
=======
        <Drawer.Navigator>
            {/* <Drawer.Screen 
            name={`Hello, ${route.params.user.username}!`}
            component={Dashboard} 
            initialParams={{user: route.params.user}}

            /> */}
            <Drawer.Screen 
>>>>>>> 81c6d35e8d1165e4c6c37f0b2820c6af850d6f42:src/components/screens/Main.js
            name="Pantry" 
            component={Pantry} 
            />

            <Tab.Screen
=======
        <Drawer.Navigator>
            <Drawer.Screen 
            name={`Hello, ${route.params.user.username}!`}
            component={Dashboard} 
            initialParams={{user: route.params.user}}
            /> 
            <Drawer.Screen 
            name="Pantry" 
            component={Pantry} 
            initialParams={{user: route.params.user}}
            />

            <Drawer.Screen
>>>>>>> be41544a9aa0088498cc009a0fad58b3e8242e87
            name="Preferences" 
            component={Preferences} 
            />

<<<<<<< HEAD
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

=======
            <Drawer.Screen 
            name="Recipes" 
            component={GetRecipes}  
            initialParams={{user: route.params.user}}
            />

            <Drawer.Screen 
            name="Logout" 
            component={Logout}  
            />
        </Drawer.Navigator>
    )
}

>>>>>>> be41544a9aa0088498cc009a0fad58b3e8242e87

export default Main;