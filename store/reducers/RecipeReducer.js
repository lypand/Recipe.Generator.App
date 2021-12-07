import { getRecipesByStatus } from '../../repositories/databaseRepository';
import { ADD_FAVORITE_RECIPE, GET_ALL_UNSEEN_RECIPES, ADD_FAVORITE_RECIPES } from '../actions/RecipeAction';
import Recipe from '../../Modles/Recipe'

const initialState = {
    unSeenRecipes: {
        unSeenRecipes: [
            // new Recipe(0, 'Artichoke-Spinach Stuffed Mushrooms', 'https://www.plantbasedcooking.com/wp-content/uploads/2020/11/Stuffed-Mushrooms-Cookbook.jpg', 'https://www.plantbasedcooking.com/recipe/artichoke-spinach-stuffed-mushrooms/')
        ]
    },
    favoriteRecipes: {
        favorites: [
        new Recipe(0, 'Artichoke-Spinach Stuffed Mushrooms', 'https://www.plantbasedcooking.com/wp-content/uploads/2020/11/Stuffed-Mushrooms-Cookbook.jpg', 'https://www.plantbasedcooking.com/recipe/artichoke-spinach-stuffed-mushrooms/')

        ]
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
            unSeenRecipes.unSeenRecipes = action.recipes;
            return { ...state, unSeenRecipes: unSeenRecipes }
        case ADD_FAVORITE_RECIPES:
            const favoriteRecipes = { ...state.favoriteRecipes };
            console.log("before " + favoriteRecipes.favorites);
            const result = favoriteRecipes.favorites.concat(action.recipes); 
            favoriteRecipes.favorites = result;
            console.log("Result: " + result); 
            return { ...state, favoriteRecipes: favoriteRecipes }
        default:
            return state;
    }
}

export default RecipeReducer;