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

  /* Method for display filter Tags Ingredient */
  tagFilter() {
    dropdownmenu[0].innerHTML = '';
    const Filter = [...new Set(this.tagfilter)];
    for (let i = 0; i < Filter.length; i += 1) {
      const FILTERTAG = tagIngredient(Filter[i]);
      dropdownmenu[0].appendChild(FILTERTAG);
    }
  }

  /* Method for display filter Tags Appareils */
  tagFilterAp() {
    dropdownmenu[1].innerHTML = '';
    const Filter = [...new Set(this.tagfilterAp)];
    for (let i = 0; i < Filter.length; i += 1) {
      const FILTERTAG = tagIngredient(Filter[i]);
      dropdownmenu[1].appendChild(FILTERTAG);
    }
  }

  /* Method for display filter Tags Ustensils */
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
      const TAGS = recipes[i].ingredients;

      if (includes(TAGS[j].ingredient.toLowerCase().trim(), INPUTTAG.toLowerCase().trim()) === true) {
        arraysearchtag.push(TAGS[j].ingredient.toLowerCase());
      }
    }
  }
  for (let k = 0; k < arraysearchtag.length; k += 1) {
    const NEWRECIPES = new TagFilters();
    NEWRECIPES.tagFilter();
  }
  linkTag();
}

/* function TAG search Appareils */
function tagSearchAp(INPUTTAG) {
  arraysearchtagAp = [];

  for (let i = 0; i < recipes.length; i += 1) {
    const TAGS = recipes[i];

    if (includes(TAGS.appliance.toLowerCase().trim(), INPUTTAG.toLowerCase().trim()) === true) {
      arraysearchtagAp.push(TAGS.appliance.toLowerCase());
    }
  }
  for (let k = 0; k < arraysearchtagAp.length; k += 1) {
    const NEWRECIPES = new TagFilters();
    NEWRECIPES.tagFilterAp();
  }
  linkTag();
}

/* function TAG search Appareils */
function tagSearchUs(INPUTTAG) {
  arraysearchtagUs = [];

  for (let i = 0; i < recipes.length; i += 1) {
    for (let j = 0; j < recipes[i].ustensils.length; j += 1) {
      const TAGS = recipes[i].ustensils[j];
      if (includes(TAGS.toLowerCase().trim(), INPUTTAG.toLowerCase().trim()) === true) {
        arraysearchtagUs.push(TAGS.toLowerCase());
      }
    }
  }

  for (let k = 0; k < arraysearchtagUs.length; k += 1) {
    const NEWRECIPES = new TagFilters();
    NEWRECIPES.tagFilterUs();
  }
  linkTag();
}
/* function for add Tag */
function addLinkTag(LINK) {
  /* if not tag */
  if (!DivTag.innerHTML) {
    const ADDTAGS = addTag(LINK);
    DivTag.appendChild(ADDTAGS);
    arrayTag.push(LINK);
    /* loop for color tag */
    for (let i = 0; i < recipes.length; i++) {
      if (includes(recipes[i].appliance.toLowerCase().trim(), LINK.toLowerCase().trim()) === true) {
        DivTag.firstChild.classList.add('green');
      }
      for (let j = 0; j < recipes[i].ustensils.length; j++) {
        if (includes(recipes[i].ustensils[j].toLowerCase().trim(), LINK.toLowerCase().trim()) === true) {
          DivTag.firstChild.classList.add('red');
        }
      }
    }

    /* if tag but not his click tag */
  } else if (includes(DivTag.innerHTML, LINK) === false) {
    const ADDTAGS = addTag(LINK);
    DivTag.appendChild(ADDTAGS);
    arrayTag.push(LINK);
    /* loop for color tag */
    for (let i = 0; i < recipes.length; i++) {
      if (includes(recipes[i].appliance.toLowerCase().trim(), LINK.toLowerCase().trim()) === true) {
        DivTag.lastChild.classList.add('green');
      }
      for (let j = 0; j < recipes[i].ustensils.length; j++) {
        if (includes(recipes[i].ustensils[j].toLowerCase().trim(), LINK.toLowerCase().trim()) === true) {
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
  for (let i = 0; i < supTag.length; i += 1) {
    supTag[i].addEventListener('click', () => {
      arrayTag = [];
      globalClass.deleteLink(supTag[i].innerText);
      supTag[i].remove();
    });
  }
}
