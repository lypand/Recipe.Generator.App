import React, { useState } from "react";
import { TextInput, View, Text, Pressable, Button, StyleSheet, Modal, TouchableWithoutFeedback, Keyboard } from "react-native";
import { RECIPES } from '../mockData/MockData';
import { init, insertRecipe, reset, retrieveRecipesByUsername } from '../helpers/db';

const LoginScreen = props => {
  const [username, setUsername] = useState('');

  const loginButtonPressHandler = () => {
    setUsername('');

    RECIPES.forEach(r => {
      {
        insertRecipe(r.title, r.imageUri, r.username)
          .then(() => {
            console.log("Added recipe");
          })
          .catch(err => {
            console.log("Failed to add recipe");
            console.log(err);
          })
      }
    })
    props.navigation.navigate('MainMenu');
  }

  return (
    <TouchableWithoutFeedback onPress={() => {
      Keyboard.dismiss();
    }}>
      <View style={styles.inputStyle}>
        <TextInput style={styles.textStyle} onChangeText={(username) => setUsername(username)} value={username} placeholder="Username"></TextInput>
        <View  >
          <Button onPress={loginButtonPressHandler} title="Login" />
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

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


export default LoginScreen;