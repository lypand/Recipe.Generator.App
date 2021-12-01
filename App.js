import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import LoginScreen from './screens/LoginScreen';
import { init, insertRecipe, reset, retrieveRecipesByUsername } from './helpers/db'
import Header from './components/Header';
import UserRecipes from './screens/UserRecipes';
import RecipeCreatorScreen from './screens/RecipeCreatorScreen'
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

  const [displayLogin, setDisplayLogin] = useState(true);
  const [username, setUsername] = useState('');
  const [userRecipes, setUserRecipes] = useState([]); 
  const login = (username) => {
    console.log(username);
    setUsername(username);
    setDisplayLogin(false);

    insertRecipe('Bread', 'https://imagesvc.meredithcorp.io/v3/mm/image?url=https%3A%2F%2Fstatic.onecms.io%2Fwp-content%2Fuploads%2Fsites%2F44%2F2019%2F08%2F26230657%2F6474212.jpg', username)
    .then(() => {
      console.log("Added recipe");
    })
    .catch(err => {
      console.log("Failed to add recipe");
      console.log(err);
    })
    
    retrieveRecipesByUsername(username)
    .then((response) => {
      console.log("Retrieving Recipes By Username");
      setUserRecipes(response.rows._array); 
    })
    .catch(err => {
      console.log("Failed Retrieve Recipes");
      console.log(err);
    })
  }

  const logout = () => {
    setDisplayLogin(true);
  }

  return (
    <View style={styles.container}>
      <Header logout={logout} title="Recipe Generator" />
      <LoginScreen displayLogin={displayLogin} login={login} />
      <RecipeCreatorScreen></RecipeCreatorScreen>
    {/*  <UserRecipes userRecipes={userRecipes} /> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
});
