import React, { useState, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, ScrollView, Button, Linking } from 'react-native';
import newRecipeData from './GetRecipes';
import handleGetNewRecipes from './GetRecipes'
import GetRecipes from './GetRecipes';
import { SafeAreaView } from 'react-native-safe-area-context';
import axios from 'axios';

const Recipe = ({route, navigation}) => {
    const recipe = route.params.recipe
    
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
        <SafeAreaView style={{flex:1}}> 
         <ScrollView>
            <Text style={{fontSize: 40, fontFamily: 'Avenir-Roman', fontWeight: 'bold', paddingHorizontal: 20, width: 400, textAlign:'center'}}>{ recipe.title }</Text> 
            <Image style={{width: 300, height: 300, borderRadius: 20, marginLeft: 10, marginRight: 10, }} source={{uri: recipe.image}} resizeMode={'cover'}/>
            <View style={styles.recipeContainer}>
                {/* <Header style={styles.recipeHeader}> */}
                    
                    <Text style={{fontSize: 20, fontFamily: 'Avenir-Roman', fontWeight: 'bold'}}>Ingredients: {recipe.ingredients}</Text>
                    <Text style={{fontSize: 20, fontFamily: 'Avenir-Roman', fontWeight: 'bold'}}>Nutritional Data Score: {recipe.nutritional_data}</Text>
                    <Text style={{color:'blue', fontSize: 20, fontFamily: 'Avenir-Roman', fontWeight: 'bold'}}onPress={() => {
              Linking.openURL(recipe.url);
            }}>Click for Full Recipe</Text> 
                
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