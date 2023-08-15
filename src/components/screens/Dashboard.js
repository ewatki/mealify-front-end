import React from 'react'
import { StyleSheet, Text, View, SafeAreaView, ScrollView, Image, TouchableOpacity, TextInput, FlatList, KeyboardAvoidingView, Platform, Alert } from 'react-native';
import axios from 'axios';
import Recipe from './Recipe';

const recipeImages = ["https://spoonacular.com/recipeImages/782585-312x231.jpg", "https://spoonacular.com/recipeImages/716429-556x370.jpg", "https://www.allrecipes.com/thmb/qk2ga3zSmgDmzlwDkukcHr9AUjw=/800x533/filters:no_upscale():max_bytes(150000):strip_icc():focal(399x0:401x2):format(webp)/8382626_ZucchiniandGroundBeefSkillet4x3photobyfabeveryday-f36b3dd65e65448097aa967c7f23c880.jpg", "https://www.allrecipes.com/thmb/nYSZduxspJJeYExxpVB7miP9jXM=/364x242/filters:no_upscale():max_bytes(150000):strip_icc():focal(999x0:1001x2):format(webp)/242342-fiesta-slow-cooker-shredded-chicken-tacos-ddmfs-3X2-0902-775cf5010b5b46cdbdf2ca50993628a9.jpg", "https://www.allrecipes.com/thmb/57nQ0DwByvRw-CYcZbZsGkzN8OA=/771x514/filters:no_upscale():max_bytes(150000):strip_icc():focal(929x470:931x472):format(webp)/ChefJohnsTacoStuffedZucchiniBoats4x3-6b9f773827f747d092f438faf9da0ed5.jpg"]

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
  <View key={id} style={{width: 180, paddingTop: 5}}>
    <Text>{title}</Text>
  </View>
);



const Home = ({route, navigation}) => {
  const [loading, setLoading] = React.useState('false');
  const user = route.params.user
  const apiKey = '5d5b6e0bcc9c4205b3cba5dc026a03ba'  

  function getRandomInt(max) {
    return Math.floor(Math.random() * max);
  }

  const createAlert = (errorMessage) =>
    Alert.alert('Error', errorMessage, [
      {text: 'OK', onPress: () => console.log('OK Pressed')},
  ]);

  const handleGetNewRecipes = () => {
    // Set up axios parameters for random and not
    setLoading('true')
    const intolerances = Object.keys(user.intolerances).toString()
    const dietBuilder = Object.keys(user.diet_restrictions)
    let diet = dietBuilder.toString()

    // Make random call if it doesnt include ingredients
    axios.get('https://api.spoonacular.com/recipes/random', {
      params: {
        apiKey: apiKey,
        number: 10,
        intolerances: intolerances,
        diet: diet,
      }
    })
    .then(response => {
      // Gather new data in variables
      const data = response.data.recipes 
      getRecipeDetails(data)
    })
    .catch(error => {
      console.log(error);
      setLoading('false')
    });
  };

  const getRecipeDetails = (data) => {
    setLoading('true')
    if (data.length === 0) {
      createAlert('Ooops, we cannot find any recipes matching the current requirements! Try going to your recipes page and adding some different requirements.!')
      setLoading('false')

      return 
    }    

    console.log(data.length)
    const randomIndex = getRandomInt(data.length)
    console.log('randomIndex: ', randomIndex)
    const spoonId = data[randomIndex].id
    const title = data[randomIndex].title
    const image = data[randomIndex].image

    const url = `https://api.spoonacular.com/recipes/${spoonId}/information`
    params = {
      params: {
        apiKey: apiKey,
        includeNutrition: 'True'
      }
    }

    // Call details of recipe to gather more needed data
    axios.get(url, params)
    .then(response => {
      const instructions = response.data.instructions
      const ingredients = {}
      for (ingredient of response.data.extendedIngredients) {
        ingredients[ingredient.name] = 1
      }
      const nutritionScore = Math.floor(response.data.nutrition.properties[2].amount)
      const sourceUrl = response.data.sourceUrl
      // Build dict to post to mealify_api
      const newRecipeData = {
        title: title, 
        ingredients: ingredients, 
        instructions: instructions, 
        nutritional_data: nutritionScore, 
        url: sourceUrl, 
        image: image,
        user_state: 0,
        user_id: user.id
      }
      navigation.navigate('RecipeDetails', {recipe: newRecipeData})
      setLoading('false')
    })
    .catch(error => {
      setLoading('false')
      createAlert(error)
    });
  };


  return (
    <SafeAreaView style={{flex:1}}>

      <ScrollView nestedScrollEnabled={true} horizontal={false} style={{flex:1, width: '100%', height: '100%', flexDirection: 'column', backgroundColor: '#E2C274'}}>
        <View style={styles.blob}>
          <Text style={styles.header}>Hello, {route.params.user.username}!</Text>
          <View style={{flexDirection: 'row'}}>

            <Text style={{fontSize: 52, fontWeight: 'bold', paddingHorizontal: 20, width: 315}}>What are you in the mood for?</Text>

            <TouchableOpacity 
              style={{padding: 10, borderRadius: 10, height: 40, right: 190, top: 110, textAlign: 'center', backgroundColor: '#756382'}}
              onPress={ () => { handleGetNewRecipes()} }>
              <Text style={{fontSize: 16, color: 'white'}}>Get a Recipe</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={{top: 0, backgroundColor: '#E2C274', paddingHorizontal: 30}}>
          <ScrollView nestedScrollEnabled={true} horizontal={true} style={{flex: 1, width: '100%', height: 200, paddingVertical: 15, bottom: 35, zIndex: 2}}>
            {
              recipeImages.map((each, index) => {
                return (
                  <View key={index}>
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

            <Text style={{fontSize:20, fontWeight: 'medium', paddingHorizontal: 30}}>Search for a Recipe :</Text>

            <KeyboardAvoidingView
              behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            >
              <TextInput maxLength={60} numberOfLines={3} placeholder="Healthy Quinoa Salad" style={{borderRadius: 10, paddingHorizontal: 20, backgroundColor: 'white', width: 350, alignSelf: 'center', borderColor: 'black', borderWidth: 1}}/>
            </KeyboardAvoidingView>


            <TouchableOpacity onPress={() => {console.log("calling")}} style={{padding: 10, borderRadius: 10, height: 40, width: 100, backgroundColor: '#756382', alignSelf: 'center'}}>
              <Text style={{fontSize: 16, color: 'white', textAlign: 'center'}}>Submit</Text>
            </TouchableOpacity>

            <View style={{flex:1, width: 350, height: 600, alignSelf: 'center', color: 'black', bottom: 0}}>
              <Text style={{fontSize: 20, fontWeight: 'bold'}}>Ingredients</Text>
              <FlatList
                numColumns={2}
                horizontal={false}
                data={recipeData}
                renderItem={({item}) => <Item title={item.title} id={item.id}/>}
                keyExtractor={item => item.id}
                scrollEnabled={false}
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
    fontWeight: 'medium'
  }
})

export default Home;