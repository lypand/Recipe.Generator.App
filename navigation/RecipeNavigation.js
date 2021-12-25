import SavedRecipeScreen from '../screens/SavedRecipeScreen'; '../screens/SavedRecipeScreen';
import RandomRecipeScreen from '../screens/RandomRecipeScreen';
import LoginScreen from '../screens/LoginScreen';
import CustomRecipeScreen from '../screens/CustomRecipeScreen'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import { Ionicons, Entypo, FontAwesome5, SimpleLineIcons } from '@expo/vector-icons';
import RecipeDetailScreen from '../screens/RecipeDetailScreen';
import { sendEmail } from '../components/Email';
const BottomTab = createBottomTabNavigator();
const Stack = createStackNavigator();

const StackRoot = () => {

    // example.js

const sendEmailHandler = () => {
    sendEmail(
        'recipescraperresults@gmail.com',
        'Inquiry!',
        'Insert your questions, new feature ideas, and comments below!'
    ).then(() => {
    });
} 


    return (
        <Stack.Navigator
            screenOptions={{
                headerRight:() => (
                    <SimpleLineIcons onPress={sendEmailHandler} style={{marginRight:10}} name="question" size={24} color='white' >
                        
                    </SimpleLineIcons>
                ),
                headerTintColor: 'white',
                gestureEnabled: false,
                headerStyle: {
                    backgroundColor: 'rgba(170,170,170,0.7)'
                }
            }}>
            <Stack.Screen
                name="LoginScreen"
                component={LoginScreen}
                options={{ title: "Recipe Generator" }}
            />
            <Stack.Screen
                name="MainMenu"
                component={RootStack}
                options={{ title: "Recipe Generator" }}
            />
            <Stack.Screen
            name="RecipeDetailScreen"
            component={RecipeDetailScreen}
            options={{ title: "Recipe Details" }}
            />
        </Stack.Navigator>
    )
}

const RootStack = () => {
    return (
        <BottomTab.Navigator
            initialRouteName="Saved Recipes"
            screenOptions={{
                headerShown: false,
                gestureEnabled: false
            }}>
            <BottomTab.Screen

                name="Saved Recipes"
                component={SavedRecipeScreen}
                options={{
                    tabBarIcon: (focused, color, size) => {
                        return (
                            <FontAwesome5 name='save' size={24} color='black'></FontAwesome5>
                        )
                    }
                }}
            />
            <BottomTab.Screen
                name="Random Recipes"
                component={RandomRecipeScreen}

                options={{
                    tabBarIcon: (focused, color, size) => {
                        return (
                            <Entypo name='cycle' size={24} color='black'></Entypo>
                        )
                    }
                }}
            />
            <BottomTab.Screen
                name="Create Recipes"
                component={CustomRecipeScreen}
                options={{
                    tabBarIcon: (focused, color, size) => {
                        return (
                            <Ionicons name='ios-create-outline' size={24} color='black'></Ionicons>
                        )
                    }
                }}
            />
        </BottomTab.Navigator>
    )
}


export default StackRoot;
