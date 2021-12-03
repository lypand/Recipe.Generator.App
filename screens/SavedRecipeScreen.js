import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Button, TextInput, Image, FlatList } from 'react-native';
import RecipeCard from '../components/RecipeCard'
import {retrieveFavorites } from '../repositories/databaseRepository'
import {useSelector} from 'react-redux'; 

const SavedRecipeScreen = props => {
    const [userRecipes, setUserRecipes] = useState([]);
    const username = useSelector(state => state.user.user.username); 

    useEffect(() => {
        retrieveFavorites()
            .then((response) => {
                console.log("Retrieving Recipes for " + username);
                setUserRecipes(response.rows._array);
            })
            .catch(err => {
                console.log("Failed Retrieve Recipes");
                console.log(err);
            })
    }, []);

    const testingButton = () => {
        retrieveFavorites()
        .then((response) => {
            console.log(response); 
            setUserRecipes(response.rows._array);
        })
        .catch(err => {
            console.log("Failed Retrieve Recipes");
            console.log(err);
        })
    }
    return (
        <View style={styles.container}>
            <Button title='Load' onPress={testingButton}/>
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