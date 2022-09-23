let test = [];

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
    let Ressource = recipe.ingredients;
    for( let i = 0; i < Ressource.length; i += 1) {
        test.push(Ressource[i].ingredient);
        console.log(test)
        return test;
    }
    
   
};