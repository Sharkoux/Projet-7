export const Includes = (str, t) => {
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

export const GetRessource = (recipe) => {
  const Rsc = [];
 
  let RecipeAp = recipe.appliance;
  let RecipUs = recipe.ustensils;
  let RecipIngr = recipe.ingredients;
  

  for (let i = 0; i < RecipeAp.length; i++) {
   Rsc.push(RecipeAp);
  }
  for(let j = 0; j < RecipUs.length; j++) {
    Rsc.push(RecipUs[j]);
  }
  for(let k = 0; k < RecipIngr.length; k++ ) {
    Rsc.push(RecipIngr[k].ingredient);
  }



  return Rsc;
};
