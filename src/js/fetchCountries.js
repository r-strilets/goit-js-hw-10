import Notiflix from 'notiflix';
export function fetchCountries(name) {
  if (!name) {
    Notiflix.Notify.failure('Oops, there is no country with that name');
    return;
  }
  return fetch(
    `https://restcountries.com/v2/name/${name}?fields=name,capital,population,flags,languages`
  )
    .then(response => {
      return response.json();
    })
    .then(data => {
      if (data.length > 10)
        Notiflix.Notify.info(
          'Too many matches found. Please enter a more specific name.'
        );
      return data;
    })
    .catch(err => Notiflix.Notify.failure(err));
}
