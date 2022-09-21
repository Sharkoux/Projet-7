import { recipes } from '../data/recipes.js';

const SEARCHINPUT = document.querySelector('.input_search');

const RECIPESZONE = document.querySelector('.recipes_card');
const DROPDOWNMENU = document.querySelectorAll('.dropdown-menu');
const DROPBTNPRIMARY = document.querySelector('.btn-primary');
const DROPBTNAPPAREILS = document.querySelector('.btn-appareils');
const DROPBTNUSTENCILS = document.querySelector('.btn-danger');
const DROPDOWNINGREDIENT = document.querySelector('.btn-ingrédients');
const DROPBTN = document.querySelector('.drop_btn');
const ALLARROWUP = document.querySelectorAll('.angle-up');
const DivTag = document.querySelector('.divtag');
const filterZone = document.querySelector('.filter');

let arraysearchtag = [];
let array = [];
const arrayTag = [];
const ARRAYFILTERTAG = [];

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

/* function open / close filter */

function OpenTagIngredient() {
  DROPDOWNINGREDIENT.classList.toggle('active');
  DROPBTN.style.setProperty('border-radius', '5px 5px 0 0');
  DROPBTNPRIMARY.innerHTML = '<input class="input form-control search-ingredients" type="text" placeholder="Rechercher un ingrédient"></input><em class="fa-solid fa-angle-up angle-up"></em>';
  DROPBTNPRIMARY.removeEventListener('click', OpenTagIngredient);
  const SEARCHTAG = document.querySelector('.search-ingredients');

  SEARCHTAG.addEventListener('keyup', () => {
    const INPUTTAG = SEARCHTAG.value.trim();
    TagSearch(INPUTTAG);
  });
  const LINKTAG = document.querySelectorAll('.linkTag');
  for (let p = 0; p < LINKTAG.length; p += 1) {
    LINKTAG[p].addEventListener('click', () => {
      const LINK = LINKTAG[p].innerHTML;
      Addlinktag(LINK);
    });
  }
}

function CloseTagIngredient() {
  DROPDOWNINGREDIENT.classList.remove('active');
  DROPBTNPRIMARY.innerHTML = 'Ingrédients <em class="fa-solid fa-angle-down angle-down"></em>';
  DROPBTNPRIMARY.addEventListener('click', OpenTagIngredient);
  DROPBTN.style.setProperty('border-radius', '5px');
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
    this.availableIngredientsTags = array;
    this.tagfilter = arraysearchtag;
  }

  /* method for all Tag Ingredients */
  TagIngredientAvailable() {
    DROPDOWNMENU[0].innerHTML = '';
    for (let j = 0; j < this.ingredients.length; j += 1) {
      this.availableIngredientsTags.push(this.ingredients[j].ingredient.toLowerCase());
    }
    const Tag = [...new Set(this.availableIngredientsTags)];

    for (let e = 0; e < Tag.length; e += 1) {
      const FINISH = TagIngredient(Tag[e]);
      DROPDOWNMENU[0].appendChild(FINISH);
    }
  }

  /* method for filter Tags */
  TagFilter() {
    DROPDOWNMENU[0].innerHTML = '';
    const Filter = [...new Set(this.tagfilter)];
    for (let m = 0; m < Filter.length; m += 1) {
      const FILTERTAG = TagIngredient(Filter[m]);
      DROPDOWNMENU[0].appendChild(FILTERTAG);
    }
  }
}

/* function send data recipes */

function DisplayData(DataRecipe) {
  array = [];
  DROPDOWNMENU[0].innerHTML = '';
  for (let a = 0; a < DataRecipe.length; a += 1) {
    const NEWRECIPES = new Recipe(DataRecipe[a]);
    NEWRECIPES.TagIngredientAvailable();
    const recipesDOM = createRecipesCardDOM(NEWRECIPES);
    RECIPESZONE.appendChild(recipesDOM);
  }
}

/* function filter */
function Search(INPUT) {
  if (INPUT.length > 2) {
    const ARRAYFILTER = [];

    // algo search recette full boucle Native
    for (let z = 0; z < recipes.length; z += 1) {
      if (recipes[z].name.toLowerCase().indexOf(INPUT.toLowerCase()) > -1) {
        ARRAYFILTER.push(recipes[z]);
      }
      if (recipes[z].description.toLowerCase().indexOf(INPUT.toLowerCase()) > -1) {
        ARRAYFILTER.push(recipes[z]);
      }

      for (let x = 0; x < recipes[z].ingredients.length; x += 1) {
        const INGREDIENTS = recipes[z].ingredients;

        if (INGREDIENTS[x].ingredient.toLowerCase().indexOf(INPUT.toLowerCase()) > -1) {
          ARRAYFILTER.push(recipes[z]);
        }
      }
    }

    const RESULTFILTER = [...new Set(ARRAYFILTER)];
    RECIPESZONE.innerHTML = '';

    DisplayData(RESULTFILTER);
  }
  const LINKTAG = document.querySelectorAll('.linkTag');
  for (let p = 0; p < LINKTAG.length; p += 1) {
    LINKTAG[p].addEventListener('click', () => {
      const LINK = LINKTAG[p].innerHTML;
      Addlinktag(LINK);
    });
  }
}
/* function TAG search Ingredient */
function TagSearch(INPUTTAG) {
  arraysearchtag = [];
  if (INPUTTAG.length > 2) {
    for (let w = 0; w < recipes.length; w += 1) {
      for (let x = 0; x < recipes[w].ingredients.length; x += 1) {
        const TAGS = recipes[w].ingredients;

        if (TAGS[x].ingredient.toLowerCase().indexOf(INPUTTAG.toLowerCase()) > -1) {
          arraysearchtag.push(TAGS[x].ingredient.toLowerCase());
          console.log(TAGS[x].ingredient.toLowerCase());
        }
      }
    }

    for (let a = 0; a < arraysearchtag.length; a += 1) {
      const NEWRECIPES = new Recipe(arraysearchtag[a]);
      NEWRECIPES.TagFilter();
    }
    const LINKTAG = document.querySelectorAll('.linkTag');
    for (let p = 0; p < LINKTAG.length; p += 1) {
      LINKTAG[p].addEventListener('click', () => {
        const LINK = LINKTAG[p].innerHTML;
        Addlinktag(LINK);
      });
    }
  }
}

function Addlinktag(LINK) {
  let END = [];
  if (!DivTag.innerHTML) {
    const ADDTAGS = Addtag(LINK);
    DivTag.appendChild(ADDTAGS);
    arrayTag.push(LINK);
  } else if (DivTag.innerHTML.indexOf(LINK) === -1) {
    const ADDTAGS = Addtag(LINK);
    DivTag.appendChild(ADDTAGS);
    arrayTag.push(LINK);
  }

  for (let n = 0; n < recipes.length; n += 1) {
    for (let x = 0; x < recipes[n].ingredients.length; x += 1) {
      const INGREDIENTS = recipes[n].ingredients;
        if (INGREDIENTS[x].ingredient.toLowerCase().indexOf(arrayTag[0].toLowerCase()) > -1) {
          ARRAYFILTERTAG.push(recipes[n]);
          END = [...new Set(ARRAYFILTERTAG)];
          RECIPESZONE.innerHTML = '';
          DisplayData(END);
      }
      
    }
  }   
      let TagEnd = [];
      
         for(let p = 0; p < END.length; p += 1) {
          for (let x = 0; x < END[p].ingredients.length; x += 1) {
            const INGREDIENTsS = recipes[p].ingredients;
            if(INGREDIENTsS[x].ingredient.toLowerCase().indexOf(arrayTag[1].toLowerCase()) > -1) {
               TagEnd.push(END[p]);
              let ENDs = [...new Set(TagEnd)];
              console.log(ENDs)
              RECIPESZONE.innerHTML = '';
              DisplayData(ENDs);
            }
          }
        }
}

DisplayData(recipes);
