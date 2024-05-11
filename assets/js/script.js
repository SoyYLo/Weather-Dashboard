// API key for OpenWeatherMap API
const API_KEY = "d7b56dce658eb96067e7193f0da3aebe";

const getCityCoordinates = () => {
    const cityInput = document.querySelector(".City");
    if (!cityInput) {
        console.error("element not found");
        return;
    }
    const cityName = cityInput.value;
    if (!cityName) return;

    const GEOCODING_API_URL = `https://api.openweathermap.org/data/2.5/forecast?q=${cityName},us&appid=${API_KEY}`;

    console.log(cityInput);
    //retrieve cooridinates from API response
    fetch(GEOCODING_API_URL)
        .then(res => res.json())
        .then(data => {
            console.log(data)
            if (!data?.city?.coord) return alert(`No coordinates found for ${cityName}`);
            const coordinates = (data.city.coord);
            getWeatherDetails(cityInput.value, coordinates.lat, coordinates.lon);
        }).catch(() => {
            alert("Error: cannot fetch coordinates.");
        })
}


//retrive Weather forecast
const getWeatherDetails = (cityName, lat, lon) => {
    const WEATHER_API_URL = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}`;

    fetch(WEATHER_API_URL)
        .then(res => res.json())
        .then(data => {
            const uniqueForecastDays = [];
            // Target Temp from API
            const uniqueTemp = [];
            //target humidity
            const uniqueHumidity = [];
            //target wind
            const uniqueWind = [];

            //filter to only get 1 forecast per day
            const fiveDay = data.list.filter(forecast => {
                //check string for "dt_txt" data
                const forecastDate = new Date(forecast.dt_txt).getDate();
                if (!uniqueForecastDays.includes(forecastDate)) {
                    uniqueForecastDays.push(forecastDate);
                    return true;
                }
                return false;
                console.log(uniqueForecastDays);
            });

            fiveDay.forEach(weatherItem => {
                createWeatherCard(weatherItem);
            });

            //filter Temp
            const fiveDayTemp = fiveDay.filter(forecast => {
                const forecastTemp = new Temp(forecast.main.temp).getTemp();
                if (!uniqueTemp.includes(forecastTemp)) {
                    uniqueTemp.push(forecastTemp);
                    return true;
                }
                return false;
                console.log(uniqueTemp);
            });

            //filter Humidity
            const fiveDayHumidity = fiveDay.filter(forecast => {
                const forecastHumidity = new Humidity(forecast.main.humidity).getHumidity();
                if (!uniqueHumidity.includes(forecastHumidity)) {
                    uniqueHumidity.push(forecastHumidity);
                    return true;
                }
                return false;
                console.log(uniqueHumidity);
            });

            //filter wind
            const fiveDayWind = fiveDay.filter(forecast => {
                const forecastWind = new Wind(forecast.wind.speed).getWind();
                if (!uniqueWind.includes(forecastWind)) {
                    uniqueWind.push(forecastWind);
                    return true;
                }
                return false;
                console.log(uniqueWind);
            });
            //display data
            document.getElementsByClassName('weather-cards').innerText = data.message;
        })
        .catch(error => {

        });
}

const containerEl = document.getElementsByClassName('container');

const displayWeather = function (fiveDay, fiveDayTemp, fiveDayHumidity, fiveDayWind) {
    containerEl.textContent = '';

}

// makes sure DOM loads first
document.addEventListener('DOMContentLoaded', function (e) {
    const searchBttn = document.querySelector(".bttn");
    event.preventDefault();

    if (searchBttn) {
        searchBttn.addEventListener("click", getCityCoordinates);
    } else {
        console.error("Button element not found");
    }
});