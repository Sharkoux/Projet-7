import { recipes } from '../data/recipes.js';

async function GetData() {
  const data = recipes;
  const jsonStrings = data.map(item => JSON.stringify(item));
  const backToNumbers = jsonStrings.map((s) => JSON.parse(s));
  console.log(backToNumbers);
}

async function DisplayData(data) {

}

GetData();
