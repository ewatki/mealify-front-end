import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import axios from 'axios';

const GetMealifyRecipes = ({ user, setLoading, setErrorMessage }) => {
  // console.log('USER: ', user)

  const handleGetMealifyRecipes = (params) => {
    setLoading('true')
    axios.get(`https://mealify-zclw.onrender.com/users/${user.id}/recipes`)
    .then(response => {
        setLoading('false')
        setErrorMessage('')
        if (Object.keys(response.data).length === 0) {
          setErrorMessage('Ooops, you dont have any recipes! Try searching for a new one!')
        }
        else {
          navigation.navigate('RecipeList', {user: route.params.user})
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
      <Text style={styles.getYourRecipesHeader}>Your Saved Recipes</Text>
      <View styles={styles.getYourRecipesButtonContainer}>
        <TouchableOpacity 
          style={styles.getRecipesButton}
          onPress={ () => { handleGetMealifyRecipes({})} }
        > 
          <Text style={styles.buttonText} >All my Recipes</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={styles.getRecipesButton}
          onPress={ () => { handleGetMealifyRecipes({'pantry': 'true'})} }
        > 
          <Text style={styles.buttonText} >Pantry Recipes</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={styles.getRecipesButton}
          onPress={ () => { handleGetMealifyRecipes({'ingredients': []})} }
        > 
          <Text style={styles.buttonText} >Ingredient Recipes</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default GetMealifyRecipes;

const styles = StyleSheet.create({
  buttonText: {
    fontSize: 16, 
    color: 'white',
    fontFamily: 'Avenir-Roman'
  },
  getRecipesButton: {
    padding: 10, 
    borderRadius: 10,
    textAlign: 'center', 
    backgroundColor: '#756382',
    alignItems: 'center',
    margin: 3,
  },
  getYourRecipesContainer: {
    flex: 2, 
    // flexDirection: 'column'
  },
  getYourRecipesButtonContainer: {
    // flex: 6,
    flexDirection: 'row',
    // justifyContent: 'center',
    // flexWrap: 'wrap',
    margin: 3,
  },
  getYourRecipesHeader: {
    // flex: 1,
    backgroundColor: '#E2C274',
    fontSize: 20, 
    color: 'white',
    fontFamily: 'Avenir-Roman',
    fontWeight: 'bold',
    padding: 10

  }, 
})