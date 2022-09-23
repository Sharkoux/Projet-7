/* eslint-disable no-console */
/* eslint-disable import/extensions */
/* eslint-disable no-use-before-define */
/* eslint-disable no-unused-vars */

import { recipes } from '../data/recipes.js';
import { Includes, GetRessource } from './helper.js';


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
let RESULTFILTER = [];
const ARRAYFILTERTAG = [];

/* Event */

SEARCHINPUT.addEventListener('input', () => {
  const INPUT = SEARCHINPUT.value;
  console.log(INPUT.length);

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

  SEARCHTAG.addEventListener('input', () => {
    const INPUTTAG = SEARCHTAG.value.trim();
    TagSearch(INPUTTAG);
  });
  const LINKTAG = document.querySelectorAll('.linkTag');
  for (let i = 0; i < LINKTAG.length; i += 1) {
    LINKTAG[i].addEventListener('click', () => {
      const LINK = LINKTAG[i].innerHTML;
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
    this.linksTags = arrayTag;
    this.resultfilters = RESULTFILTER;
  }

  /* method for all Tag Ingredients */
  TagIngredientAvailable() {
    DROPDOWNMENU[0].innerHTML = '';
    for (let j = 0; j < this.ingredients.length; j += 1) {
      this.availableIngredientsTags.push(this.ingredients[j].ingredient.toLowerCase());
    }
    const Tag = [...new Set(this.availableIngredientsTags)];

    for (let k = 0; k < Tag.length; k += 1) {
      const FINISH = TagIngredient(Tag[k]);
      DROPDOWNMENU[0].appendChild(FINISH);
    }
  }

  /* method for filter Tags */
  TagFilter() {
    DROPDOWNMENU[0].innerHTML = '';
    const Filter = [...new Set(this.tagfilter)];
    for (let i = 0; i < Filter.length; i += 1) {
      const FILTERTAG = TagIngredient(Filter[i]);
      DROPDOWNMENU[0].appendChild(FILTERTAG);
    }
  }

  LinkTags() {
    let newlist = [];

    for (let i = 0; i < this.resultfilters.length; i += 1) {
    
      const INGREDIENTS = GetRessource(this.resultfilters[i]); // ingredient list by recipe
      //console.log(INGREDIENTS)
      let flag = 0;

      for (let j = 0; j < this.linksTags.length; j += 1) {
        const currentTag = this.linksTags[j];
        console.log(currentTag)
        for (let k = 0; k < INGREDIENTS.length; k += 1) {
          console.log(INGREDIENTS[j])
          if (INGREDIENTS[j] === currentTag) {
            flag += 1;
            break;
          }
        }
      }

      if (flag === this.linksTags.length) {
        newlist.push(this.resultfilters[i]);
      }
    }
    
    DisplayData(newlist);
  }
}
   
/* function send data recipes */

function DisplayData(DataRecipe) {
  array = [];
  DROPDOWNMENU[0].innerHTML = '';
  for (let i = 0; i < DataRecipe.length; i += 1) {
    const NEWRECIPES = new Recipe(DataRecipe[i]);
    NEWRECIPES.TagIngredientAvailable();
    const recipesDOM = createRecipesCardDOM(NEWRECIPES);
    RECIPESZONE.appendChild(recipesDOM);
    RESULTFILTER = DataRecipe;
  }

  const LINKTAG = document.querySelectorAll('.linkTag');
  for (let j = 0; j < LINKTAG.length; j += 1) {
    LINKTAG[j].addEventListener('click', () => {
      const LINK = LINKTAG[j].innerHTML;
      Addlinktag(LINK);
    });
  }
}

/* function filter */
function Search(INPUT) {
  const ARRAYFILTER = [];

  if (INPUT.length >= 2) {
    // algo search recette full boucle Native
    for (let i = 0; i < recipes.length; i += 1) {
      if (Includes(recipes[i].name.toLowerCase().trim(), INPUT.toLowerCase().trim()) === true) {
        ARRAYFILTER.push(recipes[i]);
      }
      if (Includes(recipes[i].description.toLowerCase().trim(), INPUT.toLowerCase().trim()) === true) {
        ARRAYFILTER.push(recipes[i]);
      }

      for (let j = 0; j < recipes[i].ingredients.length; j += 1) {
        const INGREDIENTS = recipes[i].ingredients;

        if (Includes(INGREDIENTS[j].ingredient.toLowerCase().trim(), INPUT.toLowerCase().trim()) === true) {
          ARRAYFILTER.push(recipes[i]);
        }
      }
    }

    RESULTFILTER = [...new Set(ARRAYFILTER)];

    RECIPESZONE.innerHTML = '';

    DisplayData(RESULTFILTER);
  }
}
/* function TAG search Ingredient */
function TagSearch(INPUTTAG) {
  arraysearchtag = [];

  for (let i = 0; i < recipes.length; i += 1) {
    for (let j = 0; j < recipes[i].ingredients.length; j += 1) {
      const TAGS = recipes[i].ingredients;

      if (Includes(TAGS[j].ingredient.toLowerCase().trim(), INPUTTAG.toLowerCase().trim()) === true) {
        arraysearchtag.push(TAGS[j].ingredient.toLowerCase());
      }
    }
  }

  for (let k = 0; k < arraysearchtag.length; k += 1) {
    const NEWRECIPES = new Recipe(arraysearchtag[k]);
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

function Addlinktag(LINK) {
  if (!DivTag.innerHTML) {
    const ADDTAGS = Addtag(LINK);
    DivTag.appendChild(ADDTAGS);
    arrayTag.push(LINK);
  } else if (Includes(DivTag.innerHTML, LINK) === false) {
    const ADDTAGS = Addtag(LINK);
    DivTag.appendChild(ADDTAGS);
    arrayTag.push(LINK);
  }

  const arrayTags = new Recipe(arrayTag);
  arrayTags.LinkTags();

/*
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
  const TagEnd = [];

  for (let p = 0; p < END.length; p += 1) {
    for (let x = 0; x < END[p].ingredients.length; x += 1) {
      const INGREDIENTsS = END[p].ingredients;
      if (INGREDIENTsS[x].ingredient.toLowerCase().indexOf(arrayTag[1].toLowerCase()) > -1) {
        TagEnd.push(END[p]);
        const ENDs = [...new Set(TagEnd)];
        console.log(ENDs);
        RECIPESZONE.innerHTML = '';
        DisplayData(ENDs);
      }
    }
  }
  */
}

DisplayData(recipes);
