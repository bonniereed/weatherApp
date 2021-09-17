var weatherFormEl = document.querySelector("#weather-form");
var weatherInputEl = document.querySelector("#weather");
var weatherContainerEl = document.querySelector("#weather-container");
var weatherSearchTerm = document.querySelector("#weather-search-term");

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

var getEndUserLocation = function (user) {
  var apiUrl =
    "api.openweathermap.org/data/2.5/weather?q=dallas&appid=540f9a4f911b73e2656f8cb8a4cc7555";

  fetch(apiUrl)
    .then(function (response) {
      if (response.ok) {
        response.json().then(function (data) {
          displayWeather(data, user);
        });
      } else {
        alert("Error: " + response.statusText);
      }
    })
    .catch(function (error) {
      alert("Unable to connect");
    });
};

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

userFormEl.addEventListener("submit", formSubmitHandler);
languageButtonsEl.addEventListener("click", buttonClickHandler);
