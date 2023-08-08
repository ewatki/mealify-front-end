import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, Image, SafeAreaView, TextInput, FlatList, SectionList } from 'react-native';
import axios from 'axios';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Pantry from './Pantry';

import Preferences from './Preferences';
import Login from './Login';

// Sections: 
// List all recipes (horizontal scrollview)
  // Recipe Routes - GET All, POST Recipe, DELETE Recipe
// Get a Recipe Button
// (Static) List of Staples





const Dashboard = ({ route, navigation }) => {
  // const { username, pantry, savedRecipes, preferences } = route.params.user;
  
  // ScrollView List - Horizontal
  // let items = saveRecipes.map((item) => {
  //   console.log(item)
  // })

  return (
    
    <SafeAreaView>
      
      
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

      {/* <View style={[styles.row, styles.circleBtn]}>
        <TouchableOpacity onPress={() => navigation.navigate(Pantry)}>
          <Text>Go to Pantry</Text>
        </TouchableOpacity>
      </View>

        <Text>
          Get a Recipe
        </Text> */}
      <View style={styles.container}>
        <Text>
          Recommended Staples:
        </Text>
        {/* <Pantry /> */}
        <SectionList
        sections={[
          {title: 'Baking', data: ['Flour', 'Baking Powder', 'Baking Soda', 'Vanilla Extract']},
          {
            title: 'Sweetners',
            data: ['Sugar', 'Honey','Syrup']
          },
          {
            title: 'Dry Goods',
            data: ['Rolled Oats', 'Rice','Pasta', 'Beans', 'Canned Tomatoes']
          },
          {
            title: 'Spices',
            data: ['Salt', 'Pepper','Onion Powder', 'Garlic Powder', 'Paprika']
          },
          {
            title: 'Refrigerated',
            data: ['Eggs', 'Milk','Butter']
          },
          {
            title: 'Condiments and Spreads',
            data: ['Peanut Butter', 'Ketchup','Mustard']
          },
          {
            title: 'Frozen',
            data: ['Frozen Fruit', 'Frozen Vegetables']
          },

        ]}
        renderItem={({item}) => <Text style={styles.item}>{item}</Text>}
        renderSectionHeader={({section}) => (
          <Text style={styles.sectionHeader}>{section.title}</Text>
        )}
        keyExtractor={item => `basicListEntry-${item}`}
      />

        
      
      </View>
      
        
      

    </SafeAreaView>
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
  },
  // container: {
  //   flex: 1,
  //   paddingTop: 22,
  // },
  sectionHeader: {
    paddingTop: 2,
    paddingLeft: 10,
    paddingRight: 10,
    paddingBottom: 2,
    fontSize: 14,
    fontWeight: 'bold',
    backgroundColor: 'rgba(247,247,247,1.0)',
  },
  item: {
    padding: 10,
    fontSize: 18,
    height: 44,
  },
})
export default Dashboard;