/* eslint-disable no-unused-vars */
/* eslint-disable no-plusplus */

/* function Includes boucle native */
const Includes = (str, t) => {
  let flag = false;
  for (let i = 0; i < str.length; i++) {
    if (str[i] === t[0]) {
      const Match = str.substring(i, i + t.length);
      if (Match === t) {
        flag = true;
        break;
      }
    }
  }
  return flag;
};
/* function for list array all element filter */

const getRessource = (recipe) => {
  const Rsc = [];

  const RecipeAp = recipe.appliance;
  const RecipUs = recipe.ustensils;
  const RecipIngr = recipe.ingredients;

  for (let i = 0; i < RecipeAp.length; i++) {
    Rsc.push(RecipeAp);
  }
  for (let j = 0; j < RecipUs.length; j++) {
    Rsc.push(RecipUs[j]);
  }

  for (let k = 0; k < RecipIngr.length; k++) {
    Rsc.push(RecipIngr[k].ingredient);
  }

  return Rsc;
};


function LINKTAG() {
  
  const LINKTAG = document.querySelectorAll('.linkTag');
  for (let j = 0; j < LINKTAG.length; j += 1) {
    LINKTAG[j].addEventListener('click', () => {
      const LINK = LINKTAG[j].innerHTML;
      addLinkTag(LINK);
    });
  }
}