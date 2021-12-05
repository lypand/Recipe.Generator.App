export const ADD_FAVORITE_RECIPE = "ADD_FAVORITE_RECIPE"; 

export const addFavoritRecipe = (recipe) => {
    return {type: ADD_FAVORITE_RECIPE, recipe: recipe }
}