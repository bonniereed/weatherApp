//list of variables called from HTML
var save = document.querySelector("#save");
var weatherFormEl = document.querySelector("#weather-form");
var weatherInputEl = document.querySelector("#weather");
var weatherSearchTerm = document.querySelector("#weather-search-term");
var weatherListEl = document.querySelector("#weatherList");
var weatherCardsEl = document.querySelector("#weatherCards");
var weatherUlEl = document.querySelector("#weatherUl");
//global variables used in API
var key = `540f9a4f911b73e2656f8cb8a4cc7555`;
var url = `https://api.openweathermap.org/data/2.5/`;
var units = `imperial`;
//user variables
var city_of_choice_simple;
var city_of_choice_expanded;
var lat;
var lon;
var time;

var li1 = document.createElement("li");
var li2 = document.createElement("li");
var li3 = document.createElement("li");
var li4 = document.createElement("li");
var li5 = document.createElement("li");
var li6 = document.createElement("li");
var li7 = document.createElement("li");

//Function used to take value from form and use it in search term.
var formSubmitHandler = function (event) {
  event.preventDefault();
  getWeatherLocation(weatherInputEl.value.trim());
};

//function used to get weather info based on city input, returns JavaScript object notation
function getWeatherLocation(city) {
  var callType = `weather`;
  var apiUrl = `${url}${callType}?q=${city}&appid=${key}&units=${units}`;
  fetch(apiUrl)
    .then(function (resp) {
      return resp.json();
    })
    .then(function (data) {
      city_of_choice_simple = data;
      lat = city_of_choice_simple.coord.lat;
      lon = city_of_choice_simple.coord.lon;
      time = city_of_choice_simple.dt;
      console.log(data);
      getWeatherInfo();
    })
    .catch(function () {});
}

//another API call to get even more data pertaining to user's city selection.
function getWeatherInfo() {
  var callType = `onecall/timemachine`;
  var apiUrl = `${url}${callType}?lat=${lat}&lon=${lon}&dt=${time}&appid=${key}&units=${units}`;
  fetch(apiUrl)
    .then(function (resp) {
      return resp.json();
    })
    .then(function (data) {
      city_of_choice_expanded = data;
      console.log(data);
      displayWeather();
    })
    .catch(function () {});
}

// ///forecast:
// city_of_choice_expanded.current.hourly[0];
// city_of_choice_expanded.current.hourly[1];
// city_of_choice_expanded.current.hourly[2];
// city_of_choice_expanded.current.hourly[3];

//Function used to create cards with weather information to display
function displayWeather(location, weatherData) {
  weatherListEl.appendChild(li1);
  weatherListEl.appendChild(li2);
  weatherListEl.appendChild(li3);
  weatherListEl.appendChild(li4);
  weatherListEl.appendChild(li5);
  weatherListEl.appendChild(li6);
  weatherListEl.appendChild(li7);
  li1.textContent = `${city_of_choice_simple.name}:`;
  li2.textContent =
    `Time: ${city_of_choice_expanded.current.dt}` +
    ` Currently: ${city_of_choice_expanded.current.weather[0].description}` +
    ` Temp: ${city_of_choice_expanded.current.temp}` +
    ` UV Index:  ${city_of_choice_expanded.current.uvi}` +
    ` Sunrise: ${city_of_choice_expanded.current.sunrise}` +
    ` Sunset: ${city_of_choice_expanded.current.sunset}`;
  li3.textContent = `Forecast:`;
  li4.textContent = `${city_of_choice_expanded.hourly[0].weather[0].description}`;
  li5.textContent = `${city_of_choice_expanded.hourly[1].weather[0].description}`;
  li6.textContent = `${city_of_choice_expanded.hourly[2].weather[0].description}`;
  li7.textContent = `${city_of_choice_expanded.hourly[3].weather[0].description}`;
}

weatherFormEl.addEventListener("click", formSubmitHandler);
