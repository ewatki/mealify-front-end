import React from 'react';
import { Pressable, View, Text, StyleSheet, TextInput, Modal } from 'react-native';

const GetRecipesConstraintsForm = ({ formFields, setFormFields, handleHideModal, modalVisible, setModalVisible, setErrorMessage }) => {
  setErrorMessage('')
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

  return (

    <Modal         
      animationType="slide"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => {
        Alert.alert('Modal has been closed.');
        setModalVisible(!modalVisible);
      }}>
      <Pressable
          style={styles.placeholderPressable}
          onPress={() => handleHideModal()}>
      </Pressable>
      <View style={styles.modalView}>
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
  );
};

export default GetRecipesConstraintsForm;

const styles = StyleSheet.create({
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
  placeholderPressable: {
    flex: 5,
    backgroundColor: 'grey',
    opacity: '.8',
  },
});
