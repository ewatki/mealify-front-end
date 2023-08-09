import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import newRecipeData from './GetRecipes';

const Recipe = () => {
    const [recipeItem, setRecipeItem] = useState({newRecipeData})

    return (
        <ScrollView>
            <View style={styles.recipeContainer}>
                <header style={styles.recipeHeader}>
                    <Card
                        image={recipeItem.image}
                        title={recipeItem.title}
                        ingredients={recipeItem.ingredients}
                        nutritional_data={recipeItem.nutritional_data}
                        url={recipeItem.url}
                    />
                </header>
            </View>
        </ScrollView>
        );
    };
        
    const styles = StyleSheet.create({
        recipeContainer: {
        width: '100%',
        padding: 10,
        },
        recipeHeader: {
        fontSize: 20,
        fontWeight: 'bold',
        },
        });
        
        

handleLikeRecipe = () => {
    const [user_state, setUser_state] = useState(1);
  };

  handleDislikeRecipe = () => {
    const [like, setLike] = useState(-1);
  };
