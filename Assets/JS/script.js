var userFormEl = document.querySelector("#user-form");
var nameInputEl = document.querySelector("#username");
var weatherContainerEl = document.querySelector("#weather-container");
var weatherSearchTerm = document.querySelector("#weather-search-term");

var formSubmitHandler = function (event) {
  event.preventDefault();

  var username = nameInputEl.value.trim();

  if (username) {
    getUserRepos(username);

    weatherContainerEl.textContent = "";
    nameInputEl.value = "";
  } else {
    alert("Please enter location");
  }
};

var getEndUserLocation = function (user) {
  var apiUrl =
    "https://api.openweathermap.org/data/2.5/onecall?lat={lat}&lon={lon}&exclude={part}&appid={API key}" +
    user +
    "/repos";

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

var displayWeather = function (repos, searchTerm) {
  if (repos.length === 0) {
    weatherContainerEl.textContent = "No repositories found.";
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
