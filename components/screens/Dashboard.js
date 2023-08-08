import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import axios from 'axios';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Pantry from './Pantry';

// Sections: 
// List all recipes (horizontal scrollview)
  // Recipe Routes - GET All, POST Recipe, DELETE Recipe
// Get a Recipe Button
// (Static) List of Staples

const Dashboard = ({ route, navigation }) => {
  const { username, pantry, saveRecipes, preferences} = route.params.user;

  // ScrollView List - Horizontal
  // let items = saveRecipes.map((item) => {
  //   console.log(item)
  // })

  return (
    <View>
      <View style={[styles.row, styles.recipes]}>
        {/* ScrollView Horizonal Container */}
        <View>
          {/* Images of Recipes - Circles */}
          <Text>
            Saved Recipes
            This is a test
          </Text>
        </View>
      </View>

      <View style={[styles.row, styles.circleBtn]}>
        <TouchableOpacity onPress={() => navigation.navigate(Pantry)}>
          <Text>Go to Pantry</Text>
        </TouchableOpacity>
      </View>

        <Text>
          Get a Recipe
        </Text>
        <Text>
          Recommended Staples:
        </Text>
    </View>
  )
};

const styles = StyleSheet.create({
  recipes: {
    height: 70,
  },
  circleBtn: {
    // width: 50,
    // height: 50,
    // borderRadius: 50,
    // backgroundColor: 'green',
  }
})
export default Dashboard;