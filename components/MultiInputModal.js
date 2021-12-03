import React, { useState } from 'react';
import { Modal, Text, FlatList, View, StyleSheet, TextInput,Button } from 'react-native'
import { useSelector, useDispatch } from "react-redux";
import { updateCustomerRecipe } from "../store/actions/CustomRecipeAction";

const MultiInputModel = props => { 
    const [currentIngredient, setCurrentIngredient] = useState('');
    const [ingredients, setIngredients] = useState([]);

    const customRecipe = useSelector(state => state.customRecipe.customRecipe);

    const dispatch = useDispatch(); 

    const updateRecipe = () => {
        dispatch(updateCustomerRecipe(customRecipe)); 
    }

    const submitHandler = () => {
        setIngredients([...ingredients, currentIngredient]);
        setCurrentIngredient('');
    }

    const closeScreen = () => {
        props.closeIngredientModal(); 
        props.updateIngredients(ingredients); 
    }

    return (
        <Modal visible={props.displayIngredientModal}>
            <Button title="Update custom recipe test" onPress={updateRecipe}/>
            <TextInput 
            onChangeText={(currentIngredient) => setCurrentIngredient(currentIngredient)} 
            value={currentIngredient} style={styles.input} 
            onSubmitEditing={submitHandler} 
            placeholder='Ingredient'/>

            <Text>{props.displayIngredientModal}</Text>
            <FlatList
                showsVerticalScrollIndicator={false}
                showsHorizontalScrollIndicator={false}
                keyExtractor={(item, index) => item + index}
                data={ingredients}
                renderItem={itemData => (
                    <View style={styles.recipeContainer}>
                        <Text>{'\u2022'}</Text>
                        <Text style={{ flex: 1, paddingLeft: 5 }}>{itemData.item}</Text>
                    </View>
                )}
            />
            <Button onPress={closeScreen} title='Complete'></Button>
        </Modal>
    )
}

export default MultiInputModel;

//#region Styles
const styles = StyleSheet.create({
    recipeContainer: {
        flexDirection: 'row'
    },
    input: {
        borderColor: 'black',
        borderWidth: 1,
        padding: 10,
        margin: 12,
    },
});
//#endregion