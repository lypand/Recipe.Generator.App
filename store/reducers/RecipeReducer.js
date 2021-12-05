import { RECIPES } from '../../mockData/MockData'
import { ADD_FAVORITE_RECIPE } from '../actions/RecipeAction';

const initialState = {
    allRecipes: RECIPES,
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
        default:
            return state;
    }
}

export default RecipeReducer;