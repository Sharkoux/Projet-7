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
const DROPBTN = document.querySelectorAll('.drop_btn');
const ROWUP = document.querySelectorAll('.angle-up');
const DivTag = document.querySelector('.divtag');

let arraysearchtag = [];
let array = [];
const arrays = [];
const arrayUstensils = [];
const arrayTag = [];
let RESULTFILTER = [];
const ARRAYFILTERTAG = [];
const link = [];
let newlist = [];
/* Event */

SEARCHINPUT.addEventListener('input', () => {
  const INPUT = SEARCHINPUT.value;
  console.log(INPUT.length);

  Search(INPUT);
});

DROPBTNPRIMARY.addEventListener('click', OpenTagIngredient);
DROPBTNAPPAREILS.addEventListener('click', OpenTagAppareils);
DROPBTNUSTENCILS.addEventListener('click', OpenTagUstensiles);

document.addEventListener('keydown', (e) => {
  const KEYCODE = e.KEYCODE ? e.KEYCODE : e.which;
  if (KEYCODE === 27) {
    CloseTagIngredient();
    CloseTagAppareil();
    CloseTagUstensils();
  }
});

/* function open / close filter */

/* Open Ingredient */
function OpenTagIngredient() {
  DROPDOWNINGREDIENT.classList.toggle('active');
  DROPBTN[0].style.setProperty('border-radius', '5px 5px 0 0');
  DROPBTNPRIMARY.innerHTML = '<input class="input form-control search-ingredients blue" type="text" placeholder="Rechercher un ingrédient"></input><em class="fa-solid fa-angle-up angle-up"></em>';
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
  DROPBTN[0].style.setProperty('border-radius', '5px');
}

/* Open Appareils */

function OpenTagAppareils() {
  document.querySelector('.btn_appareils').classList.toggle('active');
  DROPBTN[1].style.setProperty('border-radius', '5px 5px 0 0');
  document.querySelector('.btn-appareils').innerHTML = '<input class="input form-control search-appareils green" type="text" placeholder="Rechercher un appareils"></input><em class="fa-solid fa-angle-up angle-up"></em>';
  document.querySelector('.btn-appareils').removeEventListener('click', OpenTagAppareils);
  const SEARCHTAG = document.querySelector('.search-appareils');

  /*
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
  */
}

function CloseTagAppareil() {
  document.querySelector('.btn_appareils').classList.remove('active');
  document.querySelector('.btn-appareils').innerHTML = 'Appareils <em class="fa-solid fa-angle-down angle-down"></em>';
  document.querySelector('.btn-appareils').addEventListener('click', OpenTagAppareils);
  DROPBTN[1].style.setProperty('border-radius', '5px');
}

/* Open Ustensiles */

function OpenTagUstensiles() {
  document.querySelector('.btn_danger').classList.toggle('active');
  DROPBTN[2].style.setProperty('border-radius', '5px 5px 0 0');
  document.querySelector('.btn-danger').innerHTML = '<input class="input form-control search-ustensils red" type="text" placeholder="Rechercher un ustensiles"></input><em class="fa-solid fa-angle-up angle-up"></em>';
  document.querySelector('.btn-danger').removeEventListener('click', OpenTagUstensiles);
  const SEARCHTAG = document.querySelector('.search-ustensils');

  /*
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
  */
}

function CloseTagUstensils() {
  document.querySelector('.btn_danger').classList.remove('active');
  document.querySelector('.btn-danger').innerHTML = 'Ustensiles <em class="fa-solid fa-angle-down angle-down"></em>';
  document.querySelector('.btn-danger').addEventListener('click', OpenTagUstensiles);
  DROPBTN[2].style.setProperty('border-radius', '5px');
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
    this.availableApplianceTags = arrays;
    this.availableUstensilsTag = arrayUstensils;
    this.tagfilter = arraysearchtag;
    this.linksTags = arrayTag;
    this.resultfilters = RESULTFILTER;
    this.newlist = newlist;
    this.link = link;
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

    DROPDOWNMENU[1].innerHTML = '';
    for (let i = 0; i < this.appliance.length; i += 1) {
      this.availableApplianceTags.push(this.appliance.toLowerCase());
    }
    const TagApp = [...new Set(this.availableApplianceTags)];

    for (let k = 0; k < TagApp.length; k += 1) {
      const FINISH = TagIngredient(TagApp[k]);
      DROPDOWNMENU[1].appendChild(FINISH);
    }

    DROPDOWNMENU[2].innerHTML = '';
    for (let i = 0; i < this.ustensils.length; i += 1) {
      this.availableUstensilsTag.push(this.ustensils[i].toLowerCase());
    }
    const TagUs = [...new Set(this.availableUstensilsTag)];

    for (let k = 0; k < TagUs.length; k += 1) {
      const FINISH = TagIngredient(TagUs[k]);
      DROPDOWNMENU[2].appendChild(FINISH);
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
  

  DeleteLink() {
    this.link = link;
    console.log(this.linksTags);
   
      for (let i = 0; i < this.linksTags.length; i += 1) {
        for (let j = 0; j < this.link.length; j += 1) {
        if (Includes(this.linksTags[i].toLowerCase().trim(), this.link[j].toLowerCase().trim()) === true) {
          this.linksTags.splice([i], 1);
          if(this.linksTags.length < 1) {
          DisplayData(recipes);
          }
          else {
          for(let k = 0; k < this.linksTags.length; k += 1) {
          console.log(this.linksTags[k].toLowerCase().trim())
          Search(this.linksTags[k].toLowerCase().trim())
          }
          }
        }
      }
    }
    return this.linksTags;
    
  }



  LinkTags() {
    newlist = [];
    
    for (let i = 0; i < this.resultfilters.length; i += 1) {
      const INGREDIENTS = GetRessource(this.resultfilters[i]);

      let flag = 0;

      for (let j = 0; j < this.linksTags.length; j += 1) {
        const currentTag = this.linksTags[j];

        for (let k = 0; k < INGREDIENTS.length; k += 1) {
          if (INGREDIENTS[k].toLowerCase() === currentTag.toLowerCase()) {
            flag += 1;
            break;
          }
        }

        if (flag === this.linksTags.length) {
          newlist.push(this.resultfilters[i]);
        }
      }
    }

    /*
    if(Includes(newlis, this.link[0].toLowerCase().trim()) === true){
      console.log(newlist)
      newlist.splice([j], 1);
    }

    */

    RECIPESZONE.innerHTML = '';
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
  console.log(INPUT)
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

  const supTag = document.querySelectorAll('.divtags');
  for (let i = 0; i < supTag.length; i += 1) {
    supTag[i].addEventListener('click', () => {
      supTag[i].remove();
      link.push(supTag[i].firstChild.innerHTML.toLowerCase().trim());
      const testarray = new Recipe(link);
      testarray.DeleteLink();
    });

  /*
  for (let i = 0; i < supTag.length; i += 1) {
    if(LINK === supTag[i].firstChild.innerHTML && arrayTag.length > 1) {
      arrayTag.splice([i], 1);
  }
}
 */
  }



  const arrayTags = new Recipe(arrayTag);
  arrayTags.LinkTags();
}
/*
function Delete(Del) {
  link = [];
    if(Includes(link, Del) === false){
    link.push(Del.toLowerCase());

  };
  console.log(link)

  const Deletes = new Recipe();
  Deletes.LinkTags();

}
*/

DisplayData(recipes);
