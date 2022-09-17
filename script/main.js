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

  TAG() {

  }
}

/* function for send data to display */

function DisplayData(DataRecipe) {
  for (let a = 0; a < DataRecipe.length; a += 1) {
    const NEWRECIPES = new Recipe(DataRecipe[a]);
    const recipesDOM = createRecipesCardDOM(NEWRECIPES);
    RECIPESZONE.appendChild(recipesDOM);
  }
}

/* function send data for display TAG ingredients */
function TagIngredientDisplay(Tagrecipes) {
  DROPDOWNMENU[0].innerHTML = '';
  for (let i = 0; i < Tagrecipes.length; i += 1) {
    const { ingredients } = Tagrecipes[i];
    console.log(ingredients);
    for (let j = 0; j < ingredients.length; j += 1) {
      array.push(ingredients[j].ingredient.toLocaleLowerCase());
    }
  }
  const Tag = [...new Set(array)];
  console.log(Tag);
  for (let e = 0; e < Tag.length; e += 1) {
    const Finish = TagIngredient(Tag[e]);
    DROPDOWNMENU[0].appendChild(Finish);
  }
}

/* function filter */
function Search(INPUT) {
  if (INPUT.length > 2) {
    const ARRAYFILTER = [];
    
    
    
   // algo search recette full boucle Native
    for (let z = 0; z < recipes.length; z += 1) {
      if (recipes[z].name.toLocaleLowerCase().includes(INPUT.toLocaleLowerCase())) {
        ARRAYFILTER.push(recipes[z]);
      }
      if (recipes[z].description.includes(INPUT)) {
        ARRAYFILTER.push(recipes[z]);
      }

      for (let x = 0; x < recipes[z].ingredients.length; x += 1) {
        const INGREDIENTS = recipes[z].ingredients;
        console.log(INGREDIENTS);
        if (INGREDIENTS[x].ingredient.includes(INPUT)) {
          ARRAYFILTER.push(recipes[z]);
        }
      }
    }

    console.log(ARRAYFILTER);
    const RESULTFILTER = [... new Set(ARRAYFILTER)];
   
   RECIPESZONE.innerHTML = '';
    /*
    for (let e = 0; e < RESULTFILTER.length; e += 1) {
      console.log(RESULTFILTER[0].ingredients)
      const Finish = TagIngredient(RESULTFILTER[e].ingredient);
      DROPDOWNMENU[0].appendChild(Finish);
    }
    */
    DisplayData(RESULTFILTER);
  }
}

async function init() {
  DisplayData(recipes);
  TagIngredientDisplay(recipes);
}

init();
