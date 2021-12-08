import React, { useEffect } from 'react';
import { StyleSheet } from 'react-native';
import { init } from './repositories/databaseRepository'
import { NavigationContainer } from '@react-navigation/native';
import StackRoot from './navigation/RecipeNavigation'
import { createStore, combineReducers } from 'redux';
import RecipeReducer from './store/reducers/RecipeReducer';
import UserReducer from './store/reducers/UserReducer';
import { Provider } from 'react-redux';
import CustomRecipeReducer from './store/reducers/CustomRecipe';

const store = createStore(combineReducers(
  {
    recipes: RecipeReducer,
    user: UserReducer,
    customRecipe: CustomRecipeReducer
  }));

export default function App() {

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
