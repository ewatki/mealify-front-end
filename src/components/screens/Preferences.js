import React from 'react'
import { Modal, View, ScrollView, Button, Text, StyleSheet, Pressable, SectionList} from 'react-native';
import {MultipleSelectList} from 'react-native-dropdown-select-list'
import { SafeAreaView } from 'react-native-safe-area-context';
import axios from 'axios';
import { interpolate } from 'react-native-reanimated';
// IMPORT MULTISELECT ----> npm i react-native-dropdown-select-list

const Preferences = ({ route, navigation }) => {
    const [user, setUser] = React.useState(route.params.user)
    const [removeSelected, setRemoveSelected] = React.useState([]);
    const [addSelected, setAddSelected] = React.useState([]);
    const [removeModalVisible, setRemoveModalVisible] = React.useState(false);
    const [addModalVisible, setAddModalVisible] = React.useState(false);
    const data = {
      "Intolerances": [
          { "id": 1, "value": "Dairy" },
          { "id": 2, "value": "Egg" },
          { "id": 3, "value": "Gluten" },
          { "id": 4, "value": "Grain" },
          { "id": 5, "value": "Peanut" },
          { "id": 6, "value": "Seafood" },
          { "id": 7, "value": "Sesame" },
          { "id": 8, "value": "Shellfish" },
          { "id": 9, "value": "Sesame" },
          { "id": 10, "value": "Soy" },
          { "id": 11, "value": "Sulfite" },
          { "id": 12, "value": "Tree Nut" },
          { "id": 13, "value": "Wheat" }
      ],
      "Diet Restrictions": [
          { "id": 14, "value": "Gluten Free" },
          { "id": 15, "value": "Ketogenic" },
          { "id": 16, "value": "Vegetarian" },
          { "id": 17, "value": "Vegan" },
          { "id": 18, "value": "Pescatarian" },
          { "id": 19, "value": "Paleo" },
          { "id": 20, "value": "Primal" }
      ]
    }
    let labels = Object.keys(data)

    const buildCurrentPrefData = () => {
      let currentPrefData = [
          {title: "Intolerances", data: []},
          {title: "Diet Restrictions", data: []},
      ]

      for (intolerance in user.intolerances) {
          for (label in data) {
              let itemDict = data[label];
              for (item of itemDict) {
                  if (item.value === intolerance) {
                      for (dict of currentPrefData){
                          if (dict.title === label) {
                              dict.data.push(item.value)
                          };
                      };
                  };
              };
          };
      };
      for (diet_restriction in user.diet_restrictions) {
          for (label in data) {
            let itemDict = data[label];
            for (item of itemDict) {
                if (item.value === diet_restriction) {
                    for (dict of currentPrefData){
                        if (dict.title === label) {
                            dict.data.push(item.value)
                        };
                    };
                };
            };
          };
      };
      return currentPrefData
    };
    const currentPrefData = buildCurrentPrefData();


    const handleHideAddModal = () => {
        setAddModalVisible(!addModalVisible)
    }
    const handleHideRemoveModal = () => {
        setRemoveModalVisible(!removeModalVisible)
    }

    const handleOpenAddModal = () => {
        setAddSelected([])
        handleHideAddModal()
    }
    const handleOpenRemoveModal = () => {
        setRemoveSelected([])
        handleHideRemoveModal()
    }

    const submitAddPrefUpdate = () => {
        // When they close the add prefrences modal, it hides the
        // modal.  Then it patches and adds the selected items 
        // to thier prefrences. 
        handleHideAddModal()
        // Gather intolerances, diet_restrictions
        let intoleranceAdditions = []
        let dietRestrictionsAdditions = []
        for (pref of addSelected) {
          for (intolerance of data['Intolerances']) {
            if (pref === intolerance.value) {
              intoleranceAdditions.push(pref);
            };
          };
          for (dietRestriction of data['Diet Restrictions']) {
            if (pref === dietRestriction.value) {
              dietRestrictionsAdditions.push(pref);
            };
          };
        }

        if (intoleranceAdditions.length != 0) {
          axios.patch(`https://mealify-zclw.onrender.com/users/${user.id}/intolerances/add`, {intolerances: intoleranceAdditions})
          .then(response => {
              setUser(user => {
                  return {
                      ...user,
                      intolerances: response.data.intolerances
                  };
              });
              console.log('Successful addition to the intolerances!');
          })
          .catch(error => {
              console.log('Intolerances Error: ', error);
          });
        }
        if (dietRestrictionsAdditions.length != 0) {
          axios.patch(`https://mealify-zclw.onrender.com/users/${user.id}/diet_restrictions/add`, {diet_restrictions: dietRestrictionsAdditions})
          .then(response => {
              setUser(user => {
                  return {
                      ...user,
                      diet_restrictions: response.data.diet_restrictions
                  };
              });
              console.log('Successful addition to the diet restrictions!');
          })
          .catch(error => {
            console.log('Diet Restrictions Error: ', error);
          });
        }
    };

    const submitRemovePrefUpdate = () => {
        // When they close the remove prefrences modal, it hides the
        // modal.  Then it patches and removes the selected items 
        // from thier prefrences. 

        handleHideRemoveModal()
        // Gather intolerances, diet_restrictions
        let intoleranceRemovals = []
        let dietRestrictionsRemovals = []
        for (pref of removeSelected) {
          for (intolerance of data['Intolerances']) {
            if (pref === intolerance.value) {
              intoleranceRemovals.push(pref);
            };
          };
          for (dietRestriction of data['Diet Restrictions']) {
            if (pref === dietRestriction.value) {
              dietRestrictionsRemovals.push(pref);
            };
          };
        }

        if (intoleranceRemovals.length != 0) {
          axios.patch(`https://mealify-zclw.onrender.com/users/${user.id}/intolerances/remove`, {intolerances: intoleranceRemovals})
          .then(response => {
              setUser(user => {
                  return {
                      ...user,
                      intolerances: response.data.intolerances
                  };
              });
              console.log('Successful removal from the intolerances!');
          })
          .catch(error => {
              console.log('Intolerances Error: ', error);
          });
        }
        if (dietRestrictionsRemovals.length != 0) {
          axios.patch(`https://mealify-zclw.onrender.com/users/${user.id}/diet_restrictions/remove`, {diet_restrictions: dietRestrictionsRemovals})
          .then(response => {
              setUser(user => {
                  return {
                      ...user,
                      diet_restrictions: response.data.diet_restrictions
                  };
              });
              console.log('Successful removal from diet restrictions!');
          })
          .catch(error => {
            console.log('Diet Restrictions Error: ', error);
          });
        }
    };



    return (
        <SafeAreaView>
            <View style={styles.showModalButtonsContainer}>
                <Pressable
                    style={[styles.showModalButton]}
                    onPress={() => handleOpenAddModal()}>
                    <Text style={styles.textStyle}>Add Preferences</Text>
                </Pressable>
                <Pressable
                    style={[styles.showModalButton]}
                    onPress={() => handleOpenRemoveModal()}>
                    <Text style={styles.textStyle}>Remove Preferences</Text>
                </Pressable>
            </View>
            {/* Display Preferences */}
            <View style={styles.prefView}>
                <SectionList
                    sections={currentPrefData}
                    renderItem={({item}) => <Text style={styles.item}>{item}</Text>}
                    renderSectionHeader={({section}) => (
                    <Text style={styles.sectionHeader}>{section.title}</Text>
                    )}
                    keyExtractor={item => `basicListEntry-${item}`}
                />
            </View>
            {/* Add Items Modal */}
            <Modal         
                animationType="slide"
                transparent={false}
                visible={addModalVisible}
                onRequestClose={() => {
                    Alert.alert('Add modal has been closed.');
                    setAddModalVisible(!addModalVisible);
                }}>
                <Pressable
                    style={styles.placeholderPressable}
                    onPress={() => submitAddPrefUpdate()}>
                </Pressable>
                <View style={styles.modalView}>
                    <ScrollView>
                        <View style={{flex:1, paddingHorizontal:20, paddingTop: 20}}>

                        {
                            labels.map((each, index) => {
                                return (
                                    <View key={index}>
                                        <MultipleSelectList
                                            setSelected={(val) => setAddSelected(val)}
                                            data={data[each]}
                                            onSelect={() => console.log(addSelected)}
                                            placeholder={each}
                                            label={each}
                                            save="value"
                                            notFoundText="Sorry, we don't have that yet"
                                            // labelStyles={{color: "pink"}}
                                            // badgeStyles={{backgroundColor: "red"}}
                                        />
                                    </View>
                                )
                            })
                        }
                        </View>
                        <View style={styles.saveButtonContainer}>
                            <Button title="Save" onPress={() => submitAddPrefUpdate()}/>
                        </View>
                    </ScrollView>
                </View>
            </Modal>
            {/* Remove Items Modal */}
            <Modal         
                animationType="slide"
                transparent={false}
                visible={removeModalVisible}
                onRequestClose={() => {
                    Alert.alert('Remove modal has been closed.');
                    setRemoveModalVisible(!removeModalVisible);
                }}>
                <Pressable
                    style={styles.placeholderPressable}
                    onPress={() => submitRemovePrefUpdate()}>
                </Pressable>
                <View style={styles.modalView}>
                    <ScrollView>
                        <View style={{flex:1, paddingHorizontal:20, paddingTop: 20}}>

                        {
                            labels.map((each, index) => {
                                return (
                                    <View key={index}>
                                        <MultipleSelectList
                                            setSelected={(val) => setRemoveSelected(val)}
                                            data={data[each]}
                                            onSelect={() => console.log(removeSelected)}
                                            placeholder={each}
                                            label={each}
                                            save="value"
                                            notFoundText="Nothing stored here"
                                            // labelStyles={{color: "pink"}}
                                            // badgeStyles={{backgroundColor: "red"}}
                                        />
                                    </View>
                                )
                            })
                        }
                        </View>
                        <View style={styles.saveButtonContainer}>
                            <Button title="Save" onPress={() => submitRemovePrefUpdate()}/>
                        </View>
                    </ScrollView>
                </View>
            </Modal>
        </SafeAreaView>
    )
}

export default Preferences;

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
  item: {
      padding: 10,
      fontSize: 18,
      height: 44,
  },
  modalView: {
      paddingBottom: 50,

  },
  newRecipeContainer: {
      flex: 3,
  },
  prefView: {
      paddingBottom: 50,
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
  sectionHeader: {
      paddingTop: 2,
      paddingLeft: 10,
      paddingRight: 10,
      paddingBottom: 2,
      fontSize: 20,
      fontWeight: 'bold',
      backgroundColor: 'rgba(247,247,247,1.0)',
      justifyContent: 'center', 
      alignSelf: 'center'
  },
  showModalButton: {
      alignItems: 'center',
      borderWidth: 1,
      borderRadius: 10,
      marginTop: -40,
      marginBottom: 20,
      padding: 10,
      width: 150,
      justifyContent: 'center',
      alignSelf: 'center',
  },
  showModalButtonsContainer: {
      flexDirection: 'row', 
      justifyContent: 'space-around'
  },
  textStyle: {
      fontSize: 20,
      justifyContent: 'center'
  }
});
