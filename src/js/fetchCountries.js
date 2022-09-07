import Notiflix from 'notiflix';
export function fetchCountries(name) {
  return fetch(
    `https://restcountries.com/v2/name/${name}?fields=name,capital,population,flags,languages`
  )
    .then(response => {
      if (!response.ok) {
        throw new Error(
          Notiflix.Notify.failure('Oops, there is no country with that name')
        );
      }
      return response.json();
    })
    .then(data => {
      console.log(data);
      if (data.length > 10)
        Notiflix.Notify.info(
          'Too many matches found. Please enter a more specific name.'
        );
      return data;
    });
}
