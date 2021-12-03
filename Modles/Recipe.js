import react from "react";

class Recipe{
    constructor(
        id, 
        title, 
        imageUri,
        username
    ){
        this.id = id; 
        this.title = title; 
        this.imageUri = imageUri; 
        this.username = username; 
    }
}

export default Recipe