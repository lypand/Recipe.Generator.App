import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';

const RecipeCard = props => {
    const recipeTouchedHandler = () => {
        props.navigation.navigate('RecipeDetailScreen', { recipe: props.recipe });  
    }

    return (
        <TouchableOpacity onPress={recipeTouchedHandler}>
            <View style={styles.listItem}>
                <Image source={{ uri: props.recipe.imageUri }}
                    style={styles.image} />
                <Text>{props.recipe.title}</Text>
            </View>
        </TouchableOpacity>
    )
};

export default RecipeCard;

//#region Styles
const styles = StyleSheet.create({
    listItem: {
        borderColor: 'black',
        padding: 10,
        borderRadius: 10,
        borderWidth: 1,
        width: '100%',
        shadowColor: 'black',
        shadowRadius: 5,
        shadowOffset: {
            height: 0,
            width: 0,
        },
        shadowOpacity: .5,
        backgroundColor: 'white'

    },
    image: {
        width: 250,
        height: 250,
    }
})
//#endregion