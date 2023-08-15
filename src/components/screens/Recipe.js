import React, { useState, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, ScrollView, Button, Linking } from 'react-native';
import newRecipeData from './GetRecipes';
import handleGetNewRecipes from './GetRecipes'
import GetRecipes from './GetRecipes';
import { SafeAreaView } from 'react-native-safe-area-context';
import axios from 'axios';

const Recipe = ({route, navigation}) => {
    const recipe = route.params.recipe;
    console.log('recipe: ', recipe.ingredients)
   
    const ingredientList = [];
    for (ingredient of Object.keys(recipe.ingredients)) {
        ingredientList.push(ingredient);
        ingredientList.push(', ');
    };
    
    
    const handleSave = () => {
        axios.post(`https://mealify-zclw.onrender.com/users/${recipe.user_id}/recipes`, recipe)
        .then(response => {
            // setRecipe(recipe => {
            //     return {
            //         ...recipe,
            //         id: response.data.id,
            //         user_state: response.data.user_state
            //     };
                
            // })
            // console.log('response.data:', response.data)
            console.log('saved successfully')
            console.log(ingredientList)
        })
        
    }
    const handleLikeRecipe = () => {
        console.log(recipe.id)
        axios.patch(`https://mealify-zclw.onrender.com/recipes/${recipe.id}/favorite`)
        .then(response => {
        //     setRecipe(recipe => {
        //         return {
        //             ...recipe,
        //             id: response.data.id,
        //             user_state: response.data.user_state
        //         };
                
        //     })
            
        // console.log('response.data:', response.data)
        console.log('Successful Like')
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
            
        // console.log('response.data:', response.data)
        console.log('Successful dislike')
        })
    };

    return (
        <SafeAreaView style={styles.container}> 
            <ScrollView style={styles.scrollContainer}>
                <Text style={styles.recipeTitleText}>{ recipe.title }</Text> 
                <Image style={styles.recipeImg} source={{uri: recipe.image}} resizeMode={'cover'}/>
                <View style={styles.recipeContainer}>
                    {/* <Header style={styles.recipeHeader}> */}
                        <Text style={styles.recipeDetailTitles}>Ingredients</Text>
                        
                        <Text style={{fontSize: 15, fontFamily: 'Avenir-Roman', fontWeight: 'bold', textAlign:'center'}}>{ingredientList}</Text>
                        <Text style={styles.recipeDetailTitles}>Nutritional Data Score: {recipe.nutritional_data}</Text>
                        <Text style={styles.recipeDetailTitles}onPress={() => {
                            Linking.openURL(recipe.url);
                            }}>Click for Full Recipe</Text> 
                    
                </View>
                <Button title="Save for later" onPress={() => { handleSave({}) }} />
                <Button title="Like" onPress={() => { handleLikeRecipe({}) }} />
                <Button title="Dislike" onPress={() => { handleDislikeRecipe({}) }} />
            </ScrollView>
        </SafeAreaView>
        );
    };
        
    // const styles = StyleSheet.create({
    //     recipeContainer: {
    //     width: '100%',
    //     padding: 10,
    //     },
    //     recipeHeader: {
    //     fontSize: 20,
    //     fontWeight: 'bold',
    // },
    // tinyLogo: {
    //     width: 100,
    //     height: 100,
    //     },
    //     });
        
        




export default Recipe;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center', 
        justifyContent: 'center',
        backgroundColor: '#E2C274',
    },
    scrollContainer: {
        flex:1,
        paddingHorizontal: 10, 
    },
    recipeContainer: {
        paddingLeft: 10,
        paddingRight: 10,
    },
    recipeTitleContainer: {
        width:175, 
        flexGrow: 1,
        flex: 1,
    },
    recipeTitleText: {
        fontFamily: 'Avenir-Roman',
        fontWeight: 'bold',
        fontSize: 40,
        flexShrink: 1,
        width: 400, 
        textAlign:'center',
        color: '#756382'

    },
    recipeImg: {
        width:275,
        height: 295,
        borderRadius: 10,
        alignSelf:'center'
    },
    recipeDetailTitles:{
        fontSize: 20, 
        fontFamily: 'Avenir-Roman', 
        fontWeight: 'bold',
        textAlign: 'center',
        color: '#756382',
        padding: 10

    },
    buttonText: {
        fontSize: 16, 
        color: 'white',
        fontFamily: 'Avenir-Roman'
      },
 });