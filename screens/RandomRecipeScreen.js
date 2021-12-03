import React, {useEffect, useState} from "react";
import {useSelector} from 'react-redux'; 
import { View, Image, StyleSheet} from 'react-native';
import { PanGestureHandler } from 'react-native-gesture-handler';
import Animated, { useAnimatedGestureHandler, useAnimatedStyle, useSharedValue, runOnJS } from "react-native-reanimated";
import { withSpring } from "react-native-reanimated/src/reanimated2/animations";
import { insertFavorite } from "../repositories/databaseRepository";
const RandomRecipeScreen = props => {

    const allRecipes = useSelector(state => state.recipes.allRecipes); 
    const username = useSelector(state => state.user.user.username); 
    const translateX = useSharedValue(0);
    const translateY = useSharedValue(0);

    const onEnd = () => {
        const distance = Math.sqrt(translateX.value **2 + translateY.value **2); 

        if(distance >= 150 ){
            if (translateX.value < 1) {
                console.log("Yuck");
            }
            else{
                console.log("Yum this was liked by " + username);

                insertFavorite(allRecipes[0].id).then(() => {
                  }).catch(err => {
                    console.log('Insert Favorite Failed');
                    console.log(err);
                  });
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
            const distance = Math.sqrt(translateX.value **2 + translateY.value **2); 
            
            if(distance < 150 ){
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

    return (
        <View style={styles.container}>
            <PanGestureHandler onEnded={onEnd} onGestureEvent={PanGestureEvent}>
                <Animated.View
                    style={[styles.square, rStyle]}
                ><Image source={{ uri: allRecipes[0].imageUri }}
                    style={styles.image} />
                </Animated.View>
            </PanGestureHandler>
        </View>
    )
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