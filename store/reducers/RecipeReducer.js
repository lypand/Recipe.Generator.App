import Recipe from '../../Models/Recipe'
import { UPDATE_LOADED_FAVORITES, ADD_FAVORITE_RECIPE, ADD_FAVORITE_RECIPES, GET_ALL_UNSEEN_RECIPES, REMOVE_FAVORITE_RECIPE, REMOVE_UNSEEN_RECIPE, RESET_ALL } from '../actions/RecipeAction';

const initialState = {
    session: {
        session: false
    },
    unSeenRecipes: {
        unSeenRecipes: [
            // new Recipe(
            //     0,
            //     'Artichoke-Spinach Stuffed Mushrooms',
            //     'https://www.plantbasedcooking.com/recipe/artichoke-spinach-stuffed-mushrooms/',
            //     'https://www.plantbasedcooking.com/wp-content/uploads/2020/11/Stuffed-Mushrooms-Cookbook.jpg',
            //     ['unsalted raw cashews', 'nutritional yeast', 'bread crumbs', 'cremini mushrooms', 'Baked Spinach Artichoke Dip'],
            //     ['1/2', '2', '1/4', '1', '1/2'],
            //     ['cup', 'tablespoons', 'cup', 'pound', 'recipe'],
            //     ['NA', 'NA', 'NA', 'stems removed', 'NA'],
            //     ['Instructions'],
            //     [['Preheat oven to 375Â°F. Line a baking sheet with parchment paper.', 'Blend cashews in a blender until crumbly. Transfer to a small bowl and combine with nutritional yeast and bread crumbs.', 'Stuff each mushroom cap with 1 1/2 tablespoons Spinach-Artichoke. Dip, mounding over the top of the mushroom. Place on the baking sheet.', 'Bake, uncovered, for 25 to 30 minutes. About halfway through baking, remove and sprinkle on the cashew mixture. Return to the oven to finish cooking.', 'Let cool for about 5 minutes before serving. Refrigerate leftovers in an airtight glass container for up to 4 days.']])
        ]
    },
    favoriteRecipes: {
        favorites: [
            // new Recipe(
            //     0,
            //     'Artichoke-Spinach Stuffed Mushrooms',
            //     'https://www.plantbasedcooking.com/recipe/artichoke-spinach-stuffed-mushrooms/',
            //     'https://www.plantbasedcooking.com/wp-content/uploads/2020/11/Stuffed-Mushrooms-Cookbook.jpg',
            //     ['unsalted raw cashews', 'nutritional yeast', 'bread crumbs', 'cremini mushrooms', 'Baked Spinach Artichoke Dip'],
            //     ['1/2', '2', '1/4', '1', '1/2'],
            //     ['cup', 'tablespoons', 'cup', 'pound', 'recipe'],
            //     ['NA', 'NA', 'NA', 'stems removed', 'NA'],
            //     ['Instructions'],
            //     [['Preheat oven to 375Â°F. Line a baking sheet with parchment paper.', 'Blend cashews in a blender until crumbly. Transfer to a small bowl and combine with nutritional yeast and bread crumbs.', 'Stuff each mushroom cap with 1 1/2 tablespoons Spinach-Artichoke. Dip, mounding over the top of the mushroom. Place on the baking sheet.', 'Bake, uncovered, for 25 to 30 minutes. About halfway through baking, remove and sprinkle on the cashew mixture. Return to the oven to finish cooking.', 'Let cool for about 5 minutes before serving. Refrigerate leftovers in an airtight glass container for up to 4 days.']])
        ]
    }
};

const RecipeReducer = (state = initialState, action) => {
    switch (action.type) {
        case REMOVE_UNSEEN_RECIPE:
            if (state.unSeenRecipes.unSeenRecipes.find(unseen => unseen.id == action.recipe.id)) {
                // Remove from unseen
                const allUnseenRecipes = { ...state.unSeenRecipes };

                if (!(allUnseenRecipes.unSeenRecipes.some(unseenRecipe => unseenRecipe.id == action.recipe.id))) {
                    allUnseenRecipes.splice(index, 1);
                }

                return { ...state, allUnseenRecipes };

            } else {
                return state;
            }
        case ADD_FAVORITE_RECIPE:

            const updatedFavorites = { ...state.favoriteRecipes };
            if (!updatedFavorites.favorites) {
                updatedFavorites.favorites = []; 
            } else {
                if (updatedFavorites.favorites.find(favorite => favorite.id == action.recipe.id)) {
                    return state;
                }
            }
            updatedFavorites.favorites.push(action.recipe);
            return { ...state, favoriteRecipes: updatedFavorites }
        case GET_ALL_UNSEEN_RECIPES:
            const unSeenRecipes = { ...state.unSeenRecipes };
            unSeenRecipes.unSeenRecipes = action.recipes;
            return { ...state, unSeenRecipes: unSeenRecipes }
        case ADD_FAVORITE_RECIPES:
            const favoriteRecipes = { ...state.favoriteRecipes };
            const result = favoriteRecipes.favorites.concat(action.recipes);
            favoriteRecipes.favorites = result;
            return { ...state, favoriteRecipes: favoriteRecipes }
        case REMOVE_FAVORITE_RECIPE:
            const allFavorites = { ...state.favoriteRecipes };
            const allFavoritesFiltered = allFavorites.favorites.filter(function (obj) {
                return obj.id !== action.id;
            });
            allFavoritesFiltered.favorites = allFavoritesFiltered;
            return { ...state, favoriteRecipes: allFavoritesFiltered }
        case UPDATE_LOADED_FAVORITES:
            const session = { ...state.session };
            session.session = action.recipe;
            return { ...state, session: session }
        case RESET_ALL:
            return { ...state, unSeenRecipes: { unSeenRecipes: [] }, favoriteRecipes: {} }
        default:
            return state;
    }
}

export default RecipeReducer;