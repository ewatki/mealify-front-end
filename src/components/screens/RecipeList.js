import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, ScrollView, Linking } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const RecipeList = ({ recipes, navigation }) => {
    
    if (recipes.length === 0) {
        recipes = [{
            "image": "https://spoonacular.com/recipeImages/663227-312x231.jpg",
            "ingredients": {
                "baby spinach": 1,
                "baguette smothered in my pistachio pesto": 1,
                "basil": 1,
                "bay leaf": 1,
                "canned tomatoes": 1,
                "cannellini beans": 1,
                "carrots": 1,
                "celery": 1,
                "chicken broth": 1,
                "garlic": 1,
                "olive oil": 1,
                "onion": 1,
                "pancetta": 1,
                "parmesan cheese": 1,
                "pepper falkes": 1,
                "pesto": 1,
                "pinot grigio": 1,
                "quinoa": 1,
                "russet potato": 1,
                "salt and pepper": 1,
                "thyme": 1
            },
            "instructions": "Start by prepping your pancetta and vegetables. Cut the pancetta into medium sized chunks (larger than bite sized, because they'll cook down in the pan) and roughly chop some carrots and celery. Then peel and chop a large russet potato. I keep these chunks larger, because they break down a lot in the soup.\nNext, dice some yellow onion and mince some garlic.\nThrow the olive oil in a large stock (or soup) pot and let it warm up over medium heat.\nOnce warm, add in the pancetta and cook over medium heat for 5 minutes. Stir occasionally, until lightly browned.\nThen, add the onions, carrots, celery, and potato to the pot and cook for medium heat for 8 minutes, or until the vegetables begin to soften. Again, stir occasionally. In the last 30 - 60 seconds, add in the garlic, dried thyme, dried basil, and red pepper flakes.\nNow add in the canned tomatoes, chicken broth, and a bay leaf. Give it a quick stir and season with salt and pepper. Don't season too aggressively, because the pancetta and chicken broth already have salt. You can add more later on, if necessary!\nBring the soup to a boil over high heat. Once boiling, lower to medium and simmer uncovered for 10-12 minutes.\nThen add in the dry quinoa and cook for another 15 minutes, or until the vegetables are tender and the quinoa is cooked.\nNow discard the bay leaf and add in the beans, white wine, and pesto.\nRemove the soup from the heat and stir in the baby spinach.\nRe-season with salt and pepper and place back on the stove to warm it back up, if necessary!\nServe immediately with an optional sprinkle of shredded parmesan cheese and a side of crusty baguette smothered in pesto!",
            "nutritional_data": 36,
            "title": "The Best Quinoa Minestrone",
            "url": "https://www.foodista.com/recipe/2KN7GQSY/the-best-quinoa-minestrone",
            "user_id": 0,
            "user_state": 0
        },
        {
            "image": "https://spoonacular.com/recipeImages/653686-312x231.jpg",
            "ingredients": {
                "chicken broth": 1,
                "ears of corn": 1,
                "garlic cloves": 1,
                "lemon": 1,
                "old bay seasoning": 1,
                "onion": 1,
                "paprika": 1,
                "parsley flakes": 1,
                "pepper": 1,
                "pepper flakes": 1,
                "potatoes": 1,
                "shrimp": 1,
                "springs of thyme": 1,
                "water": 1
            },
            "instructions": "<ol><li>Shuck and clean corn. Halve the corn. Quarter the onion, cutting so the root remains intact. Peel garlic. Cut potatoes into quarters and then each piece in half one more time. Place corn, potatoes, onion and garlic in a large stockpot.</li><li>Add chicken broth and spices. Add water to just cover the potatoes. Bring to a boil and cover with the lid slightly ajar. Simmer for 20 minutes, or until potatoes are fork tender.</li><li>Scoop out all contents onto a large platter or plate. Pour some of the broth over the mixture. Garnish with lemon juice and more old bay seasoning. ENJOY!</li></ol>",
            "nutritional_data": 46,
            "title": "One Pot Meal: Shrimp Boil",
            "url": "http://www.foodista.com/recipe/YGK2GLCZ/one-pot-meal-shrimp-boil",
            "user_id": 0,
            "user_state": 0
        },
        {
            "image": "https://spoonacular.com/recipeImages/634751-312x231.jpg",
            "ingredients": {
                "ancho chilis in adobo sauce": 1,
                "apple cider vinegar": 1,
                "beef brisket": 1,
                "brown sugar": 1,
                "cayenne pepper": 1,
                "chilis in adobo sauce": 1,
                "cracked pepper": 1,
                "cracked peppers": 1,
                "dijon mustard": 1,
                "garlic": 1,
                "ground cumin": 1,
                "honey": 1,
                "ketchup": 1,
                "kosher salt - plus any additional at end": 1,
                "lager": 1,
                "onions": 1,
                "pan drippings from the brisket": 1,
                "paprika": 1,
                "pepper flakes": 1,
                "salt": 1
            },
            "instructions": "In a food processor or blender, finely chop garlic. Add brown sugar, honey, mustard, ancho chili in adobo, mustard, oil, black pepper, cumin, paprika, cayenne and 2 tbs salt and process until smooth. Rub all over the brisket making sure to get into the nooks and crannies. Place brisket in a gallon size freezer bag  or if unable to fit into bag  wrap well with plastic wrap and put in the refrigerator x 1-2 days.\nAllow brisket to come to room temp ( about an hour) before preparing. Preheat oven to 325. Separate and scatter onions in a large baking dish or roasting pan. Set brisket (fat side up) on top of the onions. Add beer to pan and any marinade the clings to the plastic wrap. Cover and seal with foil tightly. Braise in the oven until the meat is fall apart tender  about 5 hours. Begin to check after 4 hours. Meat should literally be falling apart when you stick it with a fork. When done, set oven to broil and broil for 5-10 minutes until top develops a crispy crust.\nAllow brisket to cool for at least 10 minutes, remove from the pan and shred or slice. Remove the onions with a slotted spoon and mix into the brisket. Moisten with pan drippings and season with salt if needed.\nFor the Sauce\nIn a medium sauce pan over medium heat, add the pan drippings or olive oil and saut the onions until soft  5-7 minutes. Add the garlic and cook one minute longer,. Add the beer, bring to a boil and cook until reduced by half  about 10 minutes or so.\nAdd in the remaining ingredients and heat through.\nPlace sauce in a food processor or blender and puree until smooth. Can use immediately or can be refrigerated until ready to use.",
            "nutritional_data": 29,
            "title": "Beer Braised Brisket with Ding Dang Good Sauce",
            "url": "https://www.foodista.com/recipe/ZHWLZF5L/beer-braised-brisket-with-ding-dang-good-sauce",
            "user_id": 0,
            "user_state": 0,
        }];
    }

    return (
        <SafeAreaView style={styles.container}>           
            <ScrollView 
                nestedScrollEnabled={true} 
                horizontal={true}>
                {recipes.map((recipe) => {
                    return (
                        <View style={styles.recipeContainer} key={recipe.id}>
                            <View style={styles.recipeTitleContainer}>
                                <TouchableOpacity onPress={() => {
                                    Linking.openURL(recipe.url);
                                    }}>
                                    <Text style={styles.recipeTitleText}>
                                        {recipe.title}
                                    </Text>
                                </TouchableOpacity>
                            </View>
                            <View>
                                <TouchableOpacity 
                                    onPress={ () => {navigation.navigate('RecipeDetails', {recipe: recipe})}}>
                                    <Image style={styles.recipeImg}
                                    source={{uri: recipe.image}}
                                    />
                                </TouchableOpacity>
                            </View>
                        </View>
                    );
                })}
            </ScrollView>
        </SafeAreaView>
    )
}

export default RecipeList;

const styles = StyleSheet.create({
    container: {
        flex:1,
        padding: -50,
        backgroundColor: 'white',
        // borderRadiusBo: 40,
        width: '100%',
        borderBottomLeftRadius: 40,
        borderBottomRightRadius: 40,
        paddingBottom: 0,
        alignItems: 'center',
    },
    recipeContainer: {
        paddingLeft: 10,
        paddingRight: 10,
        paddingTop: 10,
    },
    recipeTitleContainer: {
        width:175, 
        flexGrow: 1,
        flex: 1,
    },
    recipeTitleText: {
        fontFamily: 'Avenir-Roman',
        fontWeight: 'bold',
        fontSize: 20,
        flexShrink: 1,
    },
    recipeImg: {
        width:175,
        height: 195,
        borderRadius: 10, 
    }
 });