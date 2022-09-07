import './css/styles.css';
import debounce from 'lodash.debounce';

import { fetchCountries } from './js/fetchCountries';

const DEBOUNCE_DELAY = 300;
const inputValue = document.querySelector('#search-box');
const countryList = document.querySelector('.country-list');

inputValue.addEventListener('input', debounce(valueInInput, DEBOUNCE_DELAY));

function valueInInput(e) {
  let countryName = e.target.value.trim();
  const newFetch = fetchCountries(countryName);

  if (countryName)
    newFetch.then(data => {
      renderData(data);
    });
}
function renderData(data) {
  if (data.length >= 2 && data.length <= 10) {
    data.forEach(element => {
      countryList.insertAdjacentHTML(
        'beforeend',
        `<li><img src="${element.flags.svg}" alt="" width="30"><span>${element.name}</span></li>`
      );
    });
  }
  if (data.length === 1) {
    data.forEach(element => {
      countryList.innerHTML = `<li><img src="${element.flags.svg}" alt="" width="30"><span>${element.name}</span>
    <p>Capital: ${element.capital}</p><p>Population: ${element.population}</p><p>Lenguages: ${element.languages}</p></li>`;
    });
  }
}
