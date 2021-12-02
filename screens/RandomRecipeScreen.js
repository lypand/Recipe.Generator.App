import React from "react";
import { View, Button, Image, Touchable, StyleSheet, TouchableOpacityBase, Alert } from 'react-native';
import { PanGestureHandler } from 'react-native-gesture-handler';
import Animated, { useAnimatedGestureHandler, useAnimatedStyle, useSharedValue } from "react-native-reanimated";
import { withSpring } from "react-native-reanimated/src/reanimated2/animations";


const RandomRecipeScreen = props => {

    const translateX = useSharedValue(0);
    const translateY = useSharedValue(0);

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
            }else{
                if (event.translationX < 1) {
                    console.log("Left");
                }
                if (event.translationX > 1) {
                    console.log("Right");
                }
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

    return (
        <View style={styles.container}>
            <PanGestureHandler onGestureEvent={PanGestureEvent}>
                <Animated.View
                    style={[styles.square, rStyle]}
                ><Image source={{ uri: 'https://imagesvc.meredithcorp.io/v3/mm/image?url=https%3A%2F%2Fstatic.onecms.io%2Fwp-content%2Fuploads%2Fsites%2F44%2F2019%2F08%2F26230657%2F6474212.jpg' }}
                    style={styles.image} />
                </Animated.View>
            </PanGestureHandler>
        </View>
    )
}


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

export default RandomRecipeScreen;