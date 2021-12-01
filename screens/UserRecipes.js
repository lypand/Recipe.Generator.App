import React from "react";
import { View, Text, StyleSheet, Button, TextInput, Image, FlatList } from 'react-native';
import RecipeCard from '../components/RecipeCard'
const UserRecipes = props => {
    return (
        <View style={styles.container}>
            <FlatList
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}
                keyExtractor={(item) => item.id}
                data={props.userRecipes}
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

export default UserRecipes;