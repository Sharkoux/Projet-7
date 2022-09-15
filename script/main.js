import { recipes } from '../data/recipes.js';

const searchinput = document.querySelector('.input_search');
const recipesZone = document.querySelector('.recipes_card');
const dropdownMenu = document.querySelectorAll('.dropdown-menu');
const dropbtnPrimary = document.querySelector('.btn-primary');
const dropdownIngredients = document.querySelector('.btn-ingrédients');
const dropDownOne = document.querySelectorAll('.dropdown');
const arrowUp = document.querySelectorAll('.angle-up');
let array = [];
let array2 = [];
/* Event */

searchinput.addEventListener('keyup', () => {
  const Input = searchinput.value.trim();
  Search(Input);
});

dropbtnPrimary.addEventListener('click', OpenTagIngredient);

document.addEventListener('keydown', (e) => {
  const keyCode = e.keyCode ? e.keyCode : e.which;
  if (keyCode === 27) {
    CloseTagIngredient();
  }
});

function OpenTagIngredient() {
  dropdownIngredients.classList.toggle('active');
  dropbtnPrimary.innerHTML = '<input class="input form-control search-ingredients" type="text" placeholder="Rechercher un ingrédient"></input><em class="fa-solid fa-angle-up angle-up"></em>';
  dropbtnPrimary.removeEventListener('click', OpenTagIngredient);
}

function CloseTagIngredient() {
  dropdownIngredients.classList.remove('active');
  dropbtnPrimary.innerHTML = 'Ingrédients <em class="fa-solid fa-angle-down angle-down"></em>';
  dropbtnPrimary.addEventListener('click', OpenTagIngredient);
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
function DisplayData(DataRecipe) {
  for (let a = 0; a < DataRecipe.length; a += 1) {
    const test = new RecipeCard(DataRecipe[a]);
    const recipesDOM = createRecipesCardDOM(test);
    recipesZone.appendChild(recipesDOM);
  }
}

/* function send data for display TAG ingredients */
function TagIngredientDisplay(recipes) {
  for (let i = 0; i < recipes.length; i += 1) {
  
    array.push(recipes[i].ingredients)
   
    const tagDom = TagIngredient(recipes[i].ingredients);
    console.log(recipes[i].ingredients)
    dropdownMenu[0].appendChild(tagDom);
  }
  array.forEach(element => {
    element.forEach(eleme => {
      
      array2.push(eleme.ingredient.toLocaleLowerCase());
      
    });
      console.log(array2)
      const finalss = [...new Set(array2)];
      console.log(finalss)
  });
}

/* function filter */
function Search(Input) {
  if (Input.length > 2) {
    const filtIngredients = (ingredients) => ingredients.find((item) => item.ingredient.includes(Input));
    const ResultFilters = recipes.filter((item) => item.name.toLocaleLowerCase().includes(Input.toLocaleLowerCase())
    || item.description.includes(Input)
    || filtIngredients(item.ingredients));

    recipesZone.innerHTML = '';
    /*
    const result = recipes.filter((item) => filtIngredients(item.ingredients));

    for (let e = 0; e < result.length; e += 1) {
      console.log(result[e].ingredients);
      const finals = result[e].ingredients;
      const tagDom = TagIngredient(finals);
      dropdownMenu[0].innerHTML = '';

      console.log(tagDom);
      dropdownMenu[0].appendChild(tagDom);
    }
    */
    DisplayData(ResultFilters);
  }
}

async function init() {
  DisplayData(recipes);
  TagIngredientDisplay(recipes);
}

init();
