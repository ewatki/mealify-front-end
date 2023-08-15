import React from 'react'
import { StyleSheet, Text, View, SafeAreaView, ScrollView, Image, TouchableOpacity, TextInput, FlatList, KeyboardAvoidingView, Platform, Alert } from 'react-native';
import axios from 'axios';


const Home = ({route, navigation}) => {
  const [loading, setLoading] = React.useState('false');
  const user = route.params.user
  const apiKey = '5d5b6e0bcc9c4205b3cba5dc026a03ba'  

  let recipeImages = []
  if (user.recipes.length === 0) {
    recipeImages = ["https://spoonacular.com/recipeImages/782585-312x231.jpg", "https://spoonacular.com/recipeImages/716429-556x370.jpg", "https://www.allrecipes.com/thmb/qk2ga3zSmgDmzlwDkukcHr9AUjw=/800x533/filters:no_upscale():max_bytes(150000):strip_icc():focal(399x0:401x2):format(webp)/8382626_ZucchiniandGroundBeefSkillet4x3photobyfabeveryday-f36b3dd65e65448097aa967c7f23c880.jpg", "https://www.allrecipes.com/thmb/nYSZduxspJJeYExxpVB7miP9jXM=/364x242/filters:no_upscale():max_bytes(150000):strip_icc():focal(999x0:1001x2):format(webp)/242342-fiesta-slow-cooker-shredded-chicken-tacos-ddmfs-3X2-0902-775cf5010b5b46cdbdf2ca50993628a9.jpg", "https://www.allrecipes.com/thmb/57nQ0DwByvRw-CYcZbZsGkzN8OA=/771x514/filters:no_upscale():max_bytes(150000):strip_icc():focal(929x470:931x472):format(webp)/ChefJohnsTacoStuffedZucchiniBoats4x3-6b9f773827f747d092f438faf9da0ed5.jpg"]
  } else {
    recipeImages = user.recipes.map(recipe => {
      return recipe.image;
    });  
  };

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
    <SafeAreaView style={styles.container}>

      <ScrollView 
        nestedScrollEnabled={true} 
        horizontal={false} 
        style={styles.scrollViewContainer}>
        <View style={styles.blob}>
          <View style={styles.blobContentContainer}>

            <Text style={styles.blobQuestionText}>What are you in the mood for?</Text>

            <TouchableOpacity 
              style={styles.getRecipeButton}
              onPress={ () => { handleGetNewRecipes()} }>
              <Text style={{fontSize: 16, color: 'white'}}>Get a Recipe</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.imagesContainer}>
          <ScrollView nestedScrollEnabled={true} horizontal={true} style={styles.imagesScrollView}>
            {
              recipeImages.map((each, index) => {
                return (
                  <View key={index}>
                    <Image
                    style={styles.image}
                    source={{uri: `${each}`}}
                    resizeMode={'cover'}
                    />
                  </View>
                )
              })
            }
          </ScrollView>
        </View>
        <View style={styles.quickLinksContainer}>
            <Text style={styles.quickLinksHeader}>Quick Links</Text>
            <TouchableOpacity 
              style={styles.quickLinksButton}
              onPress={ () => {
                navigation.navigate('Pantry', {user: user})
              }}>
              <Text style={styles.buttonText}>Pantry</Text>
            </TouchableOpacity>

            <TouchableOpacity 
              style={styles.quickLinksButton}
              onPress={ () => {
                navigation.navigate('Preferences', {user: user})
              }}>
              <Text style={styles.buttonText}>Preferences</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={styles.quickLinksButton}
              onPress={ () => {
                navigation.navigate('Recipes', {user: user})
              }}>
              <Text style={styles.buttonText}>Recipes</Text>
            </TouchableOpacity>
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
    flex: 1,
    borderWidth: 1,
  },
  blobContentContainer: {
    // flexDirection: 'row'
  },
  blobQuestionText: {
    fontSize: 48, 
    fontWeight: 'bold', 
    paddingHorizontal: 20, 
    // width: 315
  },
  buttonText: {
    fontSize: 16, 
    color: 'white'
  },
  container: {
    flex:1, 
    backgroundColor: '#E2C274'
  },
  getRecipeButton: {
    padding: 10, 
    borderRadius: 10, 
    height: 40, 
    // right: 190, 
    // top: 110, 
    // textAlign: 'center', 
    justifyContent: 'center',
    backgroundColor: '#756382',
    alignContent: 'center',
  },
  image: {
    width: 150, 
    height: 170, 
    borderRadius: 20, 
    marginLeft: 10, 
    marginRight: 10
  },
  imagesContainer: {
    flex: 1,
    // top: 0, 
    // paddingHorizontal: 30,
    borderWidth: 1,
  },
  imagesScrollView: {
    flex: 1,
    width: '100%', 
    height: 200, 
    paddingVertical: 15, 
    bottom: 35, 
    zIndex: 2
  },
  quickLinksButton: {
    // flex: 1,
    // padding: 10, 
    borderRadius: 10, 
    height: 40, 
    // right: 190, 
    // top: 110, 
    // textAlign: 'center', 
    backgroundColor: '#756382',
    justifyContent: 'center',
    alignItems: 'center',
  },
  quickLinksContainer: {
    // bottom: 20, 
    height: 300, 
    // flex: 1, 
    justifyContent: 'top', 
    // gap: 10, 
    // paddingVertical: 20,
    borderWidth: 1,
    flex: 1,
  },
  quickLinksHeader: {
    fontSize:20, 
    fontWeight: 'medium', 
    paddingHorizontal: 30
  },
  scrollViewContainer: {
    flex:1, 
    // width: '100%', 
    // height: '100%', 
    // flexDirection: 'column', 
    // backgroundColor: '#E2C274'
  }
})

export default Home;