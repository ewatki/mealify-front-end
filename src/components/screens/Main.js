import React, { useState } from 'react'
import { createDrawerNavigator } from '@react-navigation/drawer';
import Dashboard from './Dashboard'
import Pantry from './Pantry'
import Preferences from './Preferences'
import Logout from './Logout';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import GetRecipes from './GetRecipes';
import Recipe from './Recipe';

// const Drawer = createDrawerNavigator();
const Tab = createBottomTabNavigator();

// Get user id, name from route params
// Get user's name, pantry, preferences

const Main = ({ route, navigation }) => {
    // const user = route.params.user
    // const {id, username, pantry, savedRecipes, preferences} = route.params;
    // console.log(route.params)
    const user = {
        intolerances: {
            dairy: 1,
            eggs: 1
        },
        email: "test1@gmail.com",
        id: 1,
        pantry: {
            food_dict: {
                carrots: 1,
                tomatoes: 1
            },
            id: 1,
            user_id: 1
        },
        ingredient_preferences: {
        },
        recipes: [
            {
                id: 1,
                image: "https://spoonacular.com/recipeImages/782585-312x231.jpg",
                ingredients: {
                    "cannellini beans": 1,
                    "cracked pepper": 1,
                    "curry leaves": 1,
                    "garlic": 1,
                    "grain mustard": 1,
                    "juice of lemon": 1,
                    "lemon zest": 1,
                    "mushrooms": 1,
                    "olive oil": 1,
                    "sea salt": 1,
                    "tarragon": 1
                },
                instructions: "Rinse the cannellini beans and soak for 8 hours or overnight in several inches of water. Drain and rinse, then transfer to a medium saucepan and cover with fresh water. Add the curry leaves or bay leaf and bring to a boil. Reduce heat to medium-low, cover, and simmer for 1 hour or until the beans are tender but not falling apart. Drain and transfer to a large salad bowl.Meanwhile, snap the woody ends off of the asparagus spears and steam the spears for 6 minutes or until just tender but still retaining their crunch. Transfer to the salad bowl.Now cook the mushrooms. Heat the oil in a large skillet over high heat. As soon as the oil is hot, drop in the mushrooms and cook, stirring constantly, for 5 minutes or until the mushrooms begin to brown and lose some of their liquid. Transfer to the bowl with the asparagus.To make the dressing, combine the tarragon, lemon zest, garlic, lemon juice, olive oil and mustard in a small food processor or blender. Process until smooth.Pour the dressing over the salad, season with salt and pepper, and toss. Serve at room temperature or chilled.",
                nutritional_data: 39,
                title: "Cannellini Bean and Asparagus Salad with Mushrooms",
                url: "http://foodandspice.blogspot.com/2016/05/cannellini-bean-and-asparagus-salad.html",
                user_id: 1,
                user_state: 0
            }
        ],
        diet_restrictions: {},
        username: "test1"
    }
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
            // initialParams={{user: user}}
            initialParams={{user: route.params.user}}
            />

            <Tab.Screen
            name="Preferences" 
            component={Preferences} 
            initialParams={{user: user}}
            // initialParams={{user: route.params.user}}
            />

            <Tab.Screen 
            name="Recipes" 
            component={GetRecipes}  
            initialParams={{user: user}}
            // initialParams={{user: route.params.user}}

            />

            <Tab.Screen 
            name="Recipe" 
            component={Recipe}  
            // initialParams={{user: route.params.user}}
            // initialParams={{user: route.params.user}}

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