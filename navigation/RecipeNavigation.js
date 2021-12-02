import UserRecipes from '../screens/UserRecipes';
import RandomRecipeScreen from '../screens/RandomRecipeScreen';
import LoginScreen from '../screens/LoginScreen';
import { NavigationContainer } from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs'; 
import { createStackNavigator} from '@react-navigation/stack';
import React from 'react'; 

const BottomTab = createBottomTabNavigator();
const Stack = createStackNavigator();

const StackRoot = () => {
    return (
        <Stack.Navigator
        screenOptions={{
            headerTintColor: 'white',
            headerStyle: {
                backgroundColor: 'red'
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
            options={{ title: "Saved Recipes" }}
        />
    </Stack.Navigator>
    )
}

const RootStack = () => {
    return (
        <BottomTab.Navigator
        screenOptions={{
            headerShown: false
        }}>
            <BottomTab.Screen
                
                name="UserRecipesScreen"
                component={UserRecipes}
                options={{ title: "Saved Recipes" }}
            />
            <BottomTab.Screen
                name="RandomRecipeScreen"
                component={RandomRecipeScreen}
                options={{ title: "Random Recipes" }}
            />
        </BottomTab.Navigator>
    )
}

// Stack.navigationOptions = ({ navigation }) => {
//     let tabBarVisible;
//     if (navigation.state.routes.length > 1) {
//         navigation.state.routes.map(route => {
//             if (route.routeName === "LoginScreen") {
//                 tabBarVisible = false;
//                 console.log("here");
//             } else {
//                 tabBarVisible = true;
//             }
//         });
//     }

//     return {
//         tabBarVisible
//     };
// };

export default StackRoot;
