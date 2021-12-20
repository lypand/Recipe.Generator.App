import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { View, Image, StyleSheet, Text, Alert } from 'react-native';
import { PanGestureHandler } from 'react-native-gesture-handler';
import Animated, { useAnimatedGestureHandler, useAnimatedStyle, useSharedValue } from "react-native-reanimated";
import { withSpring } from "react-native-reanimated/src/reanimated2/animations";
import { updateRecipeStatus, getRecipesByStatus } from "../repositories/databaseRepository";
import { addFavoriteRecipe, placeAllUnseenRecipesIntoState, removeUnseenRecipe } from "../store/actions/RecipeAction";
import Recipe from "../Models/Recipe";

const RandomRecipeScreen = props => {

    const unSeenRecipes = useSelector(state => {
        return state.recipes.unSeenRecipes.unSeenRecipes
    });
    const username = useSelector(state => state.user.user.username);
    const [currentIndex, setCurrentIndex] = useState(0);
    const translateX = useSharedValue(0);
    const translateY = useSharedValue(0);

    const dispatch = useDispatch();

    useEffect(() => {
        getRecipesByStatus(0)
            .then((response) => {
                dispatch(placeAllUnseenRecipesIntoState(response.rows._array));
            })
            .catch(err => {
                console.log(err);
            })
    }, []);

    useEffect(() => {
        console.log(unSeenRecipes.length);
    }, [unSeenRecipes]);

    const onEnd = () => {
        const distance = Math.sqrt(translateX.value ** 2 + translateY.value ** 2);

        if (distance >= 150) {
            if (translateX.value < 1) {
                updateRecipeStatus(unSeenRecipes[currentIndex].id, 2).then(() => {
                }).catch(err => {
                    console.log(err);
                });
            }
            else {
                console.log("Yum this was liked by " + username);

                updateRecipeStatus(unSeenRecipes[currentIndex].id, 1).then(() => {
                    dispatch(removeUnseenRecipe(unSeenRecipes[currentIndex]));
                    dispatch(addFavoriteRecipe(new Recipe(unSeenRecipes[currentIndex].id, unSeenRecipes[currentIndex].title, unSeenRecipes[currentIndex].webUri, unSeenRecipes[currentIndex].imageUri, '', '', '','', '', '', JSON.parse(unSeenRecipes[currentIndex].ingredients), JSON.parse(unSeenRecipes[currentIndex].instructions))));
                }).catch(err => {
                    console.log(err);
                });
            }

            translateX.value = 0;
            translateY.value = 0;

            if (unSeenRecipes.length < 1) {
                Alert.alert("No more unseen recipes");
            } else {
                setCurrentIndex(unSeenRecipes.length > 1 ? Math.floor(Math.random() * unSeenRecipes.length - 1) : 0);
            }
        }
    }

    //#region Methods
    const PanGestureEvent = useAnimatedGestureHandler({
        onStart: (event, context) => {
            context.translateX = translateX.value
            context.translateY = translateY.value
        },
        onActive: (event, context) => {
            translateX.value = event.translationX + context.translateX;
            translateY.value = event.translationY + context.translateY;
        },
        onEnd: (event, context) => {
            const distance = Math.sqrt(translateX.value ** 2 + translateY.value ** 2);

            if (distance < 150) {
                translateX.value = withSpring(0);
                translateY.value = withSpring(0);
            }
        },
    })

    const rStyle = useAnimatedStyle(() => {
        return {
            transform: [
                {
                    translateX: translateX.value
                },
                {
                    translateY: translateY.value
                },
            ],
        };
    });

    //#endregion
    if (unSeenRecipes.length < 1) {
        return (<Text>Loading...</Text>);
    } else {
        return (
            <View style={styles.container}>
                <PanGestureHandler onEnded={onEnd} onGestureEvent={PanGestureEvent}>
                    <Animated.View
                        style={[styles.square, rStyle]}>
                        <Image source={{ uri: unSeenRecipes.length >= 0 ? unSeenRecipes[currentIndex].imageUri : '' }}
                            style={styles.image} />
                    </Animated.View>
                </PanGestureHandler>
            </View>
        )
    }
}


//#region Styles
const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: '100%',
    },
    image: {
        width: '100%',
        height: '100%',

    }
})
//#endregion

export default RandomRecipeScreen;