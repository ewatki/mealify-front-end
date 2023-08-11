import React from 'react';
import { Pressable, View, Text, TouchableOpacity, StyleSheet, ActivityIndicator, TextInput, Modal } from 'react-native';

const GetRecipesConstraintsForm = ({ formFields, setFormFields, handleHideModal, modalVisible, setModalVisible }) => {
  // const [formFields, setFormFields] = React.useState({
  //   ingredients: '',
  //   cuisine: '',
  //   diet: '',
  // });
  // const [modalVisible, setModalVisible] = React.useState(false);
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
  container: {
    flex: 1,
    alignItems: 'center', 
    justifyContent: 'center'
  },
  errorContainer: {
    flex: 1,
  },
  getRecipesButton: {
    borderWidth: 1,
    borderRadius: 10,
    padding: 5,
    alignItems: 'center',
    margin: 3,
  },
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
  newRecipeContainer: {
    flex: 3,
  },
  placeholderPressable: {
    flex: 5,
    backgroundColor: 'grey',
    opacity: '.8',
  },
  quickLinksContainer: {
    // marginTop: 50,
    flex: 2, 
    // alignItems: 'center', 
    // justifyContent: 'center'
  },
  showModalButton: {
    alignItems: 'center'
  }
});
