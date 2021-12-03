import { RECIPES } from '../../mockData/MockData'


const initialState = {
    allRecipes: RECIPES,
    userRecipes: [],
};


const RecipeReducer = (state = initialState, action) => {
    return state;
}

export default RecipeReducer; 