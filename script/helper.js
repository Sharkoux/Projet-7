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

  for (let i = 0; i < recipe.ingredients.length; i++) {
    Rsc.push(recipe.ingredients[i].ingredient);
  }
  return Rsc;
};
