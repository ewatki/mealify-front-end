import React, { useState, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, ScrollView, Button } from 'react-native';
import newRecipeData from './GetRecipes';
import handleGetNewRecipes from './GetRecipes'
import GetRecipes from './GetRecipes';
import { SafeAreaView } from 'react-native-safe-area-context';
import axios from 'axios';

const Recipe = ({route, navigation}) => {
    // const [user, setUser] = React.useState(route.params.user)
    console.log("test:", route.params.recipe)
    const [recipe,setRecipe] = React.useState(route.params.recipe)
    // console.log(recipe)
    
    
    
   
    const handleSave = () => {
        // console.log(recipe)
        
        axios.post(`https://mealify-zclw.onrender.com/users/${recipe.user_id}/recipes`, recipe)
        .then(response => {
            setRecipe(recipe => {
                return {
                    ...recipe,
                    id: response.data.id,
                    user_state: response.data.user_state
                };
                
            })
            console.log('response.data:', response.data)
            console.log('saved successfully')
        })
        
    }
    const handleLikeRecipe = () => {
        console.log(recipe.id)
        axios.patch(`https://mealify-zclw.onrender.com/recipes/${recipe.id}/favorite`)
        .then(response => {
            setRecipe(recipe => {
                return {
                    ...recipe,
                    id: response.data.id,
                    user_state: response.data.user_state
                };
                
            })
            
        console.log('response.data:', response.data)
        // console.log(recipe)
    })
}
    
     const handleDislikeRecipe = () => {
        console.log(recipe.id)
        axios.patch(`https://mealify-zclw.onrender.com/recipes/${recipe.id}/unfavorite`)
        .then(response => {
            setRecipe(recipe => {
                return {
                    ...recipe,
                    id: response.data.id,
                    user_state: response.data.user_state
                };
                
            })
            
        console.log('response.data:', response.data)
        // console.log(recipe)
    })
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
                
            </View>
            {/* <Button title="likeRecipe" onPress={() => { handleLikeRecipe }}/> */}
            <Button title="Save for later" onPress={() => { handleSave({}) }} />
            <Button title="Like" onPress={() => { handleLikeRecipe({}) }} />
            <Button title="Dislike" onPress={() => { handleDislikeRecipe({}) }} />
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
        width: 100,
        height: 100,
        },
        });
        
        




  export default Recipe;