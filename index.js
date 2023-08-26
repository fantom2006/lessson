const countryContainer = document.querySelector('#countryContainer');
const filterInput = document.querySelector('#filterInput');
const sortSelect = document.querySelector('#sortSelect');

let countries = [];

async function getCountries() {
    try {
        const response = await fetch('https://restcountries.com/v3.1/all');
        const countries = await response.json();
        return countries;
    } catch (error) {
        console.log('Ошибка при получении данных:', error);
    }
}

function createCountryCard(country) {
    const card = document.createElement('div');
    card.classList.add('country-card');

    const flag = document.createElement('img');
    flag.classList.add('flag');
    flag.src = country.flags.svg;
    flag.alt = `Флаг страны ${country.name.common}`;

    const name = document.createElement('h2');
    name.textContent = country.name.common;

    const capital = document.createElement('p');
    capital.textContent = `Столица: ${country.capital}`;

    const region = document.createElement('p');
    region.textContent = `Регион: ${country.region || 'N/A'}`;

    card.appendChild(flag);
    card.appendChild(name);
    card.appendChild(capital);
    card.appendChild(region);

    countryContainer.appendChild(card);
}

async function renderCountries() {
    countries = await getCountries();
    
    const sortingRegion = sortSelect.value;
    const filteredCountries = countries.filter(country => {
        return sortingRegion === '' || country.region === sortingRegion;
    });

    countryContainer.innerHTML = '';

    filteredCountries.forEach(country => {
        createCountryCard(country);
    });
}

filterInput.addEventListener('input', () => {
    const filterValue = filterInput.value.toLowerCase();
    const countryCards = document.querySelectorAll('.country-card');

    countryCards.forEach(card => {
        const countryName = card.querySelector('h2').textContent.toLowerCase();
        if (countryName.includes(filterValue)) {
            card.style.display = 'block';
        } else {
            card.style.display = 'none';
        }
    });
});

sortSelect.addEventListener('change', () => {
    renderCountries();
});

renderCountries();
