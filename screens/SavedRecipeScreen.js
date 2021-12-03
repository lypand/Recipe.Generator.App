import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Button, TextInput, Image, FlatList } from 'react-native';
import RecipeCard from '../components/RecipeCard'
import {retrieveRecipesByUsername } from '../repositories/databaseRepository'

const SavedRecipeScreen = props => {
    const [userRecipes, setUserRecipes] = useState([]);

    useEffect(() => {
        retrieveRecipesByUsername('')
            .then((response) => {
                console.log("Retrieving Recipes By Username");
                setUserRecipes(response.rows._array);
            })
            .catch(err => {
                console.log("Failed Retrieve Recipes");
                console.log(err);
            })
    }, []);


    return (
        <View style={styles.container}>
            <FlatList
                showsVerticalScrollIndicator={false}
                showsHorizontalScrollIndicator={false}
                keyExtractor={(item) => item.id}
                data={userRecipes}
                renderItem={itemData => (
                    <View style={styles.recipeContainer}>
                        <RecipeCard recipe={itemData.item} />
                    </View>
                )}
            />
        </View>
    )
};

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

export default SavedRecipeScreen;