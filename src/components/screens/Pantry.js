import React from 'react'
import { SectionList, View, ScrollView, Button, Text, Pressable, Modal, StyleSheet} from 'react-native';
import {MultipleSelectList} from 'react-native-dropdown-select-list'
import data from '../../data/pantryitems.json';
import axios from 'axios';
import { SafeAreaView } from 'react-native-safe-area-context';
import { FlatList } from 'react-native-gesture-handler';
// import { panGestureHandlerCustomNativeProps } from 'react-native-gesture-handler/lib/typescript/handlers/PanGestureHandler';

// IMPORT MULTISELECT ----> npm i react-native-dropdown-select-list

// GET a user's pantry - /users/user_id/pantry/
// PATCH update a user's pantry (add new item) - /users/user_id/pantry/
// DELETE remove an item from a user's pantry = /users/user_id/pantry/

let labels = Object.keys(data)

const Pantry = ({ route, navigation }) => {
    const [user, setUser] = React.useState(route.params.user)
    const [selected, setSelected] = React.useState([]);
    const [modalVisible, setModalVisible] = React.useState(false);

    console.log('user.pantry:  ', user.pantry)
    React.useEffect(() => {
        // Update the disabled v not disabled based on the 
        // user.pantry.food_dict items
        for (i in data) {
            let item = data[i];
            for (j in item) {
                let value = item[j]['value']
                if (value in user.pantry.food_dict) {
                    item[j]["disabled"] = true
                } else {
                    item[j]["disabled"] = false
                };
            };
        };
    }, []);

    const handleHideModal = () => {
        setModalVisible(!modalVisible)
    }

    const buildCurrentPantryData = () => {
        // Build the data for displaying the current user's pantry
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

    const submitPantryUpdate = () => {
        // When they close the update pantry modal, it hides the
        // modal, then, if there is no existing pantry, they post
        // a new pantry with all the selected items.  
        // 
        // If they do have an existing pantry, it patches and adds
        // to thier pantry.  There is currently no way of removing
        // items from pantry due to UI insufficiencies.  That will 
        // come later :) 
        handleHideModal()

        // Create a new pantry with selected items
        if (user.pantry.length === 0) {
            axios.post(`https://mealify-zclw.onrender.com/users/${user.id}/pantry`, {food_list: selected})
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
            for (item of selected) {
                if (!(item in user.pantry.food_dict)) {
                    additions.push(item);
                };
            };
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

    return (
        <SafeAreaView>
            <Pressable
                style={[styles.showModalButton]}
                onPress={() => setModalVisible(true)}>
                <Text style={styles.textStyle}>Add Items</Text>
            </Pressable>
            <View style={styles.pantryView}>
                <SectionList
                    sections={currentPantryData}
                    renderItem={({item}) => <Text style={styles.item}>{item}</Text>}
                    // // {console.log(aksjhd)}
                    // renderItem={({item}) => (
                    //     <FlatList
                    //         horizontal={true}
                    //         data={item}
                    //         renderItem={({item}) => <Text style={styles.item}>{item}</Text>}
                    //         />
                    //     )}
                    // renderItem={({ section }) => (
                    //     <FlatList
                    //       data={section.data}
                    //       horizontal={true}
                    //       renderItem={({ item }) => <Text>{item.name}</Text>}
                    //     />
                    //   )}
            
                    
                    renderSectionHeader={({section}) => (
                    <Text style={styles.sectionHeader}>{section.title}</Text>
                    )}
                    keyExtractor={item => `basicListEntry-${item}`}
                    // contentContainerStyle={{
                    //     // flexDirection: 'row',
                    //     // flexWrap: 'wrap',
                    //     // justifyContent: 'space-around',
                    // }}
                />
            </View>
            <Modal         
                animationType="slide"
                transparent={false}
                visible={modalVisible}
                onRequestClose={() => {
                    Alert.alert('Modal has been closed.');
                    setModalVisible(!modalVisible);
                }}>
                <Pressable
                    style={styles.placeholderPressable}
                    onPress={() => handleHideModal()}>
                </Pressable>
                <View>
                    <ScrollView>
                        <View style={{flex:1, paddingHorizontal:20, paddingTop: 20}}>

                        {
                            labels.map((each, index) => {
                                return (
                                    <View key={index}>
                                        <MultipleSelectList
                                            setSelected={(val) => setSelected(val)}
                                            data={data[each]}
                                            onSelect={() => console.log(selected)}
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
                        <Button title="Save" onPress={() => submitPantryUpdate()}/>
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
        fontSize: 18,
        height: 44,
    },
    modalView: {
        flex: 3,
        alignItems: 'center'
    },
    newRecipeContainer: {
        flex: 3,
    },
    pantryView: {
        // flex: 1,
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
    textStyle: {
        fontSize: 20,
    }
});
