import { recipes } from '../data/recipes.js';

/* import data to JSON */
async function GetData() {
  const data = recipes;
  const jsonStrings = data.map((item) => JSON.stringify(item));
  const DataRecipe = jsonStrings.map((s) => JSON.parse(s));
  return {
    DataRecipe: [...DataRecipe],
  };
}
/* class for format data card */
class RecipeCard {
  constructor({
    id, name, servings, ingredients, time, description, appliance, ustensils,
  }) {
    this.id = id;
    this.name = name;
    this.servings = servings;
    this.ingredients = ingredients;
    this.time = time;
    this.description = description;
    this.appliance = appliance;
    this.ustensils = ustensils;
  }
}

/* function for send data to display */
async function DisplayData(DataRecipe) {
  const recipesZone = document.querySelector('.recipes_card');
 
  for (let a = 0; a < DataRecipe.length; a += 1) {
    const test = new RecipeCard(DataRecipe[a]);
    const recipesDOM = createRecipesCardDOM(test);
    recipesZone.appendChild(recipesDOM);
  }
}

async function init() {
  const { DataRecipe } = await GetData();
  DisplayData(DataRecipe);
}

init();
