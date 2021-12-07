import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Button, TextInput, Image, FlatList } from 'react-native';
import RecipeCard from '../components/RecipeCard'
import { useSelector } from 'react-redux';
import { useIsFocused } from '@react-navigation/native';

const SavedRecipeScreen = props => {
    const [userRecipes, setUserRecipes] = useState([]);
    const favoriteRecipes = useSelector(state => state.recipes.favoriteRecipes)
    const isFocused = useIsFocused();

    useEffect(() => {
        setUserRecipes(favoriteRecipes.favorites);
    }, [isFocused]);

    return (
        <View style={styles.container}>
            <FlatList
                showsVerticalScrollIndicator={false}
                showsHorizontalScrollIndicator={false}
                keyExtractor={(item) => item.id}
                data={userRecipes}
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
