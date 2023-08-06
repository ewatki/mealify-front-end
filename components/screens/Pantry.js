import React from 'react';
import { View, Text } from 'react-native';

// GET a user's pantry - /users/user_id/pantry/
// POST add to user's pantry - /users/user_id/pantry/
// PATCH update a user's pantry (add new item) - /users/user_id/pantry/
// DELETE remove an item from a user's pantry = /users/user_id/pantry/

const Pantry = () => {
  return (
    <View>
        <Text>
            Pantry
        </Text>
    </View>
  )
}

export default Pantry;