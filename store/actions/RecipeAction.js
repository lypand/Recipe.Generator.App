export const ADD_FAVORITE_RECIPE = "ADD_FAVORITE_RECIPE";
export const ADD_FAVORITE_RECIPES = "ADD_FAVORITE_RECIPES";
export const GET_ALL_UNSEEN_RECIPES = "GET_ALL_UNSEEN_RECIPES";
export const REMOVE_UNSEEN_RECIPE = "REMOVE_UNSEEN_RECIPE";
export const REMOVE_FAVORITE_RECIPE = "REMOVE_FAVORITE_RECIPE"; 
export const UPDATE_LOADED_FAVORITES = "UPDATE_LOADED_FAVORITES"; 

export const addFavoriteRecipe = (recipe) => {
    return { type: ADD_FAVORITE_RECIPE, recipe: recipe }
}

export const removeUnseenRecipe = (recipe) => {
    return { type: REMOVE_UNSEEN_RECIPE, recipe: recipe }
}

export const removeFavoriteRecipe = (id) => {
    return {type: REMOVE_FAVORITE_RECIPE, id: id}
}

export const setLoadedFavorites = (loadedFavorites) => {
    return {type: UPDATE_LOADED_FAVORITES, loadedFavorites: loadedFavorites}
}

export const addFavoriteRecipes = (recipes) => {
    return { type: ADD_FAVORITE_RECIPES, recipes: recipes }
}

export const placeAllUnseenRecipesIntoState = (recipes) => {
    return { type: GET_ALL_UNSEEN_RECIPES, recipes: recipes }
}

export const addRecipe = (recipe) => {
    return { type: ADD_RECIPE, recipe: recipe }
}