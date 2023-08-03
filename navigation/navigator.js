import React, {useContext} from "react";
import { createStackNavigator } from '@react-navigation/stack';
import { View } from 'react-native';
import { Context } from "../globalContext/globalContext.js"


import Main from '../screens/Main.js'
import Login from '../screens/Login.js'
import Register from '../screens/Register.js'

const Stack = createStackNavigator();

function Navigator() {
    return(
        <Stack.Navigator initialRouteName="Landing">
        {(!isLoggedIn || !userObj)?
          <>
          <Stack.Screen name="Main" component={Main} options={{ headerShown: false }} />
          <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
          </>
          :
          <Stack.Screen name="Register" component={Register} options={{ headerShown: false }} />
        }
    
        </Stack.Navigator>
    
      )
    
    
    }

    export default Navigator;