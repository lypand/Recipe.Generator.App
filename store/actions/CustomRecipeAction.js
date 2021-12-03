export const UPDATE_RECIPE = "UPDATE_RECIPE"; 

export const updateCustomerRecipe = (updatedRecipe) => {
    return {type: UPDATE_RECIPE, updatedRecipe: updatedRecipe }
}