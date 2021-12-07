import { UPDATE_USER } from "../actions/UserActions";

const initialState = {
    user: {
        username: 'Bob'
    }
};

const UserReducer = (state = initialState, action) => {
    switch (action.type) {
        case UPDATE_USER:
            const updatedUser = {...state.user}; 
            updatedUser.username = action.username; 
            return {...state, user: updatedUser}

        default:
            return state;
    }
}

export default UserReducer; 