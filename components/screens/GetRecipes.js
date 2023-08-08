import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native';
import Recipe from './Recipe';
import axios from 'axios';

// GET a user's pantry - /users/user_id/pantry/
// POST add to user's pantry - /users/user_id/pantry/
// PATCH update a user's pantry (add new item) - /users/user_id/pantry/
// DELETE remove an item from a user's pantry = /users/user_id/pantry/

const GetRecipes = ({ route, navigation }) => {
  const { username, pantry, saveRecipes, preferences, id } = route.params.user;
  const [loading, setLoading] = React.useState('false')
  const [errorMessage, setErrorMessage] = React.useState('')

  const handleGetRecipes = (params) => {
    setLoading('true')
    axios.get(`https://mealify-zclw.onrender.com/users/${id}/recipes`)
    .then(response => {
        setLoading('false')
        setErrorMessage('')
        console.log('response.data:', Object.keys(response.data).length === 0)
        if (Object.keys(response.data).length === 0) {
          setErrorMessage('Ooops, you dont have any recipes! Try searching for a new one!')
        }

        // navigation.navigate('Main', {user: user})
    })
    .catch(error => {
        setLoading('false')
        console.log('error: ', error.response)
        setErrorMessage(error.response.data)
    });

    console.log('Make recipes call');
  };

  const handleGetNewRecipes = () => {
    axios.get('https://api.spoonacular.com/recipes/complexSearch', {
      params: {
        apiKey: '5d5b6e0bcc9c4205b3cba5dc026a03ba',
      }
    })
    .then(response => {
      spoon_id = respo.
      console.log(response.data.results[0])
    })
    .catch(error => {
      console.log(error);
    });
    console.log('Make Spoonacular call!');
  };

  return (
    <View>
      <ActivityIndicator animating={loading} size='small' />
      <View>
        <Text>
          Quick links
        </Text>
        <TouchableOpacity 
          // style={styles.loginButton} 
          onPress={ () => { handleGetRecipes({})} }
          // hitSlop={{ bottom: 30, left: 30, right: 30 }}
        > 
          <Text style={{ color: '#007AFF', fontSize: 25 }} >All my Recipes</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          // style={styles.loginButton} 
          onPress={ () => { handleGetRecipes({'pantry': 'true'})} }
          // hitSlop={{ bottom: 30, left: 30, right: 30 }}
        > 
          <Text style={{ color: '#007AFF', fontSize: 25 }} >Pantry Recipes</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          // style={styles.} 
          onPress={ () => { handleGetRecipes({'ingredients': ['tomatoes']})} }
          // hitSlop={{ bottom: 30, left: 30, right: 30 }}
        > 
          <Text style={{ color: '#007AFF', fontSize: 25 }} >Ingredient Recipes</Text>
        </TouchableOpacity>
      </View>
      <View>
        <Text>Find A New Recipe</Text>
        <TouchableOpacity 
          onPress={ () => { handleGetNewRecipes()} }
        > 
          <Text style={{ color: '#007AFF', fontSize: 25 }} >Get A New Recipe</Text>
        </TouchableOpacity>

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
      marginTop: 50,
      flex: 1, 
      // alignItems: 'center', 
      // justifyContent: 'center'
  },
})