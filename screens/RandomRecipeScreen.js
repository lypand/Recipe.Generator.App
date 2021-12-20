import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { View, Image, StyleSheet, Text, Alert, Dimensions } from 'react-native';
import { PanGestureHandler } from 'react-native-gesture-handler';
import Animated, { useAnimatedGestureHandler, useAnimatedStyle, useSharedValue } from "react-native-reanimated";
import { withSpring } from "react-native-reanimated/src/reanimated2/animations";
import { updateRecipeStatus, getRecipesByStatus } from "../repositories/databaseRepository";
import { addFavoriteRecipe, placeAllUnseenRecipesIntoState, removeUnseenRecipe } from "../store/actions/RecipeAction";
import Recipe from "../Models/Recipe";

const RandomRecipeScreen = props => {

    const unSeenRecipes = useSelector(state => state.recipes.unSeenRecipes.unSeenRecipes);
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
                        <View>
                            <Image source={{ uri: unSeenRecipes.length >= 0 ? unSeenRecipes[currentIndex].imageUri : '' }}
                                style={styles.image} />
                            <Text numberOfLines = {2} adjustsFontSizeToFit = {true} style={styles.text}>{unSeenRecipes[currentIndex].title}</Text>
                        </View>
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
        backgroundColor: 'silver',
    },
    image: {
        width: '95%',
        height: '95%',
        marginLeft:'2.5%',
        marginBottom:'10%',
        borderRadius: 20,
        borderColor: 'black',
        borderWidth:5,
    },
    text: {
        flex:1,
        position: 'absolute',
        backgroundColor:'rgba(220,220,220,0.8)',
        alignSelf:'center',
        justifyContent: 'center',
        textAlign:'center',
        marginTop:'130%',
        marginBottom:'-75%',
        width:'90%',
        height:30,
        fontSize:20,
        borderWidth:5,
        borderRadius:10,
        borderColor: 'gray',
        fontWeight:'bold',
        overflow: 'hidden',
    }
})
//#endregion

export default RandomRecipeScreen;