import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, ScrollView, Linking } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import axios from 'axios';

const Recipe = ({route}) => {
    let recipe = route.params.recipe;
    console.log('recipe: ', recipe.id)
    
    const ingredientList = [];
    for (ingredient of Object.keys(recipe.ingredients)) {
        ingredientList.push(ingredient);
        ingredientList.push(', ');
    };    
    
    const handleSave = () => {
        if (!recipe.id) {
            axios.post(`https://mealify-zclw.onrender.com/users/${recipe.user_id}/recipes`, recipe)
            .then((response) => {
                console.log('saved successfully')
                recipe.id = response.data.id
            })
        } else {
            console.log('Recipe was already saved')
        };
    };
    const handleDelete = () => {
        if (!recipe.id) {
            console.log('Recipe was never saved')
        } else {
            axios.delete(`https://mealify-zclw.onrender.com/recipes/${recipe.id}`, recipe)
            .then(() => {
                console.log('deleted successfully')
            })
        }
    }
    const handleLikeRecipe = () => {
        if (!recipe.id) {
            recipe.user_state = 1
            handleSave()
        } else {
            axios.patch(`https://mealify-zclw.onrender.com/recipes/${recipe.id}/favorite`)
            .then(() => {
                console.log('Successful Like')
            })
        };
    };
    
    const handleDislikeRecipe = () => {
        if (!recipe.id) {
            recipe.user_state = -1
            handleSave()
        } else {
            axios.patch(`https://mealify-zclw.onrender.com/recipes/${recipe.id}/unfavorite`)
            .then(response => {            
            console.log('Successful dislike')
            })
        };
    };

    return (
        <SafeAreaView style={styles.container} > 
            <ScrollView style={styles.scrollContainer} horizontal={false}>
                <Text style={styles.recipeTitleText}>{ recipe.title }</Text> 
                <Image style={styles.recipeImg} source={{uri: recipe.image}} resizeMode={'cover'}/>
                <View style={styles.recipeContainer}>
                    {/* <Header style={styles.recipeHeader}> */}
                        <Text style={styles.recipeDetailTitles}>Ingredients</Text>
                        
                        <Text style={{fontSize: 15, fontFamily: 'Avenir-Roman', fontWeight: 'bold', textAlign:'center'}}>{ingredientList}</Text>
                        <Text style={styles.recipeDetailTitles}>Nutritional Data Score: {recipe.nutritional_data} %</Text>
                        <Text style={styles.recipeDetailTitles}onPress={() => {
                            Linking.openURL(recipe.url);
                            }}>Click for Full Recipe</Text> 
                    
                </View>
                <TouchableOpacity 
                    style={styles.getRecipesButton}
                    onPress={ () => { handleSave({})} }
                    > 
                    <Text style={styles.buttonText} >Save for Later</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                    style={styles.getRecipesButton}
                    onPress={ () => { handleDelete({})} }
                    > 
                    <Text style={styles.buttonText} >Unsave</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                    style={styles.getRecipesButton}
                    onPress={ () => { handleLikeRecipe({})} }
                    > 
                    <Text style={styles.buttonText} >Like</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                    style={styles.getRecipesButton}
                    onPress={ () => { handleDislikeRecipe({})} }
                    > 
                    <Text style={styles.buttonText} >Dislike</Text>
                </TouchableOpacity>
            </ScrollView>
        </SafeAreaView>
        );
    };

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
    recipeTitleText: {
        fontFamily: 'Avenir-Roman',
        fontWeight: 'bold',
        fontSize: 40,
        flexShrink: 1,
        textAlign:'center',
        color: '#756382'
    },
    recipeImg: {
        width:'100%',
        height: 195,
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
    getRecipesButton: {
        padding: 5, 
        borderRadius: 5,
        textAlign: 'center', 
        backgroundColor: '#756382',
        alignItems: 'center',
        margin: 3,
      },
 });