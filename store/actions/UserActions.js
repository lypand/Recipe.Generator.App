export const UPDATE_USER = "UPDATE_USER"; 

export const updateUsername = (username) => {
    return {type: UPDATE_USER, username: username }
}