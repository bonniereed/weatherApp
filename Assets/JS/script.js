//
var weatherFormEl = document.querySelector("#weather-form");
var weatherInputEl = document.querySelector("#weather");
var weatherSearchTerm = document.querySelector("#weather-search-term");
var weatherCards = document.querySelector("#weatherCards");
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
  // create a new div
  var newDiv = document.createElement("div");
  // console.log(cardHeader);
  var weatherHeaderClassAttr = document.createAttribute("class");
  // console.log(headerClassAttr);
  weatherHeaderClassAttr.value = "header";
  cardHeader.setAttributeNode(weatherHeaderClassAttr);
  // console.log(cardHeader);
  var weatherHeaderIdAttr = document.createAttribute("id");
  weatherHeaderIdAttr.value = "card-heading";
  weatherCards.setAttributeNode(headerIdAttr);
  // set h2 title/text
  weatherCards.innerHTML = name;
  // Append to containter
  cardContainer.appendChild(weatherCards);

  // and give it some content
  const newContent = weatherContainerEl.innerHTML;

  // add the text node to the newly created div
  newDiv.appendChild(newContent);

  // add the newly created element and its content into the DOM
  const currentDiv = document.getElementById("weather-container");
  document.body.insertBefore(newDiv, currentDiv);
}

weatherFormEl.addEventListener("submit", formSubmitHandler);
