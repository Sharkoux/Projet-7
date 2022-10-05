/* eslint-disable no-plusplus */
/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
const RECIPESZONE = document.querySelector('.recipes_card');
const DROPDOWNMENU = document.querySelectorAll('.dropdown-menu');

const DivTag = document.querySelector('.divtag');

let array = [];
let arrays = [];
let arrayUstensils = [];
let arrayTag = [];
let RESULTFILTER = [];
const link = [];

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
    this.linksTags = arrayTag;
    this.resultfilters = RESULTFILTER;
  }

  /* method for available Tag display */
  tagIngredientAvailable() {
    /* Display ingredients Tags */
    DROPDOWNMENU[0].innerHTML = '';
    for (let j = 0; j < this.ingredients.length; j += 1) {
      this.availableIngredientsTags.push(this.ingredients[j].ingredient.toLowerCase().trim());
    }
    const Tag = [...new Set(this.availableIngredientsTags)];

    for (let k = 0; k < Tag.length; k += 1) {
      const FINISH = tagIngredient(Tag[k]);
      DROPDOWNMENU[0].appendChild(FINISH);
    }
    /* Display appliance Tags */
    DROPDOWNMENU[1].innerHTML = '';
    for (let i = 0; i < this.appliance.length; i += 1) {
      this.availableApplianceTags.push(this.appliance.toLowerCase().trim());
    }
    const TagApp = [...new Set(this.availableApplianceTags)];

    for (let k = 0; k < TagApp.length; k += 1) {
      const FINISH = tagIngredient(TagApp[k]);
      DROPDOWNMENU[1].appendChild(FINISH);
    }
    /* Display ustensils Tags */
    DROPDOWNMENU[2].innerHTML = '';
    for (let i = 0; i < this.ustensils.length; i += 1) {
      this.availableUstensilsTag.push(this.ustensils[i].toLowerCase().trim());
    }
    const TagUs = [...new Set(this.availableUstensilsTag)];

    for (let k = 0; k < TagUs.length; k += 1) {
      const FINISH = tagIngredient(TagUs[k]);
      DROPDOWNMENU[2].appendChild(FINISH);
    }
  }

  /* Method delete tag filter */
  deleteLink(tag) {
    const newList = [];
    for (let i = 0; i < this.linksTags.length; i++) {
      if (this.linksTags[i] !== tag) {
        newList.push(this.linksTags[i]);
      }
    }
    this.linksTags = newList;
   
    if (this.linksTags.length > 0) {
      this.linkTags();
    } else {
      RECIPESZONE.innerHTML = '';
      displayData(this.resultfilters);
    }

    return this.linksTags;
  }

  /* Method for display new Tag filter  */
  linkTags() {
    const newlist = [];
   
    for (let i = 0; i < this.resultfilters.length; i += 1) {
      const INGREDIENTS = getRessource(this.resultfilters[i]);

      let flag = 0;

      for (let j = 0; j < this.linksTags.length; j += 1) {
        const currentTag = this.linksTags[j];

        for (let k = 0; k < INGREDIENTS.length; k += 1) {
          if (INGREDIENTS[k].toLowerCase().trim().includes(currentTag.toLowerCase().trim()) === true) {
            flag += 1;
            break;
          }
        }

        if (flag === this.linksTags.length) {
          newlist.push(this.resultfilters[i]);
        }
      }
    }

    RECIPESZONE.innerHTML = '';
    displayData(newlist);
  }
}



 function displayData(Datarecipe) {
  array = [];
  arrays = [];
  arrayUstensils = [];
  DROPDOWNMENU[0].innerHTML = '';
  Datarecipe.forEach((element) => {
    const NEWRECIPES = new Recipe(element);
    NEWRECIPES.tagIngredientAvailable();
    const recipesDOM = createRecipesCardDOM(NEWRECIPES);
    RECIPESZONE.appendChild(recipesDOM);
    if (RESULTFILTER.length === 0) {
      RESULTFILTER = Datarecipe;
    }
  });
  const LINKTAG = document.querySelectorAll('.linkTag');
  for (let j = 0; j < LINKTAG.length; j += 1) {
    LINKTAG[j].addEventListener('click', () => {
      const LINK = LINKTAG[j].innerHTML;
      addLinkTag(LINK);
    });
  }
}


/* function filter */
function addSearch(INPUT) {
  const ARRAYFILTER = [];
  
  if (INPUT.length >= 2) {
    
    const filtIngredients = (ingredients) => ingredients.find((item) => item.ingredient.includes(INPUT));
    const ResultFilters = recipes.filter((item) => item.name.toLocaleLowerCase().includes(INPUT.toLocaleLowerCase())
    || item.description.includes(INPUT)
    || filtIngredients(item.ingredients));


    RECIPESZONE.innerHTML = '';
    
    displayData(ResultFilters);
  }
}

displayData(recipes)
