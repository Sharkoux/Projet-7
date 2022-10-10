/* eslint-disable max-len */
/* eslint-disable no-plusplus */
/* eslint-disable no-undef */
/* eslint-disable no-console */
/* eslint-disable import/extensions */
/* eslint-disable no-use-before-define */
/* eslint-disable no-unused-vars */

const recipeszone = document.querySelector('.recipes_card');
const dropdownmenu = document.querySelectorAll('.dropdown-menu');
let INPUT;

const DivTag = document.querySelector('.divtag');

let array = [];
let arrays = [];
let arrayUstensils = [];
let arrayTag = [];
let resultFilter = [];
let arraytags = [];
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
    this.resultfilters = resultFilter;
  }

  /* method for available tag display */
  tagIngredientAvailable() {
    /* Display ingredients Tags */
    dropdownmenu[0].innerHTML = '';
    for (let j = 0; j < this.ingredients.length; j += 1) {
      const ingredient = getTrim(this.ingredients[j].ingredient)
      this.availableIngredientsTags.push(ingredient);
    }
    const tag = [...new Set(this.availableIngredientsTags)];

    for (let k = 0; k < tag.length; k += 1) {
      const finish = tagIngredient(tag[k]);
      dropdownmenu[0].appendChild(finish);
    }
    /* Display appliance Tags */
    dropdownmenu[1].innerHTML = '';
    for (let i = 0; i < this.appliance.length; i += 1) {
      const appliance = getTrim(this.appliance);
      this.availableApplianceTags.push(appliance);
    }
    const tagApp = [...new Set(this.availableApplianceTags)];

    for (let k = 0; k < tagApp.length; k += 1) {
      const finish = tagIngredient(tagApp[k]);
      dropdownmenu[1].appendChild(finish);
    }
    /* Display ustensils Tags */
    dropdownmenu[2].innerHTML = '';
    for (let i = 0; i < this.ustensils.length; i += 1) {
      const ustensils = getTrim(this.ustensils[i])
      this.availableUstensilsTag.push(ustensils);
    }
    const tagUs = [...new Set(this.availableUstensilsTag)];

    for (let k = 0; k < tagUs.length; k += 1) {
      const finish = tagIngredient(tagUs[k]);
      dropdownmenu[2].appendChild(finish);
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
    arraytags = newList;
    if (this.linksTags.length > 0) {
      if (!INPUT) {
        this.resultfilters = recipes;
        this.linkTags();
      } else {
        this.linkTags();
      }
    } else if (!INPUT) {
      recipeszone.innerHTML = '';
      displayData(recipes);
      
    } else {
      recipeszone.innerHTML = '';
      displayData(this.resultfilters);
      
    }
  }

  /* Method for display new tag filter  */
  linkTags() {
    const newlist = [];
    for (let i = 0; i < this.resultfilters.length; i += 1) {
      const ingredientRessource = getRessource(this.resultfilters[i]);

      let flag = 0;

      for (let j = 0; j < this.linksTags.length; j += 1) {
        const currentTag = getTrim(this.linksTags[j]);
        console.log(currentTag)
        for (let k = 0; k < ingredientRessource.length; k += 1) {
          const ingredientRsc = getTrim(ingredientRessource[k]);

          if (includes(ingredientRsc, currentTag)) {
            flag += 1;
            break;
          }
        }

        if (flag === this.linksTags.length) {
          newlist.push(this.resultfilters[i]);
        }
      }
    }

    recipeszone.innerHTML = '';
    displayData(newlist);
  }
}

/* send data recipes to display function */

function displayData(DataRecipe) {
  array = [];
  arrays = [];
  arrayUstensils = [];

  dropdownmenu[0].innerHTML = '';
  for (let i = 0; i < DataRecipe.length; i += 1) {
    const newRecipes = new Recipe(DataRecipe[i]);
    newRecipes.tagIngredientAvailable();
    const recipesDOM = createRecipesCardDOM(newRecipes);
    recipeszone.appendChild(recipesDOM);
    if (resultFilter.length === 0) {
      resultFilter = DataRecipe;
    }
  }

  linkTag();
}

/* function filter (searchbar) */
function addSearch(INPUT) {
 
  if (INPUT.length >= 2 && arraytags.length === 0) {
    // algo search recette full boucle Native

    const newlist = [];
    for (let i = 0; i < recipes.length; i += 1) {
      const ingredientRessource = getRessource(recipes[i]);

      for (let k = 0; k < ingredientRessource.length; k += 1) {
        const ingredientRsc = getTrim(ingredientRessource[k]);
        const input = getTrim(INPUT);
        if (includes( ingredientRsc, input)) {
          newlist.push(recipes[i]);
          break;
        }
      }
    }
    resultFilter = [...new Set(newlist)];

    if (resultFilter.length > 0) {
      recipeszone.innerHTML = '';
      displayData(resultFilter);
    }
  }

  if (INPUT.length === 0 && arraytags.length > 0) {
    const newlist = [];

    for (let i = 0; i < recipes.length; i += 1) {
      const ingredientRessource = getRessource(recipes[i]);

      let flag = 0;

      for (let j = 0; j < arraytags.length; j += 1) {
        const currentTag = getTrim(arraytags[j]);

        for (let k = 0; k < ingredientRessource.length; k += 1) {
          const ingredientRsc = getTrim(ingredientRessource[k]);
          if (includes(ingredientRsc, currentTag)) {
            flag += 1;
            break;
          }
        }

        if (flag === arraytags.length) {
          newlist.push(recipes[i]);
        }
      }
    }

    if (newlist.length > 0) {
      recipeszone.innerHTML = '';
      displayData(newlist);
    }
  }
}

displayData(recipes);
