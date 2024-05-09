const cityInput = document.querySelector(".data");
const searchBttn = document.querySelector(".bttn");


// API key for OpenWeatherMap API
const API_KEY = "d7b56dce658eb96067e7193f0da3aebe";

const createWeatherCard = (weatherItem) => {
    return ``;

}

//retrive Weather forecast
const getWeatherDetails = (cityName, lat, lon) => {
    const WEATHER_API_URL = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}`;
    fetch(WEATHER_API_URL)
        .then(res => res.json())
        .then(data => {

            //filter to only get 1 forecast per day
            const uniqueForecastDays = [];
            const fiveDay = data.list.filter(forecast => {
                //check string for "dt_txt" data
                const forecastDate = new Date(forecast.dt_txt).getDate();
                if (!uniqueForecastDays.includes(forecastDate)) {
                    uniqueForecastDays.push(forecastDate);
                }
            });

            console.log(fiveDay);
            fiveDay.forEach(weatherItem => {
                createWeatherCard(weatherItem);
            })
        }).catch(() => {
            alert("Error: cannot fetch weather forecast")
        })
}

// makes sure DOM loads first
document.addEventListener('DOMContentLoaded', function (e) {
    const cityInput = document.querySelector(".data");
    console.log(cityInput);
    const searchBttn = document.querySelector(".bttn");
    event.preventDefault();

    if (searchBttn) {
        searchBttn.addEventListener("click", getCityCoordinates);
    } else {
        console.error("Button element not found");
    }
});

const getCityCoordinates = () => {
    const cityName = cityInput.value;
    if (!cityName) return;

    const GEOCODING_API_URL = `api.openweathermap.org/data/2.5/forecast?q=${cityName},us&mode=xml&appid=${API_KEY}`;

    console.log(cityInput);
    //retrieve cooridinates from API response
    fetch(GEOCODING_API_URL)
        .then(res => res.json())
        .then(data => {
            console.log(data)
            if (!data.length) return alert('No coordinates found for ${cityName}');
            const { name, lat, lon } = data[0];
            getWeatherDetails(name, lat, lon);
        }).catch(() => {
            alert("Error: cannot fetch coordinates.");
        })
}



// makes sure DOM loads first
//document.addEventListener('DOMContentLoaded', function () {
    ///const cityInput = document.querySelector(".city");

    //if (searchBttn) {
        //searchBttn.addEventListener("click", getCityCoordinates);
   // } else {
       // console.error("Button element not found");
   // }
//});
