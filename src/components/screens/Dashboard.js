import React from 'react'
import { StyleSheet, Text, View, SafeAreaView, ScrollView, Image, TouchableOpacity, TextInput, FlatList, KeyboardAvoidingView, Platform } from 'react-native';

// TESTING
const recipeImages = ["https://spoonacular.com/recipeImages/782585-312x231.jpg", "https://spoonacular.com/recipeImages/716429-556x370.jpg", "https://www.allrecipes.com/thmb/qk2ga3zSmgDmzlwDkukcHr9AUjw=/800x533/filters:no_upscale():max_bytes(150000):strip_icc():focal(399x0:401x2):format(webp)/8382626_ZucchiniandGroundBeefSkillet4x3photobyfabeveryday-f36b3dd65e65448097aa967c7f23c880.jpg", "https://www.allrecipes.com/thmb/nYSZduxspJJeYExxpVB7miP9jXM=/364x242/filters:no_upscale():max_bytes(150000):strip_icc():focal(999x0:1001x2):format(webp)/242342-fiesta-slow-cooker-shredded-chicken-tacos-ddmfs-3X2-0902-775cf5010b5b46cdbdf2ca50993628a9.jpg", "https://www.allrecipes.com/thmb/57nQ0DwByvRw-CYcZbZsGkzN8OA=/771x514/filters:no_upscale():max_bytes(150000):strip_icc():focal(929x470:931x472):format(webp)/ChefJohnsTacoStuffedZucchiniBoats4x3-6b9f773827f747d092f438faf9da0ed5.jpg"]

// ACTUAL
// const recipeImages = route.params.user.recipes

// TESTING 
const recipeData = [
  {"id": 1, "title": "1 cup red quinoa"},
  {"id": 2, "title": "2 cups vegetable broth"},
  {"id": 3, "title": "1 small diced orange bell pepper"},
  {"id": 4, "title": "4 smalls diced green onions"},
  {"id": 5, "title": "1 cup english diced cucumber"},
  {"id": 6, "title": "1 cup diced tomatoes"},
  {"id": 7, "title": "1 cup edamame"},
  {"id": 8, "title": "1 lime (juice)"}
]

const Item = ({title, id}) => (
  <View style={{width: 180, paddingTop: 5}}>
    <Text style={{fontFamily: 'Avenir-Roman'}}>{title}</Text>
  </View>
);

const Home = ({route}) => {
  return (
    <SafeAreaView style={{flex:1}}>
      <ScrollView nestedScrollEnabled={true} style={{flex:1, flexDirection: 'column', backgroundColor: '#E2C274'}}>
        <View style={styles.blob}>
          <Text style={styles.header}>Hello, {route.params.user.username}!</Text>
          <View style={{flexDirection: 'row'}}>
            <Text style={{fontSize: 52, fontFamily: 'Avenir-Roman', fontWeight: 'bold', paddingHorizontal: 20, width: 315}}>What are you in the mood for?</Text>
            <TouchableOpacity style={{padding: 10, borderRadius: 10, height: 40, right: 190, top: 110, textAlign: 'center', backgroundColor: '#756382'}}>
              <Text style={{fontSize: 16, color: 'white',              fontFamily: 'Avenir-Roman'}}>Get a Recipe </Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={{top: 0, backgroundColor: '#E2C274', paddingHorizontal: 30}}>
          <ScrollView horizontal={true} style={{flex: 1, height: 200, paddingVertical: 15, bottom: 35, zIndex: 2}}>

          {
            recipeImages.map((each) => {
              return (
              <View>
                <Image
                style={{width: 150, height: 170, borderRadius: 20, marginLeft: 10, marginRight: 10}}
                source={{uri: `${each}`}}
                resizeMode={'cover'}
                />
              </View>
              )
            })
          }
          </ScrollView>
        </View>
        <View style={{bottom: 20, height: 300, flex: 1, justifyContent: 'top', gap: 10, paddingVertical: 20}}>

            <Text style={{fontSize:20, fontWeight: 'medium', fontFamily: 'Avenir-Roman', paddingHorizontal: 30}}>Search for a Recipe : </Text>

            <KeyboardAvoidingView
              behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            >
              <TextInput maxLength={60} numberOfLines={3} placeholder="Healthy Quinoa Salad" style={{borderRadius: 10, paddingHorizontal: 20, backgroundColor: 'white', width: 350, alignSelf: 'center', borderColor: 'black', borderWidth: 1}}/>
            </KeyboardAvoidingView>


            <TouchableOpacity onPress={() => {console.log("calling")}} style={{padding: 10, borderRadius: 10, height: 40, width: 100, backgroundColor: '#756382', alignSelf: 'center'}}>
              <Text style={{fontSize: 16, fontFamily: 'Avenir-Roman', color: 'white', textAlign: 'center'}}>Submit</Text>
            </TouchableOpacity>

            <View style={{flex:1, width: 350, height: 600, alignSelf: 'center', color: 'black', bottom: 0}}>
              <Text style={{fontSize: 20, fontFamily: 'Avenir-Roman', fontWeight: 'bold'}}>Ingredients</Text>
              <FlatList
                numColumns={2}
                horizontal={false}
                data={recipeData}
                renderItem={({item}) => <Item title={item.title} id={item.id}/>}
                keyExtractor={item => item.id}
              />
            </View>
              
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}
  
const styles = StyleSheet.create({
  blob: {
    height: 250,
    borderBottomLeftRadius: 40,
    borderBottomRightRadius: 40,
    backgroundColor: 'white',
  },
  header: {
    zIndex: 1,
    fontSize: 25,
    paddingHorizontal: 20,
    color: 'black',
    textAlign: 'right',
    fontFamily: 'Avenir-Roman',
    fontWeight: 'medium'
  }
})

export default Home;