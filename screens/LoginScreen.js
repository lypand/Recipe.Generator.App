import React, { useState, useEffect } from "react";
import { useDispatch } from 'react-redux';
import { TextInput, View, Button, Text, StyleSheet, TouchableWithoutFeedback, Keyboard, Alert } from "react-native";
import { updateUsername } from '../store/actions/UserActions';
import { reset, insertRecipe, init, doesTableExist } from '../repositories/databaseRepository'
import { RECIPES } from '../mockData/MockData';

const LoginScreen = props => {

  const [username, setUsername] = useState('');
  const t = [];
  const dispatch = useDispatch();

  useEffect(() => {
    doesTableExist('recipe').then((response) => {
      if (response.rows.length < 1) {
        initAndPopulateTables();
      }
    })
      .catch(err => {
        console.log(err);
      });
  }
    , []);

  const initAndPopulateTables = () => {
    init().then(() => {
      console.log("Initialize database");
    }).catch(err => {
      console.log('Initialize db failed');
      console.log(err);
    });

    for (const recipe of RECIPES) {
      insertRecipe(recipe.title, recipe.imageUri, recipe.webUri, 0)
        .then((response) => {
        })
        .catch(err => {
          console.log(err);
        })
    }
  }

  const resetTablesDialogHandler = () => {
    Alert.alert(
      "Reset All Tables",
      "Are you sure you want to reset all tables?",
      [
        {
          text: "Confirm",
          onPress: () => resetTables()
        },
        {
          text: "Cancel",
        }
      ]
    )
  }

  const resetTables = () => {
    reset().then(() => {
      console.log("Reset Table");
    }).catch(err => {
      console.log('Reset Failed');
      console.log(err);
    });

    initAndPopulateTables();
  }
  
  const loginButtonPressHandler = () => {
    dispatch(updateUsername(username));
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
          <Button onPress={resetTablesDialogHandler} title="Reset All" />
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