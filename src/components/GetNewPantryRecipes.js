import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import axios from 'axios';

const GetNewPantryRecipes = ({ user, setLoading, getRecipeDetails }) => {
  const apiKey = '5d5b6e0bcc9c4205b3cba5dc026a03ba'
  // const apiKey = 'a10d8b0165074f6a807217fe8ea8bd20'

  const handleGetNewPantryRecipes = () => {
    setLoading('true')
    if (user.pantry.length === 0) {
      return 'Nothing in pantry, Re-route to pantry to fill out (maybe throw up an alert...'
    } else {
      let ingredientsBuilder = Object.keys(user.pantry.food_dict)
      const ingredients = ingredientsBuilder.toString()
      axios.get('https://api.spoonacular.com/recipes/findByIngredients', {
        params: {
          apiKey: apiKey,
          ingredients: ingredients,
          number: 10,
          ranking: 1,
          sort: 'max-used-ingredients'
        }
      })
      .then(response => {
        // Gather new data in variable
        const data = response.data
        getRecipeDetails(data)
      })
      .catch(error => {
        setLoading('false')
        console.log(error);
      });
    };
  };

  return (
    <View>
      <TouchableOpacity 
        style={styles.getRecipesButton}
        onPress={ () => { handleGetNewPantryRecipes()} }
        > 
        <Text style={styles.buttonText} >New Pantry Recipe</Text>
        <Text style={styles.buttonDescription}>Get a new recipe with ingredients from your pantry</Text>
      </TouchableOpacity>
    </View>
  )
}

export default GetNewPantryRecipes;

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
})