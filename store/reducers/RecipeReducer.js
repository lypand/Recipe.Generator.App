import { getRecipesByStatus } from '../../repositories/databaseRepository';
import { ADD_FAVORITE_RECIPE, GET_ALL_UNSEEN_RECIPES } from '../actions/RecipeAction';

const initialState = {
    unSeenRecipes: {
        unSeenRecipes: []
    },
    favoriteRecipes: {
        favorites: []
    }
};

const RecipeReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_FAVORITE_RECIPE:
            if (state.favoriteRecipes.favorites.find(favorite => favorite.id == action.recipe.id)) {
                return state;
            }
            const updatedFavorites = { ...state.favoriteRecipes };
            updatedFavorites.favorites.push(action.recipe);
            return { ...state, favoriteRecipes: updatedFavorites }
        case GET_ALL_UNSEEN_RECIPES: 
            const unSeenRecipes = { ...state.unSeenRecipes };
            unSeenRecipes.unSeenRecipes =  action.recipes;
            console.log("here " + unSeenRecipes)
            return { ...state, unSeenRecipes: unSeenRecipes }
        default:
            return state;
    }
}

export default RecipeReducer;