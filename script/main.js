import { recipes } from '../data/recipes.js';

async function GetData() {
  const data = recipes;
  const jsonStrings = data.map((item) => JSON.stringify(item));
  const backToNumbers = jsonStrings.map((s) => JSON.parse(s));

  return {
    backToNumbers: [...backToNumbers],
  };
}

async function DisplayData(backToNumbers) {
  const recipes_zone = document.querySelector('.recipes_card');
  console.log(backToNumbers);
  backToNumbers.forEach((element) => {
    console.log(element);
    const recipes_content = RecipesFactory(element);
    const recipesDOM = recipes_content.getRecipesCardDOM();
    recipes_zone.appendChild(recipesDOM);
  });
}


/* function filter */
function Search(INPUT) {
  if (INPUT.length > 2) {
    DROPDOWNMENU[0].innerHTML = '';
    const filtIngredients = (ingredients) => ingredients.find((item) => item.ingredient.includes(INPUT));
    const ResultFilters = recipes.filter((item) => item.name.toLocaleLowerCase().includes(INPUT.toLocaleLowerCase())
    || item.description.includes(INPUT)
    || filtIngredients(item.ingredients));

    
    RECIPESZONE.innerHTML = '';
    
    for (let e = 0; e < ResultFilters.length; e += 1) {
      console.log(ResultFilters[0].ingredients)
      const Finish = TagIngredient(ResultFilters[e].ingredient);
      DROPDOWNMENU[0].appendChild(Finish);
    }
    
    DisplayData(ResultFilters);
  }
}


async function init() {
  const { backToNumbers } = await GetData();
  DisplayData(backToNumbers);
}

init();