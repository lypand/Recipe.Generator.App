import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import LoginScreen from './screens/LoginScreen';
import { init, insertRecipe, reset, retrieveRecipesByUsername } from './helpers/db'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import StackRoot from './navigation/RecipeNavigation'

const Stack = createNativeStackNavigator();


export default function App() {

  useEffect(() => {
    reset().then(() => {
      console.log("Reset Table");
    }).catch(err => {
      console.log('Reset Failed');
      console.log(err);
    });
    init().then(() => {
      console.log("Initializ database");
    }).catch(err => {
      console.log('Initialize db failed');
      console.log(err);
    });
  }, []);

  const [username, setUsername] = useState('');
  const [userRecipes, setUserRecipes] = useState([]);
  

  return (


    <NavigationContainer>
      <StackRoot></StackRoot>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
});
