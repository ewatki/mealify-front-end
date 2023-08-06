import React, { useState, useEffect } from 'react';
import { View, Text } from 'react-native';
import axios from 'axios';

// Sections: 
// List all recipes (horizontal scrollview)
  // Recipe Routes - GET All, POST Recipe, DELETE Recipe
// Get a Recipe Button
// (Static) List of Staples

const Dashboard = ({ route, navigation }) => {

  // Username is passed down as initial params
  const { name } = route.params;

  return (
    <View>
        <Text>
            Hello, {JSON.stringify(name)}! 
        </Text>
    </View>
  )
}

export default Dashboard;