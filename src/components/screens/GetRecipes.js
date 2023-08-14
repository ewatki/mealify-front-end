import React from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import axios from 'axios';
import GetMealifyRecipes from '../GetMealifyRecipes';
import GetRandomSpoonRecipes from '../GetRandomSpoonRecipes'
import GetNewPantryRecipes from '../GetNewPantryRecipes';

const GetRecipes = ({ route, navigation }) => {
  // console.log('USER: ', route.params.user)
  const user = route.params.user
  const [loading, setLoading] = React.useState('false');
  const [errorMessage, setErrorMessage] = React.useState('');
  const [formFields, setFormFields] = React.useState({
    ingredients: '',
    cuisine: '',
    diet: '',
  });
  const [modalVisible, setModalVisible] = React.useState(false);
  const apiKey = '5d5b6e0bcc9c4205b3cba5dc026a03ba'
  
  function getRandomInt(max) {
    return Math.floor(Math.random() * max);
  }
  const getRecipeDetails = (data) => {
    setLoading('true')
    if (data.length === 0) {
      console.log('No recipes matching parameters')
      setErrorMessage('Ooops, we cannot find any recipes matching these requiremenst! Try searching for a new one!')
      setLoading('false')

      return 
    }    
    const spoonId = data[0].id
    const title = data[0].title
    const image = data[0].image

    const url = `https://api.spoonacular.com/recipes/${spoonId}/information`
    params = {
      params: {
        apiKey: apiKey,
        includeNutrition: 'True'
      }
    }

    // Call details of recipe to gather more needed data
    axios.get(url, params)
    .then(response => {
      setErrorMessage('')
      const instructions = response.data.instructions
      const ingredients = []
      for (ingredient of response.data.extendedIngredients) {
        ingredients.push(ingredient.name)
      }
      const nutritionScore = Math.floor(response.data.nutrition.properties[2].amount)
      const sourceUrl = response.data.sourceUrl

      // Build dict to post to mealify_api
      const newRecipeData = {
        title: title, 
        ingredients: ingredients, 
        instructions: instructions, 
        nutritional_data: nutritionScore, 
        url: sourceUrl, 
        image: image,
        user_state: 0,
        user_id: user.id
      }
      console.log('NewRecipeData: ', newRecipeData.title)
      console.log('NewRecipeData: ', newRecipeData.ingredients)
      navigation.navigate('TempRecipe', {recipe: newRecipeData})


      // // Add newRecipe Data to a Recipe.js component adn if they click 'like', 'unlike' then send post to the backend with the data!
      // Call mealify_api to save recipe for future use
      // axios.post(`https://mealify-zclw.onrender.com/users/${user.id}/recipes`, newRecipeData)
      // .then(response => {
      //   setLoading('false')
      // })
      // .catch(error => {
      //   console.log(error)
      // })
      setLoading('false')
    })
    .catch(error => {
      setLoading('false')
      setErrorMessage(error)
    })
  }
  const handleGetNewPantryRecipes = () => {
    setLoading('true')
    // console.log(user.pan)
    if (user.pantry.length === 0) {
      return 'Nothing in pantry, Re-route to pantry to fill out (maybe throw up an alert...'
    } else {
      const recipeIndex = getRandomInt(data.length)
      const spoonId = data[recipeIndex].id
      const title = data[recipeIndex].title
      const image = data[recipeIndex].image
      const url = `https://api.spoonacular.com/recipes/${spoonId}/information`
      params = {
        params: {
          apiKey: apiKey,
          includeNutrition: 'True'
        }
      }
  
      // Call details of recipe to gather more needed data
      axios.get(url, params)
      .then(response => {
        setErrorMessage('')
        const instructions = response.data.instructions
        const ingredients = []
        for (ingredient of response.data.extendedIngredients) {
          ingredients.push(ingredient.name)
        }
        const nutritionScore = Math.floor(response.data.nutrition.properties[2].amount)
        const sourceUrl = response.data.sourceUrl
  
        // Build dict to post to mealify_api
        const newRecipeData = {
          title: title, 
          ingredients: ingredients, 
          instructions: instructions, 
          nutritional_data: nutritionScore, 
          url: sourceUrl, 
          image: image,
          user_state: 0,
          user_id: user.id
        }
        console.log('NewRecipeData: ', newRecipeData.title)
        // console.log('NewRecipeData: ', newRecipeData.ingredients)
        // navigation.navigate('Recipe', {recipe: newRecipeData})
  
  
        // // Add newRecipe Data to a Recipe.js component adn if they click 'like', 'unlike' then send post to the backend with the data!
        // Call mealify_api to save recipe for future use
        // axios.post(`https://mealify-zclw.onrender.com/users/${user.id}/recipes`, newRecipeData)
        // .then(response => {
        //   setLoading('false')
        // })
        // .catch(error => {
        //   console.log(error)
        // })
        setLoading('false')
      })
      .catch(error => {
        setLoading('false')
        setErrorMessage(error)
      });
    };
  };


  return (
    <View style={styles.container}>
      <ActivityIndicator animating={loading} size='small' />
      <GetMealifyRecipes user={user} setLoading={setLoading} setErrorMessage={setErrorMessage}/>
      <View style={styles.newRecipeContainer}>
        <Text>Find A New Recipe</Text>
        <View>
          <GetNewPantryRecipes 
            user={user} 
            setLoading={setLoading} 
            getRecipeDetails={getRecipeDetails} 
          />
          <View>
            <GetRandomSpoonRecipes 
              user={user}
              setLoading={setLoading}
              formFields={formFields}
              setFormFields={setFormFields}
              modalVisible={modalVisible}
              setModalVisible={setModalVisible}
              getRecipeDetails={getRecipeDetails}
              setErrorMessage={setErrorMessage}
            />
          </View>
        </View>
      </View>
      <View style={styles.errorContainer}>
          <Text style={styles.errorMessage}>{errorMessage}</Text>
      </View>
    </View>
  )
}

export default GetRecipes;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center', 
    justifyContent: 'center'
  },
  errorContainer: {
    flex: 1,
  },
  newRecipeContainer: {
    flex: 3,
  },
})