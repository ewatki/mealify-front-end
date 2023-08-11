import React from 'react';
import { Pressable, View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import axios from 'axios';
import Recipe from './screens/Recipe';
import GetRecipesConstraintsForm from './GetRecipesConstraintsForm';

const GetRandomSpoonRecipes = ({ user, setLoading, formFields, setFormFields, modalVisible, setModalVisible, getRecipeDetails, setErrorMessage }) => {
  const apiKey = '5d5b6e0bcc9c4205b3cba5dc026a03ba'
  // const apiKey = 'a10d8b0165074f6a807217fe8ea8bd20'

  const handleHideModal = () => {
    setModalVisible(!modalVisible)
  };



  const handleGetNewRecipes = () => {
    // Set up axios parameters for random and not
    setLoading('true')
    const includeIngredients = formFields.ingredients
    const intolerances = Object.keys(user.intolerances).toString()
    const dietBuilder = Object.keys(user.diet_restrictions)
    dietBuilder.push(formFields.diet)
    let diet = dietBuilder.toString()
    const cuisine = formFields.cuisine

    // Make random call if it doesnt include ingredients
    if (includeIngredients === "") {
      axios.get('https://api.spoonacular.com/recipes/random', {
        params: {
          apiKey: apiKey,
          number: 10,
          intolerances: intolerances,
          diet: diet,
          cuisine: cuisine,
        }
      })
      .then(response => {
        // Gather new data in variables
        const data = response.data.recipes 
        getRecipeDetails(data)
      })
      .catch(error => {
        console.log(error);
        setLoading('false')
      });
    } else {
      // Call initial recipe search
      console.log('in NOT random')      
      axios.get('https://api.spoonacular.com/recipes/complexSearch', {
        params: {
          apiKey: apiKey,
          intolerances: intolerances,
          includeIngredients: includeIngredients,
          diet: diet,
          cuisine: cuisine,
          number: 10,
        }
      })
      .then(response => {
        // Gather new data in variables
        const data = response.data.results
        getRecipeDetails(data)
      })
      .catch(error => {
        console.log('Error: ', error);
      });
    };
  };

  return (
    <View>
      <TouchableOpacity 
        style={styles.getRecipesButton}
        onPress={ () => { handleGetNewRecipes()} }
      > 
        <Text style={{ color: '#007AFF', fontSize: 25 }} >Random Recipe</Text>
      </TouchableOpacity>
      <GetRecipesConstraintsForm 
          formFields={formFields} 
          setFormFields={setFormFields}
          handleHideModal={handleHideModal}
          modalVisible={modalVisible}
          setModalVisible={setModalVisible}
          setErrorMessage={setErrorMessage}
        />
      <Pressable
        style={[styles.showModalButton]}
        onPress={() => setModalVisible(true)}>
        <Text style={styles.textStyle}>Get Specific</Text>
      </Pressable>

    </View>
  )

}

export default GetRandomSpoonRecipes;

const styles = StyleSheet.create({
  getRecipesButton: {
    borderWidth: 1,
    borderRadius: 10,
    padding: 5,
    alignItems: 'center',
    margin: 3,
  },
  showModalButton: {
    alignItems: 'center'
  }

})