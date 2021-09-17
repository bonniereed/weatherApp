var weatherFormEl = document.querySelector("#weather-form");
var weatherInputEl = document.querySelector("#weather");
var weatherContainerEl = document.querySelector("#weather-container");
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

  var weather = weatherInputEl.value.trim();

  if (weather) {
    getUserRepos(weather);

    weatherContainerEl.textContent = "";
    nameInputEl.value = "";
  } else {
    alert("Please enter location");
  }
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

// var getWeatherLocation = function (city) {
//   var apiKey = `540f9a4f911b73e2656f8cb8a4cc7555`;
//   var apiUrl = `api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;
//   fetch(apiUrl, {
//     method: "GET",
//   })
//     .then((response) => {
//       console.log(response);
//     })
//     .catch((err) => {
//       console.log(err);
//     });
//   fetch(apiUrl)
//     .then(function (response) {
//       if (response.ok) {
//         response.json().then(function (data) {
//           displayWeather(data, weather);
//         });
//       } else {
//         alert("Error: " + response.statusText);
//       }
//     })
//     .catch(function (error) {
//       alert("Unable to connect");
//     });
// };
// fetch(apiUrl)
//   .then(function (response) {
//     return response.json(); // pass the data as promise to next then block
//   })
//   .then(function (data) {
//     //pull city ID out

//     return fetch("one call weather api call" + rocketId); // make a 2nd request and return a promise
//   })
//   .then(function (response) {
//     return response.json(); //this response is the one with full data
//   })
//   .catch(function (error) {
//     console.log("Request failed", error);
//   });
// };

var displayWeather = function (weatherLocation, searchTerm) {
  if (weatherLocation.length === 0) {
    weatherContainerEl.textContent = "Nothing to be found.";
    return;
  }

  weatherSearchTerm.textContent = searchTerm;

  for (var i = 0; i < repos.length; i++) {
    var weatherEntry = repos[i].owner.login + "/" + repos[i].name;

    var repoEl = document.createElement("div");
    repoEl.classList = "list-item flex-row justify-space-between align-center";

    var weatherEl = document.createElement("card");
    titleEl.textContent = weatherEntry;

    weatherEl.appendChild(weatherEl);

    var statusEl = document.createElement("card");
    statusEl.classList = "flex-row align-center";

    weatherEl.appendChild(statusEl);

    weatherContainerEl.appendChild(repoEl);
  }
};

weatherFormEl.addEventListener("submit", formSubmitHandler);
