import { recipes } from '../data/recipes.js';

const searchinput = document.querySelector('.input_search');
const recipesZone = document.querySelector('.recipes_card');
const dropdownMenu = document.querySelectorAll('.dropdown-menu');
const dropbtnPrimary = document.querySelector('.btn-primary');
const dropdownIngredients = document.querySelector('.btn-ingrédients');
const dropDown = document.querySelector('.dropdown');

/* Event */

searchinput.addEventListener('keyup', () => {
  const Input = searchinput.value.trim();
  Search(Input);
});

dropbtnPrimary.addEventListener('click', () => {
  dropdownIngredients.classList.toggle('active');
});

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
function DisplayData(DataRecipe) {
  for (let a = 0; a < DataRecipe.length; a += 1) {
    const test = new RecipeCard(DataRecipe[a]);
    const recipesDOM = createRecipesCardDOM(test);
    recipesZone.appendChild(recipesDOM);

    const tagDom = TagIngredient(DataRecipe[a].ingredients);
    dropdownMenu[0].appendChild(tagDom);
  }
}

/* function filter */
function Search(Input) {
  if (Input.length > 2) {
    const filtIngredients = (ingredients) => ingredients.find((item) => item.ingredient.includes(Input));
    const ResultFilters = recipes.filter((item) => item.name.toLocaleLowerCase().includes(Input.toLocaleLowerCase())
    || item.description.includes(Input)
    || filtIngredients(item.ingredients));

    recipesZone.innerHTML = '';
    dropdownMenu[0].innerHTML = '';

    DisplayData(ResultFilters);
  }
}

async function init() {
  DisplayData(recipes);
}

init();
