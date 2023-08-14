import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import axios from 'axios';

const GetMealifyRecipes = ({ user, setLoading, setErrorMessage }) => {
  // console.log('USER: ', user)

  const handleGetMealifyRecipes = (params) => {
    setLoading('true')
    axios.get(`https://mealify-zclw.onrender.com/users/${user.id}/recipes`)
    .then(response => {
        console.log('in get recipes')
        console.log('NewRecipeData: ', response.data)
        setLoading('false')
        setErrorMessage('')
        if (Object.keys(response.data).length === 0) {
          console.log('in if')
          setErrorMessage('Ooops, you dont have any recipes! Try searching for a new one!')
        } else {
          console.log('NewRecipeData: ', response.data)
          // navigation.navigate('RecipeList', {user: route.params.user})
        }
    })
    .catch(error => {
        setLoading('false')
        console.log('error: ', error.response)
        setErrorMessage(error.response.data)
    });
    
  };


  return (
    <View style={styles.getYourRecipesContainer}>
      {/* <Text style={styles.getYourRecipesHeader}>Your Saved Recipes</Text> */}
      <View styles={styles.getYourRecipesButtonContainer}>
        <TouchableOpacity 
          style={styles.getRecipesButton}
          onPress={ () => { handleGetMealifyRecipes({})} }
        > 
          <Text style={styles.buttonText} >All my Recipes</Text>
          <Text style={styles.buttonDescription}>All your saved recipes</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={styles.getRecipesButton}
          onPress={ () => { handleGetMealifyRecipes({'pantry': 'true'})} }
        > 
          <Text style={styles.buttonText} >Pantry Recipes</Text>
          <Text style={styles.buttonDescription}>Your saved recipes with ingredients in your pantry</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={styles.getRecipesButton}
          onPress={ () => { handleGetMealifyRecipes({'ingredients': []})} }
        > 
          <Text style={styles.buttonText} >Ingredient Recipes</Text>
          <Text style={styles.buttonDescription}>Your saved recipes with your ingredient preferences</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default GetMealifyRecipes;

const styles = StyleSheet.create({
  buttonDescription: {
    fontSize: 12, 
    color: 'white',
    fontFamily: 'Avenir-Roman'
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
  getYourRecipesContainer: {
    flex: 2, 
  },
  getYourRecipesButtonContainer: {
    flexDirection: 'row',
    margin: 3,
  },
  getYourRecipesHeader: {
    backgroundColor: '#E2C274',
    fontSize: 20, 
    // color: 'white',
    fontFamily: 'Avenir-Roman',
    // fontWeight: 'bold',
    padding: 8,
    alignSelf: 'center',
  }, 
})