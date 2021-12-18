import { View, Text, Image, StyleSheet, ScrollView, Linking, Button, FlatList } from "react-native";
import React, { useEffect } from 'react';
import CustomCheckBox from "../components/CustomCheckBox";

const RecipeDetailScreen = ({ route }) => {

    const recipe = route.params.recipe;

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
                        <Text style={styles.textHeaders}>Ingredients</Text>

                    </>
                }
                ListFooterComponent={
                    <>
                        {ListFooterComponent()}
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
        backgroundColor: 'red'
    },
    title: {
        fontSize: 50,
        textAlign: 'center',
    }
})

export default RecipeDetailScreen;