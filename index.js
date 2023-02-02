const mongoose = require("mongoose");
mongoose.set("strictQuery", true);

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require("./models/Recipe.model");
// Import of the data from './data.json'
const data = require("./data");

const MONGODB_URI = "mongodb://127.0.0.1/recipe-app";

// Connection to the database "recipe-app"
mongoose
  .connect(MONGODB_URI)
  .then((x) => {
    console.log(`Connected to the database: "${x.connection.name}"`);
    // Before adding any recipes to the database, let's remove all existing ones
    return Recipe.deleteMany();
  })
  .then(() => {
    // Run your code here, after you have insured that the connection was made
    async function createRecipes() {
      try {
        // const oneRecipe = await Recipe.create(data[0]);
        // console.log("Recipe created", oneRecipe);
        const allRecipes = await Recipe.insertMany(data);
        allRecipes.forEach((recipe) => {
          console.log(recipe.title);
        });
        const updatedRecipe = await Recipe.findOneAndUpdate(
          { title: "Rigatoni alla Genovese" },
          { duration: 100 },
          { new: true }
        );
        console.log("yeeyy, the recipe is updated", updatedRecipe);
        const deletedRecipe = await Recipe.findOneAndDelete({
          title: "Carrot Cake",
        });
        console.log("great, carrot cake is gone...", deletedRecipe);
        mongoose.disconnect();
      } catch (err) {
        console.log("oh nooo, errrrrorr", err);
      }
    }
    createRecipes();
  })
  .catch((error) => {
    console.error("Error connecting to the database", error);
  });
