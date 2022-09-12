function createRecipesCardDOM(data) {
  const {
    id, name, servings, ingredients, time, description, appliance, ustensils,
  } = data;

  const article = document.createElement('article');

  const img = document.createElement('img');
  const divImg = document.createElement('div');
  divImg.setAttribute('class', 'div_img');

  const divContent = document.createElement('div');
  divContent.setAttribute('class', 'div_content');

  const spanTitle = document.createElement('span');
  spanTitle.setAttribute('class', 'span_title');
  const h1 = document.createElement('h1');
  h1.setAttribute('class', 'h1');
  h1.textContent = `${name}`;

  const p1 = document.createElement('p');
  p1.setAttribute('class', 'p1');
  const icon = document.createElement('i');
  icon.setAttribute('class', 'fa-regular fa-clock');

  p1.textContent = `${time} min`;

  const timer = document.createElement('div');
  timer.setAttribute('class', 'timer');
  timer.appendChild(icon);
  timer.appendChild(p1);

  const spanRecipes = document.createElement('span');
  spanRecipes.setAttribute('class', 'span_recipes');

  const ul = document.createElement('ul');

  for (let e = 0; e < ingredients.length; e += 1) {
    const { ingredient } = ingredients[e];
    const { quantity } = ingredients[e];
    const { unit } = ingredients[e];
    const li = document.createElement('li');
    const strong = document.createElement('strong');
    const pli = document.createElement('p');
    strong.innerText = `${ingredient}: `;
    if (unit === undefined) {
      pli.innerText = ` ${quantity}`;
    } else {
      pli.innerText = ` ${quantity}${unit}`;
    }
    li.appendChild(strong);
    li.appendChild(pli);
    ul.appendChild(li);
  }

  const recipesExp = document.createElement('p');

  recipesExp.textContent = `${description}`;
  recipesExp.setAttribute('class', 'recipes_exp');

  spanRecipes.appendChild(ul);
  spanRecipes.appendChild(recipesExp);

  divImg.appendChild(img);
  article.appendChild(divImg);

  spanTitle.appendChild(h1);
  spanTitle.appendChild(timer);
  divContent.appendChild(spanTitle);
  divContent.appendChild(spanRecipes);
  article.appendChild(divContent);
  return article;
}
