import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Button, TextInput, Image, FlatList } from 'react-native';
import RecipeCard from '../components/RecipeCard'
import { useSelector, useDispatch } from 'react-redux';
import { useIsFocused } from '@react-navigation/native';
import { getRecipesByStatus } from "../repositories/databaseRepository";
import { addFavoriteRecipes } from "../store/actions/RecipeAction";
import Recipe from "../Models/Recipe";

const SavedRecipeScreen = props => {
    const isFocused = useIsFocused();

    const favoriteRecipes = useSelector(state => {        
        //console.log(filterInput ? filterInput.forEach(element => console.log(element)) : '');
        //console.log(state.recipes.favoriteRecipes.favorites); 
        return state.recipes.favoriteRecipes.favorites
    });
    const [filterInput, setFilterInput] = useState(favoriteRecipes);
    const [filterText, setFilterText] = useState('');
    const dispatch = useDispatch();

    useEffect(() => {
        if(isFocused === true){
            setFilterInput(favoriteRecipes);
            setFilterText(''); 
        }
    }, [isFocused]); 

    useEffect(() => {
        if(favoriteRecipes.length < 2) {
        getRecipesByStatus(1)
            .then((response) => {
                const recipesToAdd = [];
                for (const recipe of response.rows._array) {
                    recipesToAdd.push(new Recipe(recipe.id, recipe.title, recipe.webUri, recipe.imageUri, '', '', '', '', '', '', JSON.parse(recipe.ingredients), JSON.parse(recipe.instructions)));
                }
                setFilterInput(recipesToAdd.concat(favoriteRecipes));
                dispatch(addFavoriteRecipes(recipesToAdd));
            })
            .catch(err => {
                console.log(err);
            })
        }
    }, []);


    const filter = (inputText) => {
        setFilterText(inputText); 
        if (inputText === '') {
            setFilterInput(favoriteRecipes);
            return;
        }
        setFilterInput(favoriteRecipes.filter((item) => executeFilter(item, inputText)));
    }

    const executeFilter = (item, inputText) => {
        if (item.title.toLowerCase().includes(inputText.toLowerCase())) {
            return true;
        }

        for (let i = 0; i < item.ingredients.length; i++) {
            if (item.ingredients[i].toLowerCase().includes(inputText.toLowerCase())) {
                return true;
            }
        }
        return false;
    }

    const ages = [32, 33, 16, 40];
    const result = ages.filter(checkAdult);

    function checkAdult(age) {
        return age >= 18;
    }


    function checkAdult(age) {
        return age >= 18;
    }

    if (favoriteRecipes.length < 1) {
        return (<View><Text>No Recipes Saved Yet!</Text></View>)
    } else {
        return (
            <View style={styles.container}>
                <TextInput value={filterText} style={styles.input} placeholder="search" onChangeText={(input) => filter(input)}></TextInput>
                <FlatList
                    showsVerticalScrollIndicator={false}
                    showsHorizontalScrollIndicator={false}
                    keyExtractor={(item) => item.id}
                    data={filterInput}
                    renderItem={itemData => (
                        <View style={styles.recipeContainer}>
                            <RecipeCard navigation={props.navigation} recipe={itemData.item} />
                        </View>
                    )}
                />
            </View>
        )
    };
}

export default SavedRecipeScreen;

//#region Styles
const styles = StyleSheet.create({
    input: {
        borderWidth: 1,
        width: '80%'
    },
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
