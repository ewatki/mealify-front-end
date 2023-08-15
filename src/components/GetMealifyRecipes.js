import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import axios from 'axios';
// import { BottomSheetSlideInSpec } from '@react-navigation/stack/lib/typescript/src/TransitionConfigs/TransitionSpecs';

const GetMealifyRecipes = ({ user, handleGetMealifyRecipes }) => {
  // console.log('USER: ', user)
  const ingredient_preferences = Object.keys(user.ingredient_preferences).toString()

  return (
    <View style={styles.getYourRecipesContainer}>
      <View styles={styles.getYourRecipesButtonContainer}>
        <TouchableOpacity 
          style={styles.getRecipesButton}
          onPress={ () => { handleGetMealifyRecipes({'pantry': 'true'})} }
        > 
          <Text style={styles.buttonText} >Pantry Recipes</Text>
          <Text style={styles.buttonDescription}>Your saved recipes with ingredients in your pantry</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={styles.getRecipesButton}
          onPress={ () => { handleGetMealifyRecipes({'ingredients': ingredient_preferences})} }
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