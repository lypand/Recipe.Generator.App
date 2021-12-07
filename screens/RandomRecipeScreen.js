import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { View, Image, StyleSheet, Text } from 'react-native';
import { PanGestureHandler } from 'react-native-gesture-handler';
import Animated, { useAnimatedGestureHandler, useAnimatedStyle, useSharedValue, runOnJS } from "react-native-reanimated";
import { withSpring } from "react-native-reanimated/src/reanimated2/animations";
import { updateRecipeStatus, getRecipesByStatus } from "../repositories/databaseRepository";
import { addFavoriteRecipe, placeAllUnseenRecipesIntoState } from "../store/actions/RecipeAction";

const RandomRecipeScreen = props => {

    const allRecipes = useSelector(state => state.recipes.unSeenRecipes.unSeenRecipes);
    const username = useSelector(state => state.user.user.username);
    const [currentIndex, setCurrentIndex] = useState(0);
    const translateX = useSharedValue(0);
    const translateY = useSharedValue(0);
    const [isLoading, setIsLoading] = useState(true);

    const dispatch = useDispatch();

    useEffect(() => {
        getRecipesByStatus(0)
            .then((response) => {
                //console.log(response.rows._array);
                dispatch(placeAllUnseenRecipesIntoState(response.rows._array));
            })
            .catch(err => {
                console.log(err);
            })
    }, []);

    useEffect(() => {
        console.log(allRecipes.length);
        //setIsLoading(false);
    }, [allRecipes]);

    const onEnd = () => {
        const distance = Math.sqrt(translateX.value ** 2 + translateY.value ** 2);

        if (distance >= 150) {
            if (translateX.value < 1) {
                updateRecipeStatus(allRecipes[currentIndex].id, 2).then(() => {
                }).catch(err => {
                    console.log(err);
                });
            }
            else {
                console.log("Yum this was liked by " + username);

                updateRecipeStatus(allRecipes[currentIndex].id, 1).then(() => {
                    dispatch(addFavoriteRecipe(allRecipes[currentIndex]));
                }).catch(err => {
                    console.log(err);
                });
            }

            translateX.value = 0;
            translateY.value = 0;
            setCurrentIndex(currentIndex < allRecipes.length ? currentIndex + 1 : 0);
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
    if (isLoading && allRecipes.length < 1) {
        return (<Text>Loading...</Text>);
    }else{
        return (
            <View style={styles.container}>
                <PanGestureHandler onEnded={onEnd} onGestureEvent={PanGestureEvent}>
                    <Animated.View
                        style={[styles.square, rStyle]}>
                        <Image source={{ uri: allRecipes.length >= 0 ? allRecipes[currentIndex].imageUri : '' }}
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