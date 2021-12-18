import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { updateCustomerRecipe } from "../store/actions/CustomRecipeAction";
import { Button, StyleSheet, TextInput, View, FlatList, Text, ScrollView, Alert } from 'react-native';
import MultiInputModel from "../components/MultiInputModal";
import { insertRecipe, reset } from "../repositories/databaseRepository";
import { addFavoriteRecipe } from "../store/actions/RecipeAction";
import Recipe from "../Models/Recipe";

const CustomRecipeScreen = () => {

    const [currentIngredient, setCurrentIngredient] = useState('');
    const [currentInstruction, setCurrentInstruction] = useState('');
    const [title, setTitle] = useState('');
    const [imageUri, setImageUri] = useState('');
    const [webUri, setWebUri] = useState('');
    const [ingredients, setIngredients] = useState([]);
    const [instructions, setInstructions] = useState([]);

    const dispatch = useDispatch();

    const saveRecipe = () => {
        insertRecipe(title, imageUri, '', 1).then((response) => {
            dispatch(addFavoriteRecipe(new Recipe(response.insertId, title, imageUri, webUri)));
            Alert.alert('Recipe Saved to Favorites')
            resetPage(); 
        }).catch(err => {
            console.log(err);
        });
    }

    const resetPage = () => {
        setTitle(''); 
        setImageUri(''); 
        setWebUri(''); 
        setIngredients([]); 
        setInstructions([]); 
    }

    //#region Methods
    const addInstruction = () => {
        setInstructions([...instructions, currentInstruction]);
        setCurrentInstruction('');
    }

    const removeInstruction = (index, itemData) => {
        var copyOfInstructions = [...instructions];
        copyOfInstructions.splice(index, 1);
        setInstructions(copyOfInstructions);
    }

    const addIngredient = () => {
        setIngredients([...ingredients, currentIngredient]);
        setCurrentIngredient('');
    }

    const removeIngredient = (index, itemData) => {
        var copyOfIngredients = [...ingredients];
        copyOfIngredients.splice(index, 1);
        setIngredients(copyOfIngredients);
    }
    //#endregion

    return (
        <View style={styles.componentContainer} >
            <FlatList
                ListHeaderComponent={
                    <>
                        <Button onPress={saveRecipe} title="Save Recipe" />
                        <TextInput onChangeText={(text) => setTitle(text)} value={title}  style={styles.input} placeholder='Title'></TextInput>
                        <TextInput onChangeText={(text) => setImageUri(text)} value={imageUri}  style={styles.input} placeholder='ImageUrl'></TextInput>
                        <TextInput onChangeText={(text) => setWebUri(text)} value={webUri}  style={styles.input} placeholder='WebUri'></TextInput>

                        <Text style={styles.textHeaders}>Ingredients</Text>
                        <TextInput onSubmitEditing={addIngredient} onChangeText={(text) => setCurrentIngredient(text)} value={currentIngredient} style={styles.input} placeholder='Add Ingredient'></TextInput>
                    </>
                }
                ListFooterComponent={
                    <>
                        <Text style={styles.textHeaders}>Instructions</Text>
                        <TextInput onSubmitEditing={addInstruction} onChangeText={(text) => setCurrentInstruction(text)} value={currentInstruction} style={styles.input} placeholder='Add Instruction'></TextInput>
                        <FlatList
                            showsVerticalScrollIndicator={false}
                            showsHorizontalScrollIndicator={false}
                            keyExtractor={(_, index) => index.toString()}
                            data={instructions}
                            renderItem={({ item, index }) => (
                                <View style={styles.recipeContainer}>
                                    <Text>{item}</Text>
                                    <Button title="Remove" onPress={() => removeInstruction(index, item)} />
                                </View>
                            )}
                        />
                    </>}
                showsVerticalScrollIndicator={false}
                showsHorizontalScrollIndicator={false}
                keyExtractor={(_, index) => index.toString()}
                data={ingredients}
                renderItem={({ item, index }) => (
                    <View style={styles.recipeContainer}>
                        <Text>{item}</Text>
                        <Button title="Remove" onPress={() => removeIngredient(index, item)} />
                    </View>
                )}
            />
        </View>
    );
}

export default CustomRecipeScreen;

//#region Styles
const styles = StyleSheet.create({
    componentContainer: {
        backgroundColor: 'white',
        flex: 1,
    },
    input: {
        borderColor: 'black',
        borderWidth: 1,
        padding: 10,
        textAlign: 'center',
        margin: 12,
    },
    textHeaders: {
        textAlign: 'center'
    },
    ingredientContainer: {
        borderWidth: 1,
        margin: 10,
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
//#endregion
