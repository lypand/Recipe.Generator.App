export const ADD_FAVORITE_RECIPE = "ADD_FAVORITE_RECIPE"; 
export const GET_ALL_UNSEEN_RECIPES = "GET_ALL_UNSEEN_RECIPES"; 

export const addFavoriteRecipe = (recipe) => {
    return {type: ADD_FAVORITE_RECIPE, recipe: recipe }
}

export const placeAllUnseenRecipesIntoState = (recipes) => {
    return {type: GET_ALL_UNSEEN_RECIPES, recipes: recipes}
}