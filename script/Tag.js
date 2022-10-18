/* eslint-disable max-len */
/* eslint-disable no-plusplus */
/* eslint-disable no-use-before-define */
/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */

let arraysearchtag = [];
let arraysearchtagAp = [];
let arraysearchtagUs = [];

/* class for tag */
class TagFilters {
  constructor() {
    this.tagfilter = arraysearchtag;
    this.tagfilterAp = arraysearchtagAp;
    this.tagfilterUs = arraysearchtagUs;
  }

  /* Method for display filter tags Ingredient */
  tagFilter() {
    dropdownmenu[0].innerHTML = '';
    const Filter = [...new Set(this.tagfilter)];
    
    for (let i = 0; i < Filter.length; i += 1) {
      const FILTERTAG = tagIngredient(Filter[i]);
      dropdownmenu[0].appendChild(FILTERTAG);
    }
  }

  /* Method for display filter tags Appareils */
  tagFilterAp() {
    dropdownmenu[1].innerHTML = '';
    const Filter = [...new Set(this.tagfilterAp)];
    for (let i = 0; i < Filter.length; i += 1) {
      const FILTERTAG = tagIngredient(Filter[i]);
      dropdownmenu[1].appendChild(FILTERTAG);
    }
  }

  /* Method for display filter tags Ustensils */
  tagFilterUs() {
    dropdownmenu[2].innerHTML = '';
    const Filter = [...new Set(this.tagfilterUs)];
    for (let i = 0; i < Filter.length; i += 1) {
      const FILTERTAG = tagIngredient(Filter[i]);
      dropdownmenu[2].appendChild(FILTERTAG);
    }
  }
}

/* function TAG search Ingredient */
function tagSearch(INPUTTAG) {
  arraysearchtag = [];

  for (let i = 0; i < recipes.length; i += 1) {
    for (let j = 0; j < recipes[i].ingredients.length; j += 1) {
      const tags = recipes[i].ingredients;
      const tagIngredient = getTrim(tags[j].ingredient);
      const inputTag = getTrim(INPUTTAG);
      if (includes(tagIngredient, inputTag)) {
        arraysearchtag.push(tagIngredient);
      }
    }
  }

  for (let k = 0; k < arraysearchtag.length; k += 1) {
    const NEWRECIPES = new TagFilters();
    NEWRECIPES.tagFilter();
  }
  if (!INPUT) {
    resultFilter = recipes;
  }
  linkTag();
}

/* function TAG search Appareils */
function tagSearchAp(INPUTTAG) {
  arraysearchtagAp = [];

  for (let i = 0; i < recipes.length; i += 1) {
    const tags = recipes[i];
    const tagAppliance = getTrim(tags.appliance);
    const inputTag = getTrim(INPUTTAG);
    if (includes(tagAppliance, inputTag)) {
      arraysearchtagAp.push(tags.appliance.toLowerCase());
    }
  }
  for (let k = 0; k < arraysearchtagAp.length; k += 1) {
    const NEWRECIPES = new TagFilters();
    NEWRECIPES.tagFilterAp();
  }
  if (!INPUT) {
    resultFilter = recipes;
  }
  linkTag();
}

/* function TAG search Appareils */
function tagsearchUs(INPUTTAG) {
  arraysearchtagUs = [];

  for (let i = 0; i < recipes.length; i += 1) {
    for (let j = 0; j < recipes[i].ustensils.length; j += 1) {
      const tags = getTrim(recipes[i].ustensils[j]);
      const inputTag = getTrim(INPUTTAG);
      if (includes(tags, inputTag)) {
        arraysearchtagUs.push(tags.toLowerCase());
      }
    }
  }

  for (let k = 0; k < arraysearchtagUs.length; k += 1) {
    const NEWRECIPES = new TagFilters();
    NEWRECIPES.tagFilterUs();
  }
  if (!INPUT) {
    resultFilter = recipes;
  }
  linkTag();
}
/* function for add Tag */
function addLinkTag(LINK) {
  const link = getTrim(LINK);
 
  /* if not tag */
  if (!DivTag.innerHTML) {
    const ADDtags = addTag(LINK);
    DivTag.appendChild(ADDtags);
    arrayTag.push(LINK);
    
    /* loop for color tag */

    for (let i = 0; i < recipes.length; i++) {
      const recipesAppliance = getTrim(recipes[i].appliance);

      if (includes(recipesAppliance, link)) {
        DivTag.firstChild.classList.add('green');
      }
      for (let j = 0; j < recipes[i].ustensils.length; j++) {
        const recipesUstensils = getTrim(recipes[i].ustensils[j]);

        if (includes(recipesUstensils, link)) {
          DivTag.firstChild.classList.add('red');
        }
      }
    }
    
    /* if tag but not his click tag */
  } else if (includes(DivTag.innerHTML, LINK) === false) {
    const ADDtags = addTag(LINK);
    DivTag.appendChild(ADDtags);
    arrayTag.push(LINK);
    /* loop for color tag */
    for (let i = 0; i < recipes.length; i++) {
      const recipesAppliances = getTrim(recipes[i].appliance);
      if (includes(recipesAppliances, link)) {
        DivTag.lastChild.classList.add('green');
      }
      for (let j = 0; j < recipes[i].ustensils.length; j++) {
        const recipeUstensils = getTrim(recipes[i].ustensils[j]);
        if (includes(recipeUstensils, link)) {
          DivTag.lastChild.classList.add('red');
        }
      }
    }
  }
  
  /* loop for delete tag */
  const supTag = document.querySelectorAll('.divtags'); // HTMLCOllection
  const arr = Array.from(supTag).map((tagEl) => tagEl.innerText);

  const globalClass = new Recipe(arr);
  arraytags = arrayTag;
  globalClass.linkTags(arrayTag);
  
  const linkTgaz = document.querySelectorAll('.linkTag');
  for(let j = 0; j < arraytags.length; j += 1) {
  for(let i = 0; i < linkTgaz.length; i += 1){
    if(getTrim(linkTgaz[i].innerHTML) === getTrim(arraytags[j])) {
      linkTgaz[i].style.display = "none";
    }
    
  }
}
  for (let i = 0; i < supTag.length; i += 1) {
    supTag[i].addEventListener('click', () => {
      arrayTag = [];
      globalClass.deleteLink(supTag[i].innerText);
      supTag[i].remove();
      const linkTgaz = document.querySelectorAll('.linkTag');
      for(let j = 0; j < arraytags.length; j += 1) {
      for(let i = 0; i < linkTgaz.length; i += 1){
        if(getTrim(linkTgaz[i].innerHTML) === getTrim(arraytags[j])) {
          linkTgaz[i].style.display = "none";
        }
        
      }
    }
    });
  }
}
