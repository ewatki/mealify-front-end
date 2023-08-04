import React, { useState } from 'react'
import { Button } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import Dashboard from './Dashboard'
import Pantry from './Pantry'
import Preferences from './Preferences'
import Logout from './Logout';


const Drawer = createDrawerNavigator();

const MainNavigation = ({ route }) => {
    const [sessionId, setSessionId] = useState(route.params.sessionId)
    const [userId, setUserId] = useState(route.params.userId)
    console.log('main nav: ', sessionId)

    {/* DRAWER IN HOME */}
    return (
        <Drawer.Navigator>
            <Drawer.Screen name="Home" component={Dashboard} initialParams={{sessionId: sessionId, userId: userId}} />
            <Drawer.Screen name="Pantry" component={Pantry} />
            <Drawer.Screen name="Preferences" component={Preferences} />
            <Drawer.Screen name="Logout" component={Logout}  />
            {/* LOGOUT BTN at bottom of drawer  */}
        </Drawer.Navigator>
    )
}


export default MainNavigation;