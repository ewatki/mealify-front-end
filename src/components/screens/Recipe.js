import React, { useState, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, ScrollView, Button } from 'react-native';
import newRecipeData from './GetRecipes';
import handleGetNewRecipes from './GetRecipes'
import GetRecipes from './GetRecipes';
import { SafeAreaView } from 'react-native-safe-area-context';


const Recipe = ({route, navigation}) => {
    // const [recipe, setRecipe] = useState("")
    // const recipe = newRecipeData
    const recipe= route.params.recipe
    console.log(recipe)
    const recipes = []
    
    
    // const recipe = user.recipe[0]
    // {
    //     id: 1,
    //     image: "https://spoonacular.com/recipeImages/782585-312x231.jpg",
    //     ingredients: {
    //         "cannellini beans": 1,
    //         "cracked pepper": 1,
    //         "curry leaves": 1,
    //         "garlic": 1,
    //         "grain mustard": 1,
    //         "juice of lemon": 1,
    //         "lemon zest": 1,
    //         "mushrooms": 1,
    //         "olive oil": 1,
    //         "sea salt": 1,
    //         "tarragon": 1
    //     },
    //     instructions: "Rinse the cannellini beans and soak for 8 hours or overnight in several inches of water. Drain and rinse, then transfer to a medium saucepan and cover with fresh water. Add the curry leaves or bay leaf and bring to a boil. Reduce heat to medium-low, cover, and simmer for 1 hour or until the beans are tender but not falling apart. Drain and transfer to a large salad bowl.Meanwhile, snap the woody ends off of the asparagus spears and steam the spears for 6 minutes or until just tender but still retaining their crunch. Transfer to the salad bowl.Now cook the mushrooms. Heat the oil in a large skillet over high heat. As soon as the oil is hot, drop in the mushrooms and cook, stirring constantly, for 5 minutes or until the mushrooms begin to brown and lose some of their liquid. Transfer to the bowl with the asparagus.To make the dressing, combine the tarragon, lemon zest, garlic, lemon juice, olive oil and mustard in a small food processor or blender. Process until smooth.Pour the dressing over the salad, season with salt and pepper, and toss. Serve at room temperature or chilled.",
    //     nutritional_data: 39,
    //     title: "Cannellini Bean and Asparagus Salad with Mushrooms",
    //     url: "http://foodandspice.blogspot.com/2016/05/cannellini-bean-and-asparagus-salad.html",
    //     user_id: 1,
    //     user_state: 0
    // }
    const handleLikeRecipe = () => {
        // const user_state = route.params.user_state
        // setUser_state(1)
        // const [user_state, setUser_state] = useState(1);
        console.log(recipe)
    //     axios.post('https://mealify-zclw.onrender.com/users/{user_id}/recipes', recipe)
    //     .then(response => {
    //         recipes.push(response.data)
    //         console.log(recipes)
    //         console.log(route.params.user)
    //   });
    }
    
     const handleDislikeRecipe = () => {
        const [user_state, setUser_state] = useState(-1);
      };

    return (
        <SafeAreaView> 
         <ScrollView>
            <Image style={styles.tinyLogo} source={{uri: recipe.image}}/>
            <View style={styles.recipeContainer}>
                {/* <Header style={styles.recipeHeader}> */}
                    <Text>{ recipe.title }</Text> 
                    <Text>Ingredients: {recipe.ingredients}</Text>
                    <Text>Nutritional Data Score: {recipe.nutritional_data}</Text>
                    <Text>{recipe.url}</Text> 
                
                    
                    

                    
                        {/* image={recipeItem.image} */}
                        {/* title={recipeItem.title} */}
                        {/* ingredients={recipeItem.ingredients} */}
                        {/* nutritional_data={recipeItem.nutritional_data} */}
                        {/* url={recipeItem.url} */}
                
                {/* </Header> */}
            </View>
            {/* <Button title="likeRecipe" onPress={() => { handleLikeRecipe }}/> */}
            <Button title="Save for later" onPress={() => { handleLikeRecipe }} />
            <Button title="Dislike" onPress={() => { handleDislikeRecipe }} />
         </ScrollView>
        </SafeAreaView>
        );
    };
        
    const styles = StyleSheet.create({
        recipeContainer: {
        width: '100%',
        padding: 10,
        },
        recipeHeader: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    tinyLogo: {
        width: 50,
        height: 50,
        },
        });
        
        




  export default Recipe;