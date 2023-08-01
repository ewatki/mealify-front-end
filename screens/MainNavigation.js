import React from 'react'
import { createDrawerNavigator } from '@react-navigation/drawer';
import Dashboard from './Dashboard'
import Pantry from './Pantry'
import Preferences from './Preferences'

const Drawer = createDrawerNavigator();

const MainNavigation = () => {
    {/* DRAWER IN HOME */}
    return (
        <Drawer.Navigator>
            <Drawer.Screen name="Home" component={Dashboard} />
            <Drawer.Screen name="Pantry" component={Pantry} />
            <Drawer.Screen name="Preferences" component={Preferences} />
            {/* LOGOUT BTN at bottom of drawer  */}
        </Drawer.Navigator>
    )
}

export default MainNavigation;