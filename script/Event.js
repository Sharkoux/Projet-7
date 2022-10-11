/* eslint-disable no-unused-vars */
/* eslint-disable no-loop-func */
/* eslint-disable no-undef */
/* eslint-disable no-use-before-define */
const SEARCHINPUT = document.querySelector('.input_search');
const DROPBTNPRIMARY = document.querySelector('.btn-primary');
const DROPBTNAPPAREILS = document.querySelector('.btn-appareils');
const DROPBTNUSTENCILS = document.querySelector('.btn-danger');
const DROPDOWNINGREDIENT = document.querySelector('.btn-ingrédients');
const DROPBTN = document.querySelectorAll('.drop_btn');
const ROWUP = document.querySelectorAll('.angle-up');

/* Event */

SEARCHINPUT.addEventListener('input', () => {
  INPUT = SEARCHINPUT.value;
  addSearch(INPUT);
});

/* Event for Open and Close filter */
DROPBTNPRIMARY.addEventListener('dblclick', closeTagIngredient);
DROPBTNAPPAREILS.addEventListener('dblclick', closeTagAppareil);
DROPBTNUSTENCILS.addEventListener('dblclick', closeTagUstensils);

DROPBTNPRIMARY.addEventListener('click', openTagIngredient);
DROPBTNAPPAREILS.addEventListener('click', openTagAppareils);
DROPBTNUSTENCILS.addEventListener('click', openTagUstensiles);

document.addEventListener('keydown', (e) => {
  const KEYCODE = e.KEYCODE ? e.KEYCODE : e.which;
  if (KEYCODE === 27) {
    closeTagIngredient();
    closeTagAppareil();
    closeTagUstensils();
  }
});

/* if open dropdown Ingredient */
function openTagIngredient() {
  DROPDOWNINGREDIENT.classList.toggle('active');
  DROPBTN[0].style.setProperty('border-radius', '5px 5px 0 0');
  DROPBTNPRIMARY.innerHTML = '<input class="input form-control search-ingredients blue" type="text" placeholder="Rechercher un ingrédient"></input><em class="fa-solid fa-angle-up angle-up"></em>';
  DROPBTNPRIMARY.removeEventListener('click', openTagIngredient);
  const SEARCHTAG = document.querySelector('.search-ingredients');

  SEARCHTAG.addEventListener('input', () => {
    const INPUTTAG = SEARCHTAG.value.trim();
    tagSearch(INPUTTAG);
  });
  linkTag();
}
/* if close dropdown Ingrédient */
function closeTagIngredient() {
  DROPDOWNINGREDIENT.classList.remove('active');
  DROPBTNPRIMARY.innerHTML = 'Ingrédients <em class="fa-solid fa-angle-down angle-down"></em>';
  DROPBTNPRIMARY.addEventListener('click', openTagIngredient);
  DROPBTN[0].style.setProperty('border-radius', '5px');
}

/* if open dropdown Appareils */

function openTagAppareils() {
  document.querySelector('.btn_appareils').classList.toggle('active');
  DROPBTN[1].style.setProperty('border-radius', '5px 5px 0 0');
  document.querySelector('.btn-appareils').innerHTML = '<input class="input form-control search-appareils green" type="text" placeholder="Rechercher un appareils"></input><em class="fa-solid fa-angle-up angle-up"></em>';
  document.querySelector('.btn-appareils').removeEventListener('click', openTagAppareils);
  const SEARCHTAG = document.querySelector('.search-appareils');

  SEARCHTAG.addEventListener('input', () => {
    const INPUTTAG = SEARCHTAG.value.trim();
    tagSearchAp(INPUTTAG);
  });
  linkTag();
}

/* if close dropdown Appareil */

function closeTagAppareil() {
  document.querySelector('.btn_appareils').classList.remove('active');
  document.querySelector('.btn-appareils').innerHTML = 'Appareils <em class="fa-solid fa-angle-down angle-down"></em>';
  document.querySelector('.btn-appareils').addEventListener('click', openTagAppareils);
  DROPBTN[1].style.setProperty('border-radius', '5px');
}

/* if open dropdown Ustensiles */

function openTagUstensiles() {
  document.querySelector('.btn_danger').classList.toggle('active');
  DROPBTN[2].style.setProperty('border-radius', '5px 5px 0 0');
  document.querySelector('.btn-danger').innerHTML = '<input class="input form-control search-ustensils red" type="text" placeholder="Rechercher un ustensiles"></input><em class="fa-solid fa-angle-up angle-up"></em>';
  document.querySelector('.btn-danger').removeEventListener('click', openTagUstensiles);
  const SEARCHTAG = document.querySelector('.search-ustensils');

  SEARCHTAG.addEventListener('input', () => {
    const INPUTTAG = SEARCHTAG.value.trim();
    tagSearchUs(INPUTTAG);
  });
  linkTag();
}

/* if close dropdown Ustensils */

function closeTagUstensils() {
  document.querySelector('.btn_danger').classList.remove('active');
  document.querySelector('.btn-danger').innerHTML = 'Ustensiles <em class="fa-solid fa-angle-down angle-down"></em>';
  document.querySelector('.btn-danger').addEventListener('click', openTagUstensiles);
  DROPBTN[2].style.setProperty('border-radius', '5px');
}
