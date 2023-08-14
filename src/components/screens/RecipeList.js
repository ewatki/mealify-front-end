import React, { useState, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, ScrollView, Button, Linking } from 'react-native';
import newRecipeData from './GetRecipes';
import handleGetNewRecipes from './GetRecipes'
import GetRecipes from './GetRecipes';
import { SafeAreaView } from 'react-native-safe-area-context';
import axios from 'axios';
import handleGetMealifyRecipes from './GetRecipes'
import getRecipeDetails from './GetRecipes'

const RecipeList = ({route, navigation}) => {
    const [user, setUser] = React.useState(route.params.user)
    // const [recipes, setRecipes] = React.useState([]);

   
    axios.get(`https://mealify-zclw.onrender.com/users/${user.id}/recipes`)
    .then(response => {
        // setLoading('false')
        // console.log('response.data:', response.data)
        // setRecipes(response.data)
    })
    console.log(user.recipes)
    return (
        <SafeAreaView style={styles.container}>
           
            {/* <Text style={{fontSize: 25, fontFamily: 'Avenir-Roman', fontWeight: 'bold', paddingHorizontal: 20, width: 400, textAlign: 'center'}}>Saved Recipes</Text> */}
           
            <ScrollView nestedScrollEnabled={true} style={styles.scrollContainer} horizontal={true}>
            {user.recipes.map((recipe) => {
                return (
                    <View >
                        <View style={styles.recipeTitleContainer}>
                            <TouchableOpacity onPress={() => {
                            Linking.openURL(recipe.url);
                             }}>

                            <Text style={styles.recipeTitleText}
                            >{recipe.title}</Text>
                            </TouchableOpacity>
                        </View>
                    <View>
                        <TouchableOpacity onPress={ () => { getRecipeDetails(recipe)} } >
                    <Image style={styles.recipeImg}
                     source={{uri: recipe.image}}/>
                        </TouchableOpacity>
                     </View>
                    </View>
            
                    
                    );
                })}
                </ScrollView>
        </SafeAreaView>
    )
}

export default RecipeList;

const styles = StyleSheet.create({
    container: {
    flex:1,
    backgroundColor: '#E2C274'
    },
    scrollContainer: {
        flex:1,
        // justifyContent: 'space-evenly'  
        // paddingHorizontal: 10, 
        // flexDirection: 'row', 
    },
    recipeTitleContainer: {
        width:200, 
        height:40, 
        marginLeft: 10, 
        marginRight: 10, 
        flexDirection:'row', 
        flexWrap:'wrap', 
        alignItems: 'flex-start'
    },
    recipeTitleText: {
        fontFamily: 'Avenir-Roman',
        fontWeight: 'bold'
    },
    recipeImg: {
        width:150,
        height: 170,
        borderRadius: 10, 
        marginLeft: 10, 
        marginRight: 10, 
        flexDirection:'row'
    }
    
    
 });