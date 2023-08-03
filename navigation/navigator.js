import React, {useContext, useState} from "react";
import { createStackNavigator } from '@react-navigation/stack';
import { View } from 'react-native';
// import { Context } from "../globalContext/globalContext.js"


import Main from '../screens/Main.js'
import Login from '../screens/Login.js'
import Register from '../screens/Register.js'

const Stack = createStackNavigator();

function Navigator() {
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    // const [ userObj, setUserObj ] = useState(null)
    return(
        <Stack.Navigator initialRouteName="Main">
        {(isLoggedIn)?
          <>
          <Stack.Screen name="Main" component={Main} options={{ headerShown: false }} />
          <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
          </>
          :
          <Stack.Screen name="Register" component={Register} options={{ headerShown: true }} />
        }
    
        </Stack.Navigator>
    
      )
    
    
    }

    export default Navigator;