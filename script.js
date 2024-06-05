const inputBox = document.getElementById("search");
const weatherImage = document.querySelector(".weather-icon");
const currTemp = document.querySelector(".curr-temp");
const weatherStatus = document.querySelector(".weather-status");
const cityName = document.querySelector(".city");
const countryName = document.querySelector(".country");
const uvIndex = document.querySelector(".uv-data");
const windSpeed = document.querySelector(".wind-data");
const sunriseTime = document.querySelector(".sunrise span");
const sunsetTime = document.querySelector(".sunset span");
const humidity = document.querySelector(".humidity-data");
const visibility = document.querySelector(".visibility-data");
const feelsLike = document.querySelector(".feels-like-data");
const forecastCardDays = document.querySelectorAll(".days");
const forecastCardTemp = document.querySelectorAll(".forecast-temp-data");
const forecastRainData = document.querySelectorAll(".forecast-rain-data");
const forecastHumidityData = document.querySelectorAll(".forecast-humidity-data");
const forecastCardImage = document.querySelectorAll(".forecast-image-data");
const forecastDate = document.querySelectorAll(".forecast-date");
const forecastCondition = document.querySelectorAll(".forecast-weather-condition");

const updateWeatherData = (weatherData) => {
  currTemp.innerText = weatherData.current.temp_c;
  weatherStatus.innerText = weatherData.current.condition.text;
  cityName.innerText = weatherData.location.name;
  countryName.innerText = weatherData.location.country;
  uvIndex.innerText = weatherData.current.uv;
  windSpeed.innerText = `${weatherData.current.wind_kph} km/h`;
  sunriseTime.innerText = weatherData.forecast.forecastday[0].astro.sunrise;
  sunsetTime.innerText = weatherData.forecast.forecastday[0].astro.sunset;
  humidity.innerText = weatherData.current.humidity;
  visibility.innerText = weatherData.current.vis_km;
  feelsLike.innerText = weatherData.current.feelslike_c;

  for (let i = 0; i <= 2; i++) {
    const dateData = weatherData.forecast.forecastday[i].date;
    const dateString = dateData.split("-").join(",");
    const date = new Date(dateString);
    const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    forecastDate[i].innerText = weatherData.forecast.forecastday[i].date;
    forecastCardDays[i].innerText = daysOfWeek[date.getDay()];
    forecastCardDays[0].innerText = "Today";
    forecastCardDays[1].innerText = "Tomorrow";
    forecastCondition[i].innerText = weatherData.forecast.forecastday[i].day.condition.text;
    forecastCardTemp[i].innerText = weatherData.forecast.forecastday[i].day.avgtemp_c;
    forecastRainData[i].innerText = weatherData.forecast.forecastday[i].day.daily_chance_of_rain;
    forecastHumidityData[i].innerText = weatherData.forecast.forecastday[i].day.avghumidity;
    forecastCardImage[i].src = weatherData.forecast.forecastday[i].day.condition.icon;
  }
};

const onPageLoad = async () => {
  try {
    // Fetch weather data for India by default
    const defaultApiCall = await fetch(
      `https://api.weatherapi.com/v1/forecast.json?key=e9f03c0935864a1ba58105924231102&q=India&days=7`
    );

    const defaultWeatherData = await defaultApiCall.json();
    updateWeatherData(defaultWeatherData);
  } catch (error) {
    console.error("Error fetching default weather data:", error);
    alert("Unable to fetch default weather data. Please try again later.");
  }
};

onPageLoad();

let data;

const getData = async (event) => {
  event.preventDefault();

  if (!inputBox.value) {
    alert("Please Enter City Name");
    return;
  }

  const inputValue = inputBox.value;

  try {
    const fetchData = await fetch(
      `https://api.weatherapi.com/v1/forecast.json?key=e9f03c0935864a1ba58105924231102&q=${inputValue}&days=7`
    );

    const weatherData = await fetchData.json();
    data = weatherData;
    updateWeatherData(data);
  } catch (error) {
    console.error("Error fetching weather data:", error);
    alert("Unable to fetch weather data. Please try again later.");
  }
};
