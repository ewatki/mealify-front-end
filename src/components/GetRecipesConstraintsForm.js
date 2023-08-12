import React from 'react';
import { View, Text, StyleSheet, TextInput, Modal, TouchableOpacity, Pressable } from 'react-native';

const GetRecipesConstraintsForm = ({ formFields, setFormFields, handleHideModal, modalVisible, setModalVisible, setErrorMessage, handleGetNewRecipes }) => {
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
    <View style={[]}>
      <Modal         
        animationType="slide"
        // transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
          setModalVisible(!modalVisible);
        }}>
        <TouchableOpacity 
          style={[styles.center, styles.container]}
          onPress={ () => { 
            handleHideModal()} 
          }
          >
          <Text style={styles.header}>What are your priorites for this meal?</Text>
          <View style={[styles.modalView, styles.center]}>
            <Text style={[styles.inputTitle, styles.topTitle]}>Add Ingredients</Text>
            <TextInput 
              value={formFields.ingredients} 
              onChangeText={text => handleChange(text, 'ingredients')} 
              autoCompleteType="ingredients" 
              autoCapitalize='none'
              placeholder='Ingredients'
              style={styles.input}
            />   
            <Text style={styles.inputTitle}>Add Cuisine</Text>
            <TextInput 
              value={formFields.cuisine} 
              onChangeText={text => handleChange(text, 'cuisine')} 
              autoCompleteType="cuisine" 
              autoCapitalize='none'
              placeholder='Indian'
              style={styles.input}
            />   
            <Text style={styles.inputTitle}>Add Diet Restriction</Text>
            <TextInput 
              value={formFields.diet} 
              onChangeText={text => handleChange(text, 'diet')} 
              autoCompleteType="diet" 
              autoCapitalize='none'
              placeholder='Cooking for a new person?'
              style={styles.input}
            />
            <TouchableOpacity 
              style={[styles.getRecipesButton]}
              onPress={ () => { 
                handleHideModal()
                handleGetNewRecipes()} 
              }
            > 
              <Text style={[styles.buttonText]} >Get Recipe</Text>
            </TouchableOpacity>

          </View>
        </TouchableOpacity>
      </Modal>
    </View>
  );
};

export default GetRecipesConstraintsForm;

const styles = StyleSheet.create({
  buttonText: {
    color: 'white',
    fontSize: 20,
    fontFamily: 'Avenir-Roman',
  },
  center: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  container: {
    flex: 1,
    backgroundColor: '#E2C274',
  },
  header: {
    fontSize: 25, 
    fontFamily: 'Avenir-Roman',
    fontWeight: 'bold',
    padding: 60,
    paddingTop: 0,
  },
  input: {
    height: 40,
    margin: 12,
    padding: 10,
    borderRadius: 10,
    width: 300,
    backgroundColor: 'white',
  },
  inputTitle: {
    color: 'white',
    fontFamily: 'Avenir-Roman',
  },
  getRecipesButton: {
    borderWidth: 1,
    borderRadius: 10,
    borderColor: 'white',
    padding: 10,
    marginTop: 10,
    fontFamily: 'Avenir-Roman',

  },
  modalView: {
    borderRadius: 8,
    height: 350,
    backgroundColor: '#756382',
  },
  placeholderPressable: {
    backgroundColor: '#E2C274',
    opacity: '.8',
  },
  topTitle: {
    marginTop: 10,
  },
});
