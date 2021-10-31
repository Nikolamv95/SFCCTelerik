var fetchWeather = "/weather";

const weatherForm = document.querySelector('form');
const search = document.querySelector('input');
const weatherIcon = document.querySelector('.weatherIcon i');
const weatherCondition = document.querySelector('.weatherCondition');
const tempElement = document.querySelector('.temperature span');
const locationElement = document.querySelector('.place');
const dateElement = document.querySelector('.date');

const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
dateElement.textContent = `${new Date().getDate()}, ${monthNames[new Date().getMonth()].substring(0, 3)}`;

weatherForm.addEventListener('submit', (event) => {
    event.preventDefault();
    locationElement.textContent = "Loading...";
    tempElement.textContent = "";
    weatherCondition.textContent = "";
    const locationApi = fetchWeather + "?address=" + search.value;
    fetchLocationData(locationApi);
})

async function fetchLocationData(locationApi) {
    try {
        let response = await fetch(locationApi);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        let data = await response.json();
        if (data.description === "rain" || data.description === "fog") {
            weatherIcon.className = `wi wi-day-${data.description}`;
        } else {
            weatherIcon.className = "wi wi-day-cloudy";
        }

        locationElement.textContent = data.cityName;
        tempElement.textContent = (data.temperature - 273.5).toFixed(2) + String.fromCharCode(176);
        weatherCondition.textContent = data.description.toUpperCase();
    } catch (error) {
        console.error(error);
        locationElement.textContent = 'This city doesn`t exist. Try with another one.';
        tempElement.textContent = "";
        weatherCondition.textContent = "";
    };
};


