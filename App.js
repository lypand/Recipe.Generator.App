import React, { useEffect, useSelector } from 'react';
import { StyleSheet } from 'react-native';
import { init, reset } from './repositories/databaseRepository'
import { NavigationContainer } from '@react-navigation/native';
import StackRoot from './navigation/RecipeNavigation'
import { createStore, combineReducers } from 'redux';
import RecipeReducer from './store/reducers/RecipeReducer';
import UserReducer from './store/reducers/UserReducer';
import { Provider } from 'react-redux';
import CustomRecipeReducer from './store/reducers/CustomRecipe';
import{RECIPES} from './mockData/MockData'; 
import { insertRecipe } from './repositories/databaseRepository';

const store = createStore(combineReducers(
  {
    recipes: RecipeReducer,
    user: UserReducer,
    customRecipe: CustomRecipeReducer
  }));

export default function App() {
  useEffect(() => {
    initialzeDatabase();
  }, []);

  return (
    <Provider store={store}>
      <NavigationContainer>
        <StackRoot></StackRoot>
      </NavigationContainer>
    </Provider>
  );
}

//#region Styles
const styles = StyleSheet.create({
  container: {
    flex: 1
  },
});
//#endregion


// #region Methods
const initialzeDatabase = () => {
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

  RECIPES.forEach(recipe => {
    insertRecipe(recipe.title, recipe.imageUri)
      .then((response) => {
      })
      .catch(err => {
        console.log("Insert Recipes");
        console.log(err);
      })
  });

}
// #endregion
