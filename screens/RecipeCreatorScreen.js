import React, { useState } from "react";
import { Button, StyleSheet, TextInput, View, FlatList, Text } from 'react-native';
import { ScrollView } from "react-native-gesture-handler";
import MultiInputModel from "../components/MultiInputModal";


const RecipeCreatorScreen = () => {

    const submitIngredients = (ingredients) => {
        setIngredients(ingredients);
    };
    const [ingredients, setIngredients] = useState([]);
    const [displayIngredientModal, setDisplayIngredientModal] = useState(false);

    const addIngredientHandler = () => {
        setDisplayIngredientModal(true);
    }

    const closeIngredientModal = () => {
        setDisplayIngredientModal(false);
    }

    const updateIngredients = (newIngredients) => {
        setIngredients(newIngredients);
    }

    return (
        <View style={styles.componentContainer} >
            <TextInput style={styles.input} placeholder='Name'></TextInput>
            <TextInput style={styles.input} placeholder='ImageUrl'></TextInput>
            <TextInput style={styles.input} placeholder='Calories'></TextInput>

            <Text>Ingredients:</Text>
            <View style={styles.recipeContainer}>
                <FlatList

                    showsVerticalScrollIndicator={false}
                    showsHorizontalScrollIndicator={false}
                    keyExtractor={(item, index) => item + index}
                    data={ingredients}
                    renderItem={itemData => (
                        <View style={styles.ingredientContainer} >
                            <Text style={styles.recipeContainer} >{itemData.item}</Text>
                        </View>
                    )}
                />
            </View>
            <Button title="Add Ingredients" onPress={addIngredientHandler} />
            <MultiInputModel updateIngredients={updateIngredients} closeIngredientModal={closeIngredientModal} displayIngredientModal={displayIngredientModal} submitIngredients={submitIngredients} ingredients={ingredients}></MultiInputModel>
                <Button title="Save Recipe" />
        </View>
    );
}

const styles = StyleSheet.create({
    componentContainer: {
        backgroundColor: 'white'
    },
    input: {
        borderColor: 'black',
        borderWidth: 1,
        padding: 10,
        textAlign: 'center',
        margin: 12,
    },
    ingredientContainer: {
        borderWidth: 1,
        margin:10,
    },

    recipeContainer: {
        fontSize: 20,
    },

    multiInput: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
    },
    text: {
        borderColor: 'black',
        borderWidth: 1,
        padding: 10,
        textAlign: 'center',
        margin: 12,
        flex: 2,

    },
    button: {
    }
});

export default RecipeCreatorScreen;
