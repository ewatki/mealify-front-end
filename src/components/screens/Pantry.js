import React from 'react'
import { View, ScrollView, Button, Text} from 'react-native';
import {MultipleSelectList} from 'react-native-dropdown-select-list'
import data from '../../data/pantryitems.json';

import { SafeAreaView } from 'react-native-safe-area-context';

// IMPORT MULTISELECT ----> npm i react-native-dropdown-select-list

// GET a user's pantry - /users/user_id/pantry/
// PATCH update a user's pantry (add new item) - /users/user_id/pantry/
// DELETE remove an item from a user's pantry = /users/user_id/pantry/

let labels = Object.keys(data)

const Pantry = () => {
    const [selected, setSelected] = React.useState([]);

    const submitPantryUpdate = () => {
      // POST add to user's pantry - /users/user_id/pantry/
    }

    return (
        <SafeAreaView>
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
                <Button title="Save" onPress={() => { submitPantryUpdate }}/>
            </ScrollView>
        </SafeAreaView>
    )
}

export default Pantry;