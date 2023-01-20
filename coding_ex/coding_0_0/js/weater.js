const API_KEY = "4b13b762c48586b10ef3ab0019b394ed"
const COORDS = 'coords';

const weatherInfo = document.querySelector('.weatherInfo');
const weatherIconImg = document.querySelector('.weatherIcon');

function init() {
  askForCoords();
}

function askForCoords() {
  navigator.geolocation.getCurrentPosition(handleSuccess, handleError);
}

function handleSuccess(position) {
  const latitude = position.coords.latitude;
  const longitude = position.coords.longitude;
  const coordsObj = {
    latitude,
    longitude
  };
  getWeather(latitude, longitude);
}

function handleError() {
  console.log("can't not access to location");
}

function getWeather(lat, lon) {
  fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`)
  .then(function (response) {
    return response.json();
  })
    .then(function (json) {
      const temperature = json.main.temp;
      const place = json.name;
      const weatherDescription = json.weather[0].description;
      const weatherIcon = json.weather[0].icon;
      const weatherIconAdrs = `http://openweathermap.org/img/wn/${weatherIcon}.png`;

      weatherInfo.innerText = `${weatherDescription}, ${place} ${Math.round(temperature)}°C`;
      weatherIconImg.setAttribute('src', weatherIconAdrs);
    })
    .catch((error) => console.log("error:", error));
}

init();