import React, { useState, useEffect } from "react";
import { useDispatch } from 'react-redux';
import { View, StyleSheet, TouchableWithoutFeedback, Keyboard, Alert } from "react-native";
import { updateUsername } from '../store/actions/UserActions';
import { reset, insertRecipe, init, doesTableExist } from '../repositories/databaseRepository'
import { RECIPES } from '../mockData/MockData';
import { Button, Text } from 'react-native-elements';
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
      insertRecipe(recipe.title, recipe.imageUri, recipe.webUri, recipe.ingredients, recipe.instructions, 0)
        .then((response) => {
        })
        .catch(err => {
          console.log(err);
        })
    }
  }

  const resetTablesDialogHandler = () => {
    Alert.alert(
      "Warning: Reset",
      "Are you sure you want to reset? All saved recipes will be deleted.",
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
        <View style={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center'
        }}>
        <Button
          title="START"
          buttonStyle={{ backgroundColor: 'rgba(127, 220, 103, 1)' }}
          onPress={loginButtonPressHandler}
          containerStyle={{
            height: 100,
            width: 200,
          }}
          titleStyle={{
            color: 'white',
          }}
        />
        </View>
        <Button
          title="RESET"
          buttonStyle={{ backgroundColor: 'rgba(214, 61, 57, 1)' }}
          onPress={resetTablesDialogHandler}
          containerStyle={{
            height: 40,
            width: 200,
            marginHorizontal: 50,
            marginVertical: 10,
          }}
          titleStyle={{
            color: 'white',
            marginHorizontal: 20,
          }}
        />
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