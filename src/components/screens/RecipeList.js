import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, ScrollView, Linking } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const RecipeList = ({ recipes, navigation }) => {
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
        borderRadius: 10,
        paddingBottom: -22,
    },
    recipeContainer: {
        paddingLeft: 10,
        paddingRight: 10,
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