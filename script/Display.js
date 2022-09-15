function createRecipesCardDOM(data) {
  const {
    id, name, servings, ingredients, time, description, appliance, ustensils,
  } = data;

  const article = document.createElement('article');

  article.innerHTML = `<div class="div_img"><img></div><div class="div_content"><span class="span_title"><h1 class="h1">${name}</h1><div class="timer"><i class="fa-regular fa-clock"></i><p class="p1">${time} min</p></div></span><span class="span_recipes"><p class="recipes_exp">${description}</p></span></div>`;

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

    const Article = article.children[1].children[1];
    Article.appendChild(ul);
    Article.insertBefore(ul, Article.children[0]);
  }

  return article;
}

function TagIngredient(data) {
  const TagIngredients = document.createElement('a');

  if (Array.isArray(data) === false) {
    TagIngredients.innerText = `${data}`;
    return TagIngredients;
  }

  for (let e = 0; e < data.length; e += 1) {
    const TagContent = data[e].ingredient;
    TagIngredients.innerText = `${TagContent}`;
    return TagIngredients;
  }
}
