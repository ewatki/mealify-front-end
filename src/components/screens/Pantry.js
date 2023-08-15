import React from 'react'
import { SectionList, View, ScrollView, Button, Text, Pressable, Modal, StyleSheet} from 'react-native';
import {MultipleSelectList} from 'react-native-dropdown-select-list'
import data from '../../data/pantryitems.json';
import axios from 'axios';
import { SafeAreaView } from 'react-native-safe-area-context';
import { FlatList } from 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
// import { panGestureHandlerCustomNativeProps } from 'react-native-gesture-handler/lib/typescript/handlers/PanGestureHandler';

// IMPORT MULTISELECT ----> npm i react-native-dropdown-select-list

// GET a user's pantry - /users/user_id/pantry/
// PATCH update a user's pantry (add new item) - /users/user_id/pantry/
// DELETE remove an item from a user's pantry = /users/user_id/pantry/

const Pantry = ({ route, navigation }) => {
    const [user, setUser] = React.useState(route.params.user)
    const [removeSelected, setRemoveSelected] = React.useState([]);
    const [addSelected, setAddSelected] = React.useState([]);
    const [removeModalVisible, setRemoveModalVisible] = React.useState(false);
    const [addModalVisible, setAddModalVisible] = React.useState(false);
    const labels = Object.keys(data)

    // console.log('user.pantry:  ', user.pantry)

    // Use this if we want to enable disabled v not disabled
    // React.useEffect(() => {
    //     // Update the disabled v not disabled based on the 
    //     // user.pantry.food_dict items
    //     for (i in data) {
    //         let item = data[i];
    //         for (j in item) {
    //             let value = item[j]['value']
    //             if (value in user.pantry.food_dict) {
    //                 item[j]["disabled"] = true
    //             } else {
    //                 item[j]["disabled"] = false
    //             };
    //         };
    //     };
    // }, []);

    // Functions for hiding respective modals
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
    
    // Build the data for displaying the current user's pantry
    const buildCurrentPantryData = () => {
        let currentPantryData = [
            {title: "Oil & Vinegar", data: []},
            {title: "Cans & Jars", data: []},
            {title: "Spices & Herbs", data: []},
            {title: "Grains & Starches", data: []},
            {title: "Nuts & Nut Butters", data: []},
            {title: "Sweeteners", data: []},
            {title: "Preserves & Pickles", data: []},
            {title: "Produce", data: []},
            {title: "Dairy", data: []},
            {title: "Meats", data: []},
            {title: "Vegetables", data: []},
            {title: "Baking", data: []},
        ]
        for (pantryFood in user.pantry.food_dict) {
            for (label in data) {
                let itemDict = data[label];
                for (item of itemDict) {
                    if (item.value === pantryFood) {
                        for (dict of currentPantryData){
                            if (dict.title === label) {
                                dict.data.push(item.value)
                            };
                        };
                    };
                };
            };
        };
        return currentPantryData
    };
    const currentPantryData = buildCurrentPantryData();

    const submitAddPantryUpdate = () => {
        // When they close the add pantry modal, it hides the
        // modal, then, if there is no existing pantry, they post
        // a new pantry with all the selected items.  
        // 
        // If they do have an existing pantry, it patches and adds
        // to thier pantry. 
        handleHideAddModal()

        // Create a new pantry with selected items
        if (user.pantry.length === 0) {
            axios.post(`https://mealify-zclw.onrender.com/users/${user.id}/pantry`, {food_list: addSelected})
            .then(response => {
                setUser(user => {
                    return {
                        ...user,
                        pantry: response.data
                    };
                });
                console.log('Successful pantry creation.');
            })
            .catch(error => {
                console.log(error);
            });
        } else {
            // Gather the items to add add to existing pantry
            let additions = []
            console.log('addSelected: ', addSelected)
            for (item of addSelected) {
                if (!(item in user.pantry.food_dict)) {
                    console.log('item: ', item)
                    additions.push(item);
                };
            };
            console.log('additions: ', additions)

            axios.patch(`https://mealify-zclw.onrender.com/pantry/${user.pantry.id}/add`, {food_list: additions})
            .then(response => {
                setUser(user => {
                    return {
                        ...user,
                        pantry: response.data
                    };
                });
                console.log('Successful addition to the pantry!');
            })
            .catch(error => {
                console.log(error);
            });
        };
    };

    const submitRemovePantryUpdate = () => {
        // When they close the remove pantry modal, it hides the
        // modal, then, if there is no existing pantry, it returns
        // a future edit will be to add an error or something if they 
        // do this.  
        // 
        // If they do have an existing pantry, it patches and removes
        // the selected items from thier pantry. 

        handleHideRemoveModal()
        // Deals with if the user doesnt have a pantry
        if (user.pantry.length === 0) {
            console.log('No pantry to remove items from!')
            return 
        } else {
            // Gather the items to add add to existing pantry
            let removals = []
            for (item of removeSelected) {
                if (item in user.pantry.food_dict) {
                    removals.push(item);
                };
            };
            console.log('removals: ', removals)
            axios.patch(`https://mealify-zclw.onrender.com/pantry/${user.pantry.id}/remove`, {food_list: removals})
            .then(response => {
                setUser(user => {
                    return {
                        ...user,
                        pantry: response.data
                    };
                });
                console.log('Successful removal from the pantry!');
            })
            .catch(error => {
                console.log(error);
            });
        };
    };

    return (
        <SafeAreaView style={{backgroundColor: 'white'}}>
            <View style={styles.showModalButtonsContainer}>
                <Pressable
                    style={[styles.showModalButtonLeft]}
                    onPress={() => handleOpenAddModal()}
                    >
                    <Text style={styles.textStyle}>Add </Text>
                    {/* <Text style={styles.textStyle}>+</Text> */}

                </Pressable>
                <Pressable
                    style={[styles.showModalButtonRight]}
                    onPress={() => handleOpenRemoveModal()}>
                    <Text style={styles.textStyle}>Remove </Text>
                    {/* <Text style={styles.textStyle}>-</Text> */}
                </Pressable>
            </View>
            {/* Display Pantry */}
            <View style={styles.pantryView}>
                <SectionList
                    sections={currentPantryData}
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
                    onPress={() => submitAddPantryUpdate()}>
                </Pressable>
                <View backdropOpacity={0.2} style={styles.modalView}>
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
                                            badgeStyles={{backgroundColor: "#756382"}}
                                        />
                                    </View>
                                )
                            })
                        }
                        </View>
                        <View style={styles.saveButtonContainer}>
                            <Button title="Save" color='#756382' onPress={() => submitAddPantryUpdate()}/>
                        </View>
                    </ScrollView>
                </View>
            </Modal>
            {/* Remove Items Modal */}
            <Modal   
                hasBackdrop={true}
                animationType="slide"
                transparent={false}
                visible={removeModalVisible}
                onRequestClose={() => {
                    Alert.alert('Remove modal has been closed.');
                    setRemoveModalVisible(!removeModalVisible);
                }}>
                <Pressable
                    style={styles.placeholderPressable}
                    onPress={() => submitRemovePantryUpdate()}>
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
                                            badgeStyles={{backgroundColor: "#756382"}}
                                        />
                                    </View>
                                )
                            })
                        }
                        </View>
                        <View style={styles.saveButtonContainer}>
                            <Button title="Save" color='#756382' onPress={() => submitRemovePantryUpdate()}/>
                        </View>
                    </ScrollView>
                </View>
            </Modal>
        </SafeAreaView>
    )
}

export default Pantry;

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
        fontSize: 15,
        height: 35,
        marginBottom: 5,
        backgroundColor: '#dee2e7'
    },
    modalView: {
        paddingBottom: 50,

    },
    newRecipeContainer: {
        flex: 3,
    },
    pantryView: {
        top: 10,
        minHeight: '100%',
        paddingBottom: 50,
        textAlign: 'left',
        paddingHorizontal: 25,
        // backgroundColor: 'purple',
    },
    placeholderPressable: {
        flex: 5,
        backgroundColor: 'grey',
        // opacity: '.8',
    },
    quickLinksContainer: {
      // marginTop: 50,
        flex: 2, 
      // alignItems: 'center', 
      // justifyContent: 'center'
    },
    sectionHeader: {
        paddingVertical: 2,
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'left',
        marginBottom: 5,
        height: 'auto'
    },
    showModalButtonLeft: {
        alignItems: 'center',
        borderWidth: 1,
        borderTopLeftRadius: 10,
        borderBottomLeftRadius: 10,
        padding: 5,
        width: 100,
        justifyContent: 'right',
        alignSelf: 'center',
        backgroundColor: '#756382',        
    },
    showModalButtonRight: {
        alignItems: 'center',
        borderWidth: 1,
        borderTopRightRadius: 10,
        borderBottomRightRadius: 10, 
        padding: 5,
        width: 100,
        justifyContent: 'right',
        alignSelf: 'center',
        backgroundColor: '#756382',        
    },
    showModalButtonsContainer: {
        flexDirection: 'row', 
        // justifyContent: 'space-around',
        justifyContent: 'center',
        position: 'absolute',
        bottom: 20,
        zIndex: 2,
        alignSelf: 'center',
        width: '60%',
    },
    textStyle: {
        fontSize: 15,
        color: 'white',
    },
    saveButtonContainer: {
        width: '40%',
        alignSelf: 'center',
    },
    saveButton: {
        borderRadius: 15,
        backgroundColor: '#756382',
        justifyContent: 'center'
    }
});
