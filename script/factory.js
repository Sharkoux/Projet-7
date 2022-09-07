/* eslint-disable camelcase */
function RecipesFactory(data) {
  const {
    id, name, servings, ingredients, time, description, appliance, ustensils,
  } = data;

  function getRecipesCardDOM() {
    const article = document.createElement('article');

    const img = document.createElement('img');
    const div_img = document.createElement('div');
    div_img.setAttribute('class', 'div_img');

    const div_content = document.createElement('div');
    div_content.setAttribute('class', 'div_content');

    const span_title = document.createElement('span');
    span_title.setAttribute('class', 'span_title');
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

    const span_recipes = document.createElement('span');
    span_recipes.setAttribute('class', 'span_recipes');

    const ul = document.createElement('ul');

    console.log(ingredients);

    for (let e = 0; e < ingredients.length; e += 1) {
      const { ingredient } = ingredients[e];
      const { quantity } = ingredients[e];
      const { unit } = ingredients[e];
      const li = document.createElement('li');
      const strong = document.createElement('strong');
      const p_li = document.createElement('p');
      strong.innerText = `${ingredient}: `;
      if (unit === undefined) {
        p_li.innerText = ` ${quantity}`;
      } else {
        p_li.innerText = ` ${quantity}${unit}`;
      }
      li.appendChild(strong);
      li.appendChild(p_li);
      ul.appendChild(li);

      console.log(ingredient, quantity, unit);
    }

    var recipes_exp = document.createElement('p');
    
    recipes_exp.textContent = `${description}`;
    recipes_exp.setAttribute("class", "recipes_exp")

    span_recipes.appendChild(ul);
    span_recipes.appendChild(recipes_exp);

    div_img.appendChild(img);
    article.appendChild(div_img);

    span_title.appendChild(h1);
    span_title.appendChild(timer);
    div_content.appendChild(span_title);
    div_content.appendChild(span_recipes);
    article.appendChild(div_content);
    return article;
  }

  return {
    id, name, servings, ingredients, time, description, appliance, ustensils, getRecipesCardDOM,
  };
}
