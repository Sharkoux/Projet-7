/* eslint-disable no-plusplus */
/* eslint-disable no-use-before-define */
/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */

let arraysearchtag = [];
let arraysearchtagAp = [];
let arraysearchtagUs = [];

/* function TAG search Ingredient */
function tagSearch(INPUTTAG) {
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
    NEWRECIPES.tagFilter();
  }
  const LINKTAG = document.querySelectorAll('.linkTag');
  for (let p = 0; p < LINKTAG.length; p += 1) {
    LINKTAG[p].addEventListener('click', () => {
      const LINK = LINKTAG[p].innerHTML;
      addLinkTag(LINK);
    });
  }
}

/* function TAG search Appareils */
function tagSearchAp(INPUTTAG) {
  arraysearchtagAp = [];

  for (let i = 0; i < recipes.length; i += 1) {
    const TAGS = recipes[i];

    if (Includes(TAGS.appliance.toLowerCase().trim(), INPUTTAG.toLowerCase().trim()) === true) {
      arraysearchtagAp.push(TAGS.appliance.toLowerCase());
    }
  }

  for (let k = 0; k < arraysearchtagAp.length; k += 1) {
    const NEWRECIPES = new Recipe(arraysearchtagAp[k]);
    NEWRECIPES.tagFilterAp();
  }

  const LINKTAG = document.querySelectorAll('.linkTag');
  for (let p = 0; p < LINKTAG.length; p += 1) {
    LINKTAG[p].addEventListener('click', () => {
      const LINK = LINKTAG[p].innerHTML;
      addLinkTag(LINK);
    });
  }
}

/* function TAG search Appareils */
function tagSearchUs(INPUTTAG) {
  arraysearchtagUs = [];

  for (let i = 0; i < recipes.length; i += 1) {
    for (let j = 0; j < recipes[i].ustensils.length; j += 1) {
      const TAGS = recipes[i].ustensils[j];
      if (Includes(TAGS.toLowerCase().trim(), INPUTTAG.toLowerCase().trim()) === true) {
        arraysearchtagUs.push(TAGS.toLowerCase());
      }
    }
  }

  for (let k = 0; k < arraysearchtagUs.length; k += 1) {
    const NEWRECIPES = new Recipe(arraysearchtagUs[k]);
    NEWRECIPES.tagFilterUs();
  }

  const LINKTAG = document.querySelectorAll('.linkTag');
  for (let p = 0; p < LINKTAG.length; p += 1) {
    LINKTAG[p].addEventListener('click', () => {
      const LINK = LINKTAG[p].innerHTML;
      addLinkTag(LINK);
    });
  }
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
      if (Includes(recipes[i].appliance.toLowerCase().trim(), LINK.toLowerCase().trim()) === true) {
        DivTag.firstChild.classList.add('green');
      }
      for (let j = 0; j < recipes[i].ustensils.length; j++) {
        if (Includes(recipes[i].ustensils[j].toLowerCase().trim(), LINK.toLowerCase().trim()) === true) {
          DivTag.firstChild.classList.add('red');
        }
      }
    }
    
    /* if tag but not click tag */
  } else if (Includes(DivTag.innerHTML, LINK) === false) {
    const ADDTAGS = addTag(LINK);
    DivTag.appendChild(ADDTAGS);
    arrayTag.push(LINK);
    /* loop for color tag */
    for (let i = 0; i < recipes.length; i++) {
      if (Includes(recipes[i].appliance.toLowerCase().trim(), LINK.toLowerCase().trim()) === true) {
        DivTag.lastChild.classList.add('green');
      }
      for (let j = 0; j < recipes[i].ustensils.length; j++) {
        if (Includes(recipes[i].ustensils[j].toLowerCase().trim(), LINK.toLowerCase().trim()) === true) {
          DivTag.lastChild.classList.add('red');
        }
      }
    }
  }

  console.log(arrayTag)
  /* loop for delete tag */
  const supTag = document.querySelectorAll('.divtags'); // HTMLCOllection
  const arr = Array.from(supTag).map((tagEl) => tagEl.innerText);

  const globalClass = new Recipe(arr);

  globalClass.linkTags(arrayTag);
  for (let i = 0; i < supTag.length; i += 1) {
    supTag[i].addEventListener('click', () => {
      arrayTag = [];
      globalClass.deleteLink(supTag[i].innerText);
      supTag[i].remove();
    });
  }
}
