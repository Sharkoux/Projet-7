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

async function init() {
  const { backToNumbers } = await GetData();
  DisplayData(backToNumbers);
}

init();