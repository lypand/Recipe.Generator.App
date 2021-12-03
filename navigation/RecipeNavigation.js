import SavedRecipeScreen from '../screens/SavedRecipeScreen'; '../screens/SavedRecipeScreen';
import RandomRecipeScreen from '../screens/RandomRecipeScreen';
import LoginScreen from '../screens/LoginScreen';
import CustomRecipeScreen from '../screens/CustomRecipeScreen'
import { NavigationContainer } from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs'; 
import { createStackNavigator} from '@react-navigation/stack';
import React from 'react'; 
import {Ionicons, AntDesign, Entypo, FontAwesome5} from '@expo/vector-icons'; 

const BottomTab = createBottomTabNavigator();
const Stack = createStackNavigator();

const StackRoot = () => {
    return (
        <Stack.Navigator
        screenOptions={{
            headerTintColor: 'white',
            headerStyle: {
                backgroundColor: '#6a0080'
            }
        }}>
        <Stack.Screen
            name="LoginScreen"
            component={LoginScreen}
            options={{ title: "Login" }}
        />
        <Stack.Screen
            name="MainMenu"
            component={RootStack}  
            options={{ title: "Recipe Generator" }}
            />
    </Stack.Navigator>
    )
}

const RootStack = () => {
    return (
        <BottomTab.Navigator
        screenOptions={{
            headerShown: false,
        }}>
            <BottomTab.Screen
                
                name="CustomRecipesScreen"
                component={SavedRecipeScreen}
                options={{
                    tabBarIcon: (focused, color, size) => {
                        return (
                            <FontAwesome5  name='save' size={24} color='black'></FontAwesome5>
                        )
                    }
                }}
            />
            <BottomTab.Screen
                name="RandomRecipeScreen"
                component={RandomRecipeScreen}
                options={{
                    tabBarIcon: (focused, color, size) => {
                        return ( 
                            <Entypo  name='cycle' size={24} color='black'></Entypo>
                        )
                    }
                }}
            />
            <BottomTab.Screen
                name="RecipeCreatorScreen"
                component={CustomRecipeScreen}
                options={{
                    tabBarIcon: (focused, color, size) => {
                        return ( 
                            <Ionicons  name='ios-create-outline' size={24} color='black'></Ionicons>
                        )
                    }
                }}
            />
        </BottomTab.Navigator>
    )
}


export default StackRoot;
