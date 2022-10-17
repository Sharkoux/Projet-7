/* eslint-disable no-unused-vars */
/* eslint-disable no-plusplus */

/* function Includes boucle native */
const includes = (str, t) => {
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

  const recipeAp = recipe.appliance;
  const recipUs = recipe.ustensils;
  const recipIngr = recipe.ingredients;

  for (let i = 0; i < recipeAp.length; i++) {
    Rsc.push(recipeAp);
  }
  for (let j = 0; j < recipUs.length; j++) {
    Rsc.push(recipUs[j]);
  }

  for (let k = 0; k < recipIngr.length; k++) {
    Rsc.push(recipIngr[k].ingredient);
  }

  return Rsc;
};

const getAllData = (recipe) => {
  const Rsc = [];

  const recipeName = recipe.name;
  const recipeAp = recipe.appliance;
  const recipUs = recipe.ustensils;
  const recipIngr = recipe.ingredients;

  for (let i = 0; i < recipeAp.length; i++) {
    Rsc.push(recipeAp);
  }
  for (let j = 0; j < recipUs.length; j++) {
    Rsc.push(recipUs[j]);
  }

  for (let k = 0; k < recipIngr.length; k++) {
    Rsc.push(recipIngr[k].ingredient);
  }

  Rsc.push(recipeName);

  return Rsc;
}


const getTrim = (str) => str.toLowerCase().trim();

function linkTag() {
  const linkTags = document.querySelectorAll('.linkTag');
  for (let j = 0; j < linkTags.length; j += 1) {
    linkTags[j].addEventListener('click', () => {
      const link = linkTags[j].innerHTML;
      addLinkTag(link);
    });
  }
}
