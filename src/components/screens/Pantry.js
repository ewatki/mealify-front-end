import React from 'react';
import { View, Text, ScrollView } from 'react-native';
import data from '../../data/pantryitems.json';
import MultiSelect from 'react-native-multiple-select';

const items = data.pantryItems;

// GET a user's pantry - /users/user_id/pantry/
// POST add to user's pantry - /users/user_id/pantry/
// PATCH update a user's pantry (add new item) - /users/user_id/pantry/
// DELETE remove an item from a user's pantry = /users/user_id/pantry/

const Pantry = () => {
  const [selectedItems, setSelectedItems] = React.useState([]);

  const onSelectedItemsChange = (selectedItems) => {
    setSelectedItems(selectedItems);
  };
  
  return (
    <View>
        {items.map(item => {
          var content = item.items
          content.map((c) => {
            var contentId = c.id
            var contentName = c.name
          })
          return (
            <View>
              <MultiSelect 
                // hideTags
                items={content}
                uniqueKey="id"
                onSelectedItemsChange={onSelectedItemsChange}
                selectedItems={selectedItems}
                selectText={item.section}
                searchInputPlaceholderText="Search Items..."
                // onChangeInput={ (text)=> console.log(text)}
                altFontFamily="ProximaNova-Light"
                tagRemoveIconColor="#CCC"
                tagBorderColor="#CCC"
                tagTextColor="#CCC"
                selectedItemTextColor="#CCC"
                selectedItemIconColor="#CCC"
                itemTextColor="#000"
                displayKey="name"
                searchInputStyle={{ color: '#CCC' }}
                submitButtonColor="#CCC"
                submitButtonText="Submit"
              />
              <Text>{selectedItems}{content.id}</Text>
            </View>
          )
        })}
    </View>
  )
}

export default Pantry;
