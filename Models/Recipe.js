class Recipe {
    constructor(
        id,
        title,
        webUri,
        imageUri,
        ingredients,
        amounts,
        units,
        notes,
        selectionTitles,
        instructions,
        fullIngredients,
        fullInstructions
    ) {
        this.id = id;
        this.title = title;
        this.imageUri = imageUri;
        this.webUri = webUri;

        if (fullIngredients === undefined || fullInstructions === undefined) {
            this.ingredients = [];

            for (let i = 0; i < ingredients.length; i++) {
                let ingredient = amounts[i] + " " + units[i] + " " + ingredients[i] + " " + (notes[i] !== 'NA' ? notes[i] : '');
                this.ingredients.push(ingredient);
            }

            this.instructions = []

            for (let x = 0; x < instructions.length; x++) {
                this.instructions.push(
                    {
                        title: selectionTitles[x],
                        instructions: instructions[x]
                    }
                );
            }
        }else{
            this.ingredients = fullIngredients;
            this.instructions = fullInstructions; 
        }
    }
}


export default Recipe