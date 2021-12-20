import { View, Text, Image, StyleSheet, ScrollView, Linking, Button, FlatList } from "react-native";
import React, { useEffect } from 'react';
import CustomCheckBox from "../components/CustomCheckBox";
import { updateRecipeStatus } from "../repositories/databaseRepository";
import { useDispatch } from "react-redux";
import { removeFavoriteRecipe } from "../store/actions/RecipeAction";

const RecipeDetailScreen = ({ route, navigation  }) => {

    const recipe = route.params.recipe;
    const dispatch = useDispatch();

    const removeRecipe = (id) => {
        updateRecipeStatus(id, 2).then(() => {
            dispatch(removeFavoriteRecipe(id)); 
            navigation.navigate('Saved Recipes');  
        }).catch(err => {
            console.log(err);
            navigation.navigate('Saved Recipes');  
        });
    }


    const headerComponent = () => {
        return (
            <View>
                <Text style={styles.title} >{recipe.title}</Text>
                <View style={{ alignItems: 'center', padding: 40 }}>
                    <Image style={styles.image} source={{ uri: recipe.imageUri }} />
                </View>
                <Button title="Full Recipe" onPress={() => Linking.openURL(recipe.webUri)} />
            </View>
        );
    }

    const ListFooterComponent = () => {
        return (<>
            <FlatList
                showsVerticalScrollIndicator={false}
                showsHorizontalScrollIndicator={false}
                keyExtractor={(_, index) => index.toString()}
                data={recipe.instructions}
                renderItem={({ item, index }) => (
                    <View style={styles.recipeContainer}>
                        <Text> {'\n'}</Text>
                        <Text style={styles.textHeaders}>{item.title}</Text>

                        <FlatList
                            showsVerticalScrollIndicator={false}
                            showsHorizontalScrollIndicator={false}
                            keyExtractor={(_, index) => index.toString()}
                            data={item.instructions}
                            renderItem={({ item, index }) => {
                                return (
                                    <View style={styles.recipeContainer}>
                                        <CustomCheckBox info={item} />
                                    </View>
                                )
                            }}
                        />
                    </View>
                )}
            />
        </>);

    }

    return (
        <View >
            <FlatList
                ListHeaderComponent={
                    <>
                        {headerComponent()}
                        <Text> {'\n'}</Text>
                        <Text style={styles.textHeaders}>{recipe.ingredients.length > 1 ? 'Ingredients' : ''}</Text>
                    </>
                }
                ListFooterComponent={
                    <>
                        {ListFooterComponent()}
                        <Button title="Remove" onPress={() => removeRecipe(recipe.id)}/>
                    </>
                }
                showsVerticalScrollIndicator={false}
                showsHorizontalScrollIndicator={false}
                keyExtractor={(_, index) => index.toString()}
                data={recipe.ingredients}
                renderItem={({ item, index }) => (
                    <View style={styles.recipeContainer}>
                        <CustomCheckBox info={item} />
                    </View>
                )}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    recipeContainer: {
        fontSize: 20
    },
    textHeaders: {
        textAlign: 'center',
        fontWeight: 'bold',
        textDecorationLine: 'underline'
    },
    image: {
        width: '100%',
        height: 300,
        justifyContent: 'center',
        flex: 1,
        alignItems: 'center',
        backgroundColor: 'white'
    },
    title: {
        fontSize: 50,
        textAlign: 'center',
    }
})

export default RecipeDetailScreen;