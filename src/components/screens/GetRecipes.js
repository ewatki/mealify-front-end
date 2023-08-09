import React from 'react';
import { Pressable, View, Text, TouchableOpacity, StyleSheet, ActivityIndicator, TextInput, Modal } from 'react-native';
// import Recipe from './Recipe';
import axios from 'axios';

// GET a user's pantry - /users/user_id/pantry/
// POST add to user's pantry - /users/user_id/pantry/
// PATCH update a user's pantry (add new item) - /users/user_id/pantry/
// DELETE remove an item from a user's pantry = /users/user_id/pantry/

const GetRecipes = ({ route, navigation }) => {
  // console.log('USER: ', route.params.user)
  const user = route.params.user
  // const { username, pantry, saveRecipes, ingredient_preferences, id, intolerances } = route.params.user;
  const [loading, setLoading] = React.useState('false');
  const [errorMessage, setErrorMessage] = React.useState('');
  const [formFields, setFormFields] = React.useState({
    ingredients: '',
    cuisine: '',
    diet: '',
  });
  const [modalVisible, setModalVisible] = React.useState(false);
  const handleChange = (text, field) => {
      if (field === 'diet') {
          setFormFields({
              ...formFields,
              diet: text
          })
      } else if (field === 'cuisine') {
          setFormFields({
              ...formFields,
              cuisine: text
          })
      } else if (field === 'ingredients') {
          setFormFields({
              ...formFields,
              ingredients: text
          })
      }
  }

  const handleHideModal = () => {
    setModalVisible(!modalVisible)
  }

  const handleGetRecipes = (params) => {
    setLoading('true')
    axios.get(`https://mealify-zclw.onrender.com/users/${user.id}/recipes`)
    .then(response => {
        setLoading('false')
        setErrorMessage('')
        if (Object.keys(response.data).length === 0) {
          setErrorMessage('Ooops, you dont have any recipes! Try searching for a new one!')
        }
    })
    .catch(error => {
        setLoading('false')
        console.log('error: ', error.response)
        setErrorMessage(error.response.data)
    });
  };

  const handleGetNewRecipes = () => {
    // Set up axios parameters
    const includeIngredients = Object.keys(user.ingredient_preferences)
    includeIngredients.push(formFields.ingredients)
    const diet = Object.keys(user.diet_restrictions)
    diet.push(formFields.diet)

    // Call initial recipe search
    axios.get('https://api.spoonacular.com/recipes/complexSearch', {
      params: {
        apiKey: '5d5b6e0bcc9c4205b3cba5dc026a03ba',
        intolerances: Object.keys(user.intolerances),
        includeIngredients: includeIngredients,
        diet: diet,
        cuisine: formFields.cuisine,
      }
    })
    .then(response => {
      // Gather new data in variables
      setLoading('true')
      const spoonId = response.data.results[0].id
      const url = `https://api.spoonacular.com/recipes/${spoonId}/information`
      const title = response.data.results[0].title
      const image = response.data.results[0].image
      params = {
        params: {
          apiKey: '5d5b6e0bcc9c4205b3cba5dc026a03ba',
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
          user_state: 0
        }
        // console.log('NewRecipeData: ', newRecipeData)

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
    })
    .catch(error => {
      console.log(error);
    });
  };

  return (
    <View style={styles.container}>
      <ActivityIndicator animating={loading} size='small' />
      <View style={styles.quickLinksContainer}>
        <Text>
          Quick links
        </Text>
        <TouchableOpacity 
          style={styles.getRecipesButton}
          onPress={ () => { handleGetRecipes({})} }
        > 
          <Text style={{ color: '#007AFF', fontSize: 25 }} >All my Recipes</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={styles.getRecipesButton}
          onPress={ () => { handleGetRecipes({'pantry': 'true'})} }
        > 
          <Text style={{ color: '#007AFF', fontSize: 25 }} >Pantry Recipes</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={styles.getRecipesButton}
          onPress={ () => { handleGetRecipes({'ingredients': ['tomatoes']})} }
        > 
          <Text style={{ color: '#007AFF', fontSize: 25 }} >Ingredient Recipes</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.newRecipeContainer}>
        <Text>Find A New Recipe</Text>
        <TouchableOpacity 
          style={styles.getRecipesButton}
          onPress={ () => { handleGetNewRecipes()} }
        > 
          <Text style={{ color: '#007AFF', fontSize: 25 }} >Get A New Recipe</Text>
        </TouchableOpacity>
        <Modal         
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            Alert.alert('Modal has been closed.');
            setModalVisible(!modalVisible);
          }}>
          <View style={styles.placeholderView}></View>
          <View style={styles.modalView}>
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => handleHideModal()}>
              <Text>- Never Mind, keep it broad -</Text>
            </Pressable>

            <Text>Add Ingredients</Text>
            <TextInput 
              value={formFields.ingredients} 
              onChangeText={text => handleChange(text, 'ingredients')} 
              autoCompleteType="ingredients" 
              autoCapitalize='none'
              placeholder='Ingredients'
              style={styles.input}
            />   
            <Text>Add Cuisine</Text>
            <TextInput 
              value={formFields.cuisine} 
              onChangeText={text => handleChange(text, 'cuisine')} 
              autoCompleteType="cuisine" 
              autoCapitalize='none'
              placeholder='Indian...'
              style={styles.input}
            />   
            <Text>Add Diet Restriction</Text>
            <TextInput 
              value={formFields.diet} 
              onChangeText={text => handleChange(text, 'diet')} 
              autoCompleteType="diet" 
              autoCapitalize='none'
              placeholder='Cooking for a new person?'
              style={styles.input}
            />   
          </View>
        </Modal>
        <Pressable
          style={[styles.showModalButton]}
          onPress={() => setModalVisible(true)}>
          <Text style={styles.textStyle}>Get Specific</Text>
        </Pressable>


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
  getRecipesButton: {
    borderWidth: 1,
    borderRadius: 10,
    padding: 5,
    alignItems: 'center',
    margin: 3,
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    borderRadius: 10,
    width: 300,
  },
  modalView: {
    flex: 3,
    alignItems: 'center'
  },
  newRecipeContainer: {
    flex: 3,
  },
  placeholderView: {
    flex: 4
  },
  quickLinksContainer: {
    // marginTop: 50,
    flex: 2, 
    // alignItems: 'center', 
    // justifyContent: 'center'
  },
  showModalButton: {
    alignItems: 'center'
  }

})