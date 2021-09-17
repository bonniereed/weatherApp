//
var weatherFormEl = document.querySelector("#weather-form");
var weatherInputEl = document.querySelector("#weather");
var weatherContainerEl = document.querySelector(".weather-container");
var weatherSearchTerm = document.querySelector("#weather-search-term");
var key = `540f9a4f911b73e2656f8cb8a4cc7555`;
var url = `https://api.openweathermap.org/data/2.5/`;
var units = `imperial`;
var city_of_choice;
var lat;
var lon;
var time;

var formSubmitHandler = function (event) {
  event.preventDefault();
  getWeatherLocation(weatherInputEl.value.trim());
  displayWeather();
};

function getWeatherLocation(city) {
  var callType = `weather`;
  var apiUrl = `${url}${callType}?q=${city}&appid=${key}&units=${units}`;
  fetch(apiUrl)
    .then(function (resp) {
      return resp.json();
    }) // Convert data to json
    .then(function (data) {
      city_of_choice = data;
      lat = city_of_choice.coord.lat;
      lon = city_of_choice.coord.lon;
      time = city_of_choice.dt;
      console.log(data);
      getWeatherInfo();
    })
    .catch(function () {
      // catch any errors
    });
}

function getWeatherInfo() {
  var callType = `onecall/timemachine`;
  var apiUrl = `${url}${callType}?lat=${lat}&lon=${lon}&dt=${time}&appid=${key}&units=${units}`;
  fetch(apiUrl)
    .then(function (resp) {
      return resp.json();
    }) // Convert data to json
    .then(function (data) {
      city_of_choice = data;
      console.log(data);
    })
    .catch(function () {
      // catch any errors
    });
}

function displayWeather() {
  // create a new div element
  const newDiv = document.createElement("div");

  // and give it some content
  const newContent = weatherContainerEl.createTextNode(
    "Hi there and greetings!"
  );

  // add the text node to the newly created div
  newDiv.appendChild(newContent);

  // add the newly created element and its content into the DOM
  const currentDiv = document.getElementById("weather-container");
  document.body.insertBefore(newDiv, currentDiv);
}

// var displayWeather = function (weatherLocation, searchTerm) {
//   if (weatherLocation.length === 0) {
//     weatherContainerEl.textContent = "Nothing to be found.";
//     return;
//   }

//   weatherSearchTerm.textContent = searchTerm;

//   for (var i = 0; i < repos.length; i++) {
//     // var weatherEntry = repos[i].owner.login + "/" + repos[i].name;

//     weatherContainerEl.document.createElement("card");
//     weatherContainerEl.classList =
//       "list-item flex-row justify-space-between align-center";
//     weatherContainerEl.textContent = `UV Index is:${city_of_choice.current.uvi} /n `;

//     var weatherEl = document.createElement("card");
//     weatherContainerEl.textContent = weatherEntry;

//     var statusEl = document.createElement("card");
//     statusEl.classList = "flex-row align-center";

//     weatherEl.appendChild(statusEl);

//     weatherContainerEl.appendChild(repoEl);
//   }
// };

weatherFormEl.addEventListener("submit", formSubmitHandler);
