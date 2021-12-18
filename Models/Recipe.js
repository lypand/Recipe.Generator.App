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
        instructions
    ) {

        this.id = id;
        this.title = title;
        this.imageUri = imageUri;
        this.webUri = webUri;
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
    }
}


export default Recipe