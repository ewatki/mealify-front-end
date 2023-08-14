import React, { useState, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, ScrollView, Button, Linking } from 'react-native';
import newRecipeData from './GetRecipes';
import handleGetNewRecipes from './GetRecipes'
import GetRecipes from './GetRecipes';
import { SafeAreaView } from 'react-native-safe-area-context';
import axios from 'axios';
import handleGetMealifyRecipes from './GetRecipes'

const RecipeList = ({ user }) => {
    // const [user, setUser] = React.useState(route.params.user)
    // const [user, setUser] = React.useState(user)
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
            <ScrollView 
                nestedScrollEnabled={true} 
                // style={styles.scrollContainer} 
                horizontal={true}>
            {user.recipes.map((recipe) => {
                return (
                    <View style={styles.recipeContainer}>
                        <View style={styles.recipeTitleContainer}>
                            <TouchableOpacity onPress={() => {
                            Linking.openURL(recipe.url);
                            }}>

                                <Text style={styles.recipeTitleText}
                                >{recipe.title}</Text>
                            </TouchableOpacity>
                        </View>
                        <View>
                            <Image style={styles.recipeImg}
                            source={{uri: recipe.image}}
                            />
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
        // borderWidth: 1,
        padding: -50,

    // backgroundColor: '#E2C274'
    },
    scrollContainer: {
        flex:1,
        // borderWidth: 1,
        // justifyContent: 'space-evenly'  
        paddingHorizontal: 10, 
        // flexDirection: 'row', 
    },
    recipeContainer: {
        // flex: 1,
        // paddingBottom: -30,
        // borderWidth: 1,
        paddingLeft: 10,
        paddingRight: 10,
    },
    recipeTitleContainer: {
        width:200, 
        height:40, 
        // marginLeft: 10, 
        // marginRight: 10, 
        // flexDirection:'row', 
        // flexWrap:'wrap', 
        // alignItems: 'flex-start'
    },
    recipeTitleText: {
        fontFamily: 'Avenir-Roman',
        fontWeight: 'bold'
    },
    recipeImg: {
        width:175,
        height: 195,
        borderRadius: 10, 
        // marginLeft: 10, 
        // marginRight: 10, 
        // flexDirection:'row'
    }
    
    
 });