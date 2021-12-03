import React, { useState, useEffect }  from "react";
import { useSelector, useDispatch } from 'react-redux';
import { TextInput, View, Button,Text, StyleSheet, TouchableWithoutFeedback, Keyboard } from "react-native";
import { insertRecipe } from '../repositories/databaseRepository';
import {updateUsername} from '../store/actions/UserActions'; 

const LoginScreen = props => {

  const [username, setUsername] = useState('');
  const t = []; 
  const RECIPES = useSelector(state => state.recipes.allRecipes);
  const customRecipe = useSelector(state => state.customRecipe.customRecipe);
  const dispatch = useDispatch();
   
    const updateUser = () =>{
      dispatch(updateUsername(username)); 
    }

    useEffect(() => {
      RECIPES.forEach(recipe => {
        insertRecipe(recipe.title,recipe.imageUri)
        .then((response) => {
      })
      .catch(err => {
          console.log("Insert Recipes");
          console.log(err);
      }); 
    }, [])
  }); 

  const loginButtonPressHandler = () => {


    //TODO: Add action to update username redux store
    updateUser(); 
    console.log(customRecipe);
    props.navigation.navigate('MainMenu');  
  }

  return (
    <TouchableWithoutFeedback 
    onPress={() => {
      Keyboard.dismiss();
    }}>
      <View style={styles.inputStyle}>
        <TextInput 
        style={styles.textStyle} 
        onChangeText={(username) => setUsername(username)} 
        value={username} 
        placeholder="Username"></TextInput>
        <View  >
          <Button onPress={loginButtonPressHandler} title="Login" />
        </View>
      </View>

    </TouchableWithoutFeedback>
  );
};
export default LoginScreen;

//#region Styles
const styles = StyleSheet.create({
  inputStyle: {
    fontSize: 40,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },

  textStyle: {
    fontSize: 20,
    borderWidth: 1,
    width: '60%',
    borderColor: 'black',
    textAlign: 'center'
  }
});
//#endregion

//#region Methods
const populateTestRecipes = (RECIPES) => {
  RECIPES.forEach(r => {
    {
      insertRecipe(r.title, r.imageUri, r.username)
        .then(() => {
        })
        .catch(err => {
          console.log("Failed to add recipe");
          console.log(err);
        })
    }
  })
}
//#endregion

