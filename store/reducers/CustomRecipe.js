import { UPDATE_RECIPE } from "../actions/CustomRecipeAction";

const initialState = {
    customRecipe: {
        id: 0,
        title: '',
        imageUri: '',
        username: '',
        calories: '',
    }
};

const CustomRecipeReducer = (state = initialState, action) => {
    switch(action.type){
        case UPDATE_RECIPE:
            var recipeCopy = {...state};
            recipeCopy.imageUri = action.updatedRecipe.imageUri; 
            recipeCopy.title = action.updatedRecipe.tite; 
            recipeCopy.user = action.updatedRecipe.user; 
            return Object.assign({}, state, {
                //recipeCopy
              });
        default: 
            return state
    }
}

export default CustomRecipeReducer;