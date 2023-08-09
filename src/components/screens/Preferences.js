import React from 'react'
import { View, ScrollView, Button, Text} from 'react-native';
import {MultipleSelectList} from 'react-native-dropdown-select-list'
import { SafeAreaView } from 'react-native-safe-area-context';

// IMPORT MULTISELECT ----> npm i react-native-dropdown-select-list

const Preferences = () => {
    const [selected, setSelected] = React.useState([]);
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
                <Button title="Save" onPress={() => { submitPreferencesUpdate }}/>
            </ScrollView>
        </SafeAreaView>
    )
}

export default Preferences;