import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Button, TextInput, Image, FlatList } from 'react-native';
import RecipeCard from '../components/RecipeCard'
import { useSelector, useDispatch } from 'react-redux';
import { useIsFocused } from '@react-navigation/native';
import { getRecipesByStatus } from "../repositories/databaseRepository";
import { addFavoriteRecipes } from "../store/actions/RecipeAction";
import Recipe from "../Modles/Recipe";

const SavedRecipeScreen = props => {
    const [userRecipes, setUserRecipes] = useState([]);
    const favoriteRecipes = useSelector(state => state.recipes.favoriteRecipes.favorites);

    const isFocused = useIsFocused();
    const dispatch = useDispatch(); 

    useEffect(() => {
        setUserRecipes(favoriteRecipes);
        getRecipesByStatus(1)
            .then((response) => {
                const recipesToAdd = []; 
                for (const recipe of response.rows._array) {
                    recipesToAdd.push(new Recipe(recipe.id, recipe.title, recipe.imageUri, recipe.webUri));
                  }
                  console.log(recipesToAdd); 
                  dispatch(addFavoriteRecipes(recipesToAdd));
            })
            .catch(err => {
                console.log(err);
            }) 
    }, []);

    const load = () => {
        console.log(favoriteRecipes);
        setUserRecipes(['']); 
    }

    return (
        <View style={styles.container}>
            <Button title="load" onPress={load} />
            <FlatList
                showsVerticalScrollIndicator={false}
                showsHorizontalScrollIndicator={false}
                keyExtractor={(item) => item.id}
                data={favoriteRecipes}
                renderItem={itemData => (
                    <View style={styles.recipeContainer}>
                        <RecipeCard navigation={props.navigation} recipe={itemData.item} />
                    </View>
                )}
            />
        </View>
    )
};

export default SavedRecipeScreen;

//#region Styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
        alignItems: 'center',
        width: '100%'
    },
    recipeContainer: {
        padding: 10,
    }
});
//#endregion
