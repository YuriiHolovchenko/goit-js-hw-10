import './css/styles.css';
import { fetchCountries } from './fetchCountries.js';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
// import { debounce } from 'lodash.debounce';

// const DEBOUNCE_DELAY = 3000;
const inputCountrySearch = document.querySelector('input#search-box');
const countryList = document.querySelector('.country-list');
const countryInfo = document.querySelector('.country-info');

const countryInput = (request => {
    request.preventDefault()
    const country = request.currentTarget.value.trim().toLowerCase();
    if (!country) {
       return console.log('Введіть назву країни для пошуку')
    }
    const countrys = fetchCountries(country);
    countrys.then(data => {
        countryList.innerHTML = '';
        countryInfo.innerHTML = '';
        renderCountryList(data)
        creatMarkUp(data)})
        .catch(() => Notify.failure('Oops, there is no country with that name'))
})

inputCountrySearch.addEventListener('input', countryInput);

function creatMarkUp(response) {
    const number = response.length - 1;
    if (number > 10) {
        Notify.info('Too many matches found. Please enter a more specific name.')
    } else {
        if (number > 1) {
            response.forEach((element) => {
                countryList.innerHTML += renderCountryList(element);                      
            });
        } else {
            countryInfo.innerHTML = renderCountryCard(response[number])
        }
    }
}

function renderCountryList({ flag, name }) {
    return `<li style="list-style-type: none; display: flex; align-items: center;">
    <img src="${flag}" width=25px; style="margin-right: 20px">
    <h4>${name}</h4>
    </li>`
};

function renderCountryCard({ flag, name, capital, population, languages }) {
   
    const languagesMap = languages.map((element) => {
     return element.name; 
   });
    
    return `
    <div style="display:flex; align-items: center;">
        <img src="${flag}"; width="35px"; style="margin: 20px">
        <h2>${name}</h2>
    </div>
    <ul style="list-style-type: none; display: flex; flex-direction: column;">
        <li style="list-style-type: none; display: flex; align-items: center;">
            <h4 style="margin-right: 10px">Capital:</h4>
            <p> ${capital}</p></li>
        <li style="list-style-type: none; display: flex; align-items: center;">
            <h4 style="margin-right: 10px">Population:</h4>
            <p> ${population}</p></li>
        <li style="list-style-type: none; display: flex; align-items: center;">
            <h4 style="margin-right: 10px">Languages:</h4>
            <p> ${languagesMap}</p></li>
    </ul>`
}