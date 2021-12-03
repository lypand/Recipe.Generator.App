export const ADD_FAVORITE_RECIPE = "ADD_FAVORITE_RECIPE"; 

export const updateCustomerRecipe = (recipeId) => {
    return {type: ADD_FAVORITE_RECIPE, recipeId: recipeId }
}