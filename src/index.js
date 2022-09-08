import './css/styles.css';
import debounce from 'lodash.debounce';

import { fetchCountries } from './js/fetchCountries';

const DEBOUNCE_DELAY = 300;
const inputValue = document.querySelector('#search-box');
const countryList = document.querySelector('.country-list');
const countryInfo = document.querySelector('.country-info');
inputValue.addEventListener('input', debounce(valueInInput, DEBOUNCE_DELAY));

function valueInInput(e) {
  let countryName = e.target.value.trim();
  const newFetch = fetchCountries(countryName);
  countryInfo.innerHTML = '';
  countryList.innerHTML = '';

  if (countryName)
    newFetch.then(data => {
      renderData(data);
    });
}

function renderData(data) {
  if (data.length >= 2 && data.length <= 10) {
    const newCountryList = data.reduce((acc, element) => {
      acc += `<li><img src="${element.flags.svg}" alt="" width="30"><span> ${element.name}</span></li>`;
      return acc;
    }, '');

    countryList.insertAdjacentHTML('beforeend', newCountryList);
  }
  if (data.length === 1) {
    countryList.innerHTML = '';
    const newCountryInfo = data
      .map(
        element =>
          `<img src="${element.flags.svg}" alt="flag" width="30"><span> <b>${
            element.name
          }</b></span>
    <p><b>Capital:</b> ${element.capital}</p><p><b>Population:</b> ${
            element.population
          }</p><p><b>Lenguages:</b> ${element.languages.map(
            element => element.name
          )}</p>`
      )
      .join();
    countryInfo.innerHTML = newCountryInfo;
  }
}
