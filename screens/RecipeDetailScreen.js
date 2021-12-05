import { View, Text, Image, StyleSheet, ScrollView, Linking, Button } from "react-native";
import React, { useEffect } from 'react';

const RecipeDetailScreen = ({ route }) => {

    const recipe = route.params.recipe;

    return (
        <ScrollView>
            <View >
                <Text style={styles.title} >{recipe.title}</Text>
                <View style={{ alignItems: 'center', padding: 40 }}>
                    <Image style={styles.image} source={{ uri: recipe.imageUri }} />
                </View>
                <Button title="Full Recipe" onPress={() => Linking.openURL(recipe.webUri)}/> 
                <Text>Ingredients</Text>
                <Text>Instructions</Text>
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    image: {
        width: '100%',
        height: 300,
        justifyContent: 'center',
        flex: 1,
        alignItems: 'center',
        backgroundColor: 'red'
    },
    title: {
        fontSize: 50,
        textAlign: 'center',
        fontWeight: 'bold',
    }
})

export default RecipeDetailScreen;