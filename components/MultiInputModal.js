import React, { useState } from 'react';
import { Modal, Text, FlatList, View, StyleSheet, TextInput,Button } from 'react-native'

const MultiInputModel = props => {
    const [currentIngredient, setCurrentIngredient] = useState('');
    const [ingredients, setIngredients] = useState([]);

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

export default MultiInputModel;