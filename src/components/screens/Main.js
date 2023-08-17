import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { Text, Image } from 'react-native';
import CustomDrawer from '../CustomDrawer';
import Dashboard from './Dashboard'
import Pantry from './Pantry'
import Preferences from './Preferences'
import GetRecipes from './GetRecipes';

const Drawer = createDrawerNavigator();

const Main = ({ route, navigation }) => {
    const user = route.params.user

    return (
        <Drawer.Navigator 
        drawerContent={props => <CustomDrawer {...props} />} 
        screenOptions={{
            headerShown: true,
            headerTitle: '',
            drawerActiveBackgroundColor: '#E2C274',
            drawerActiveTintColor: 'black',
            drawerInactiveTintColor: 'gray',
            drawerLabelStyle: {
                fontFamily: 'Avenir-Roman',
                fontSize: 15,
            }
        }}>
            <Drawer.Screen 
            name="Home"
            component={Dashboard} 
            options={{
                headerTitle: `Hello, ${route.params.user.username}`,
                headerTintColor: '#756382',
                headerTitleStyle: {
                    fontWeight: 'normal',
                    fontFamily: 'Avenir-Roman',      
                },
                headerStyle: {
                    backgroundColor: 'white',
                },
            }}
            initialParams={{user: route.params.user}}
            />
            <Drawer.Screen 
            name="Pantry" 
            component={Pantry} 
            initialParams={{user: route.params.user}}
            options={{
                headerTintColor: '#756382',
                headerBackground: () => 
                <Image 
                source={require('../../../assets/images/pantryshelves.png')}
                resizeMode="repeat"
                style={{marginBottom: 0, height: 90, overflow: 'hidden',}}
                />
            }}
            />  
            <Drawer.Screen
            name="Preferences" 
            component={Preferences} 
            initialParams={{user: route.params.user}}
            options={{
                headerTintColor: '#756382',
                headerBackground: () => 
                <Image 
                source={require('../../../assets/images/allergens.png')}
                resizeMode="repeat"
                style={{marginBottom: 0, height: 90, overflow: 'hidden',}}
                />
            }}
            />
            <Drawer.Screen
            name="Recipes" 
            component={GetRecipes} 
            initialParams={{user: route.params.user}}
            title={'Recipes'}
            options={{
                headerTitle: 'Recipes',
                headerStyle: {
                    // backgroundColor: '#E2C274',
                    backgroundColor: 'white',
                },
                headerTintColor: '#756382',
                headerTitleStyle: {
                    fontWeight: 'normal',
                    color: '#756382',
                    fontSize: 30, 
                    fontFamily: 'Avenir-Roman',                
                },
                // headerTintColor: '#756382',
                // headerBackground: () => 
                // <Image 
                // source={require('../../../assets/images/allergens.png')}
                // resizeMode="repeat"
                // style={{marginBottom: 0, height: 90, overflow: 'hidden',}}
                // />

            }}
            />
        </Drawer.Navigator>
    )
}


export default Main;