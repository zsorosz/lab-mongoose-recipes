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
    // console.log(recipesArr);
    console.log(`Connected to the database: "${x.connection.name}"`);
    // Before adding any recipes to the database, let's remove all existing ones
    return Recipe.deleteMany();
  })
  .then(() => {
    // Recipe.create(data[0])
    //   .then((newRecipe) => console.log(newRecipe.title))
    //   .catch((err) => console.log("oh nooo, errrrrorr", err));
    Recipe.insertMany(data)
      .then((allRecipes) => {
        allRecipes.forEach((recipe) => {
          console.log(recipe.title);
        });
      })
      .catch((err) => console.log("oh nooo, errrrrorr", err));
  })
  .catch((error) => {
    console.error("Error connecting to the database", error);
  });
