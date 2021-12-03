import { RECIPES } from '../../mockData/MockData'
import { ADD_FAVORITE_RECIPE } from '../actions/RecipeAction';

const initialState = {
    allRecipes: RECIPES,
    favoriteRecipes: [],
};


const RecipeReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_FAVORITE_RECIPE:
            const existingIndex = state.favoriteRecipes.findIndex(meal => meal.id == action.recipeId); 
            if(existingIndex == -1){
                const recipe = state.allRecipes.find(recipe => recipe.id == action.id); 
                return {...state, favoriteRecipes: state.favoriteRecipes.concat(recipe)}
            }
            return state; 
        default:
            return state;
    }
}

export default RecipeReducer;