import { recipes } from '../data/recipes.js';

const SEARCHINPUT = document.querySelector('.input_search');
const RECIPESZONE = document.querySelector('.recipes_card');
const DROPDOWNMENU = document.querySelectorAll('.dropdown-menu');
const DROPBTNPRIMARY = document.querySelector('.btn-primary');
const DROPDOWNINGREDIENT = document.querySelector('.btn-ingrédients');
const ALLDROPDOWN = document.querySelectorAll('.dropdown');
const ALLARROWUP = document.querySelectorAll('.angle-up');
const array = [];

/* Event */

SEARCHINPUT.addEventListener('keyup', () => {
  const INPUT = SEARCHINPUT.value.trim();
  Search(INPUT);
});

DROPBTNPRIMARY.addEventListener('click', OpenTagIngredient);

document.addEventListener('keydown', (e) => {
  const KEYCODE = e.KEYCODE ? e.KEYCODE : e.which;
  if (KEYCODE === 27) {
    CloseTagIngredient();
  }
});

function OpenTagIngredient() {
  DROPDOWNINGREDIENT.classList.toggle('active');
  DROPBTNPRIMARY.innerHTML = '<input class="input form-control search-ingredients" type="text" placeholder="Rechercher un ingrédient"></input><em class="fa-solid fa-angle-up angle-up"></em>';
  DROPBTNPRIMARY.removeEventListener('click', OpenTagIngredient);
}

function CloseTagIngredient() {
  DROPDOWNINGREDIENT.classList.remove('active');
  DROPBTNPRIMARY.innerHTML = 'Ingrédients <em class="fa-solid fa-angle-down angle-down"></em>';
  DROPBTNPRIMARY.addEventListener('click', OpenTagIngredient);
}

/* class for format data card */
class Recipe {
  constructor(datarecipes) {
    this.name = datarecipes.name;
    this.servings = datarecipes.servings;
    this.ingredients = datarecipes.ingredients;
    this.time = datarecipes.time;
    this.description = datarecipes.description;
    this.appliance = datarecipes.appliance;
    this.ustensils = datarecipes.ustensils;
  }

}

/* function for send data to display */

function DisplayData(DataRecipe) {
  for (let a = 0; a < DataRecipe.length; a += 1) {
    const NEWRECIPES = new Recipe(DataRecipe[a]);
    const recipesDOM = createRecipesCardDOM(NEWRECIPES);
    RECIPESZONE.appendChild(recipesDOM);
    //NEWRECIPES.TagIngredients();
  }
}

/* function send data for display TAG ingredients */
function TagIngredientDisplay(Tagrecipes) {
    for (let i = 0; i < Tagrecipes.length; i += 1) {
    const ingredients = Tagrecipes[i].ingredients;
    for (let j = 0; j < ingredients.length; j++) {
      array.push(ingredients[j].ingredient.toLocaleLowerCase());
    }
    
  }
  const Tag = [...new Set(array)];
  for( let e = 0; e < Tag.length; e += 1) {
    const Finish = TagIngredient(Tag[e]);
    DROPDOWNMENU[0].appendChild(Finish);
    
  }
  
  
}

/* function filter */
function Search(INPUT) {
  if (INPUT.length > 2) {
    const filtIngredients = (ingredients) => ingredients.find((item) => item.ingredient.includes(INPUT));
    const ResultFilters = recipes.filter((item) => item.name.toLocaleLowerCase().includes(INPUT.toLocaleLowerCase())
    || item.description.includes(INPUT)
    || filtIngredients(item.ingredients));

    RECIPESZONE.innerHTML = '';
    /*
    const result = recipes.filter((item) => filtIngredients(item.ingredients));

    for (let e = 0; e < result.length; e += 1) {
      console.log(result[e].ingredients);
      const finals = result[e].ingredients;
      const tagDom = TagIngredient(finals);
      DROPDOWNMENU[0].innerHTML = '';

      console.log(tagDom);
      DROPDOWNMENU[0].appendChild(tagDom);
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
