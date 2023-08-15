import React, { useEffect } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, Alert } from 'react-native';
import axios from 'axios';
import GetMealifyRecipes from '../GetMealifyRecipes';
import GetRandomSpoonRecipes from '../GetRandomSpoonRecipes'
import GetNewPantryRecipes from '../GetNewPantryRecipes';
import RecipeList from './RecipeList';
import Recipe from './Recipe';


const GetRecipes = ({ route, navigation }) => {
  const user = route.params.user
  const [loading, setLoading] = React.useState('false');
  const [displayedRecipes, setDisplayedRecipes] = React.useState(user.recipes)
  // const [formFields, setFormFields] = React.useState({
  //   ingredients: '',
  //   cuisine: '',
  //   diet: '',
  // });
  const createAlert = (errorMessage) =>
    Alert.alert('Error', errorMessage, [
      {text: 'OK', onPress: () => console.log('OK Pressed')},
  ]);

  React.useEffect(() => {
    const reload = navigation.addListener('focus', () => {
      axios.get(`https://mealify-zclw.onrender.com/users/${user.id}`)
      .then(response => {
        setDisplayedRecipes(response.data.recipes)
      })
      .catch(error => {
        createAlert(error.response.data)
      })
    });
  }, [navigation]);

  const [modalVisible, setModalVisible] = React.useState(false);
  const apiKey = '5d5b6e0bcc9c4205b3cba5dc026a03ba'  
  

  const handleGetMealifyRecipes = (params) => {
    setLoading('true')
    axios.get(`https://mealify-zclw.onrender.com/users/${user.id}/recipes`, {
      params: params
    })
    .then(response => {
        setLoading('false')
        if (Object.keys(response.data).length === 0) {
          createAlert('Ooops, you dont have any recipes! Try searching for a new one!');
        } else {
          setDisplayedRecipes(response.data);
        };
    })
    .catch((error) => {
        setLoading('false')
        console.log('error: ', error.response)
        createAlert(error.response.data)
    });
    
  };

  function getRandomInt(max) {
    return Math.floor(Math.random() * max);
  }

  const getRecipeDetails = (data) => {
    setLoading('true')
    if (data.length === 0) {
      createAlert('Ooops, we cannot find any recipes matching these requiremenst! Try searching for a new one!')
      setLoading('false')

      return 
    }    

    console.log(data.length)
    const randomIndex = getRandomInt(data.length)
    console.log('randomIndex: ', randomIndex)
    const spoonId = data[randomIndex].id
    const title = data[randomIndex].title
    const image = data[randomIndex].image

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
      // setDisplayedRecipes(newRecipeData)
      // console.log('NewRecipeData: ', newRecipeData.title)
      // console.log('NewRecipeData: ', newRecipeData.ingredients)
      // navigation.navigate(TempRecipe, )
      // navigation.navigate('Recipe', {recipe: newRecipeData})
      navigation.navigate('RecipeDetails', {recipe: newRecipeData})
      setLoading('false')
    })
    .catch(error => {
      setLoading('false')
      createAlert(error)
    });
  };


  return (
    <View style={styles.container}>
      <ActivityIndicator style={styles.activityIndicator} animating={loading} size='small' />
      <View style={styles.recipeListContainer}>
        <RecipeList recipes={displayedRecipes} navigation={navigation}/>
      </View>
      <View style={styles.yourSavedRecipesContainer}>
        <Text style={styles.header}>Your Saved Recipes</Text>
        <GetMealifyRecipes 
          user={user} 
          setLoading={setLoading}
          handleGetMealifyRecipes={handleGetMealifyRecipes}/>
      </View>
      <View style={styles.newRecipeContainer}>
        <Text style={styles.header}>Find A New Recipe</Text>
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
              // formFields={formFields}
              // setFormFields={setFormFields}
              modalVisible={modalVisible}
              setModalVisible={setModalVisible}
              getRecipeDetails={getRecipeDetails}
            />
          </View>
        </View>
      </View>
    </View>
  )
}

export default GetRecipes;

const styles = StyleSheet.create({
  activityIndicator: {
    flex: 1,
    // marginTop: -20,
    // marginBottom: -20,
    // borderWidth: 1,
  },
  container: {
    flex: 1,
    alignItems: 'center', 
    justifyContent: 'center',
    backgroundColor: '#E2C274',
    // marginBottom: 40,
  },
  yourSavedRecipesContainer: {
    flex: 3,
    // borderWidth: 1,
  },
  header: {
    fontSize: 26, 
    fontFamily: 'Avenir-Roman',
    padding: 8,
    color: '#756382',
  }, 
  newRecipeContainer: {
    flex: 3,
    marginBottom: 130,
    marginTop: 20,
    // borderWidth: 1,
    
  },
  recipeListContainer: {
    flex: 6,
    // borderWidth: 1,
    // borderBlockColor: 'black',
  }
})