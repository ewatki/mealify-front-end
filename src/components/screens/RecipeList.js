import React, { useState, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, ScrollView, Button } from 'react-native';
import newRecipeData from './GetRecipes';
import handleGetNewRecipes from './GetRecipes'
import GetRecipes from './GetRecipes';
import { SafeAreaView } from 'react-native-safe-area-context';
import axios from 'axios';
import handleGetMealifyRecipes from './GetRecipes'

const RecipeList = ({route, navigation}) => {
    const [user, setUser] = React.useState(route.params.user)
    // const [recipes, setRecipes] = React.useState([]);

    axios.get(`https://mealify-zclw.onrender.com/users/6/recipes`)
    .then(response => {
        // setLoading('false')
        // console.log('response.data:', response.data)
        // setRecipes(response.data)
    })
    console.log(user.recipes)
    return (
        <SafeAreaView>
            
            {user.recipes.map((recipe) => {
                return (
                <ScrollView>
                    <Image style={styles.tinyLogo} source={{uri: recipe.image}}/>
                    <Text >{recipe.url}</Text>
                </ScrollView>
            );
        })}
        </SafeAreaView>
    )
}

export default RecipeList;

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