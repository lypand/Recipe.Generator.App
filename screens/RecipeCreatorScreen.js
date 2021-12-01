import React from "react";
import {StyleSheet, TextInput, View } from 'react-native'; 


const RecipeCreatorScreen = () => {
    return(
         <View style={styles.input}>
            <TextInput placeholder='Name'></TextInput>
            <TextInput placeholder='ImageUrl'></TextInput>
            <TextInput placeholder='Calories'></TextInput>
            <TextInput placeholder='Ingredients'></TextInput>
            <TextInput placeholder='Instructions'></TextInput>
            <TextInput></TextInput>
        </View>
    ); 
}

const styles = StyleSheet.create({
    input: {
        borderBottomColor: 'black', 
        borderBottomWidth: 10, 
    }
}); 

export default RecipeCreatorScreen; 
