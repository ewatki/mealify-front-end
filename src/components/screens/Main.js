import React, { useState } from 'react';
import { Image, Text, Button, View } from 'react-native';
import { createDrawerNavigator, DrawerItem } from '@react-navigation/drawer';
import Ionicons from 'react-native-vector-icons/Ionicons';

import CustomDrawer from '../CustomDrawer';
import Dashboard from './Dashboard'
import Pantry from './Pantry'
import Preferences from './Preferences'
import GetRecipes from './GetRecipes';
import Recipe from './Recipe';

const Drawer = createDrawerNavigator();

const Main = ({ route, navigation }) => {
    const user = route.params.user

    // const user = {
    //     intolerances: {
    //         Dairy: 1,
    //         Egg: 1
    //     },
    //     email: "test1@gmail.com",
    //     id: 1,
    //     pantry: {
    //         food_dict: {
    //             carrots: 1,
    //             tomatoes: 1
    //         },
    //         id: 1,
    //         user_id: 1
    //     },
    //     ingredient_preferences: {
    //     },
    //     recipes: [
    //         {
    //             id: 1,
    //             image: "https://spoonacular.com/recipeImages/782585-312x231.jpg",
    //             ingredients: {
    //                 "cannellini beans": 1,
    //                 "cracked pepper": 1,
    //                 "curry leaves": 1,
    //                 "garlic": 1,
    //                 "grain mustard": 1,
    //                 "juice of lemon": 1,
    //                 "lemon zest": 1,
    //                 "mushrooms": 1,
    //                 "olive oil": 1,
    //                 "sea salt": 1,
    //                 "tarragon": 1
    //             },
    //             instructions: "Rinse the cannellini beans and soak for 8 hours or overnight in several inches of water. Drain and rinse, then transfer to a medium saucepan and cover with fresh water. Add the curry leaves or bay leaf and bring to a boil. Reduce heat to medium-low, cover, and simmer for 1 hour or until the beans are tender but not falling apart. Drain and transfer to a large salad bowl.Meanwhile, snap the woody ends off of the asparagus spears and steam the spears for 6 minutes or until just tender but still retaining their crunch. Transfer to the salad bowl.Now cook the mushrooms. Heat the oil in a large skillet over high heat. As soon as the oil is hot, drop in the mushrooms and cook, stirring constantly, for 5 minutes or until the mushrooms begin to brown and lose some of their liquid. Transfer to the bowl with the asparagus.To make the dressing, combine the tarragon, lemon zest, garlic, lemon juice, olive oil and mustard in a small food processor or blender. Process until smooth.Pour the dressing over the salad, season with salt and pepper, and toss. Serve at room temperature or chilled.",
    //             nutritional_data: 39,
    //             title: "Cannellini Bean and Asparagus Salad with Mushrooms",
    //             url: "http://foodandspice.blogspot.com/2016/05/cannellini-bean-and-asparagus-salad.html",
    //             user_id: 1,
    //             user_state: 0
    //         }
    //     ],
    //     diet_restrictions: {},
    //     username: "test1"
    // }

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
                // fontFamily: 'Avenir-Roman',
                fontSize: 15,
            }
        }}>
            <Drawer.Screen 
            name="Home"
            component={Dashboard} 
            options={{
                headerStyle: {
                    backgroundColor: 'white',
                },
            }}
            // initialParams={{user: user}}
            initialParams={{user: route.params.user}}
            />
            <Drawer.Screen 
            name="Pantry" 
            component={Pantry} 
            // initialParams={{user: user}}
            options={{headerTitle: "Pantry"}
                // headerStyle: {
                //     opacity: 0
                // }
            }
            initialParams={{user: route.params.user}}
            />

            <Drawer.Screen
            name="Recipes" 
            component={GetRecipes} 
            // initialParams={{user: user}}
            initialParams={{user: route.params.user}}
            title={'Recipes'}
            options={{
                headerTitle: 'Recipes',
                headerStyle: {
                    backgroundColor: '#E2C274',
                },
                headerTintColor: '#756382',
                headerTitleStyle: {
                    fontWeight: 'normal',
                    color: '#756382',
                    fontSize: 26, 
                    fontFamily: 'Avenir-Roman',                
                },
            }}
            />

            <Drawer.Screen
            name="Preferences" 
            component={Preferences} 
            initialParams={{user: user}}
            // options={{
            //     headerStyle: {
            //         opacity: 0
            //     }
            // }}
            // initialParams={{user: route.params.user}}
            />

            <Drawer.Screen
            name="TempRecipe" 
            component={Recipe} 
            initialParams={{user: user}}
            // initialParams={{user: route.params.user}}
            />
        </Drawer.Navigator>
    )
}


export default Main;