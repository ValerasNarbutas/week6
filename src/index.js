let weather = {
  paris: {
    temp: "19.7",
    humidity: 80,
    coords: { latitude: 48.51529776, longitude: 2.20564504 },
  },
  tokyo: {
    temp: "17.3",
    humidity: 50,
    coords: { latitude: 35.65283, longitude: 139.839478 },
  },
  lisabon: {
    temp: "30.2",
    humidity: 20,
    coords: { latitude: 38.736946, longitude: -9.142685 },
  },

  oslo: {
    temp: "-5",
    humidity: 20,
    coords: { latitude: 59.911491, longitude: 10.757933 },
  },
  kyiv: {
    temp: "19°C",
    humidity: 55,
    coords: { latitude: 50.450001, longitude: 30.527756 },
  },
};

function formDate(date) {
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  let dayIndex = date.getDay();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[dayIndex];

  return `${day} ${hours}:${minutes}`;
}

function search(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-input");
  const cityNameInput = searchInput.value.toLowerCase();
  if (weather[cityNameInput] !== undefined) {
    let cityName = document.querySelector(".cityname");
    retrievePosition(weather[cityNameInput]);
  } else {
    alert(
      `Sorry, we don't know the weather for this city, try going to https://www.google.com/search?q=weather+${searchInput.value}`
    );
  }
}

let form = document.getElementById("search-bar");
form.addEventListener("submit", search);

let dateElement = document.getElementById("date");
let currentTime = new Date();
dateElement.innerHTML = formDate(currentTime);

let currentTemp = "c";

function fTemp(fahrenheit) {
  let fTemp = fahrenheit;
  let fCel = ((fTemp - 32) * 5) / 9;
  return Math.round(fCel);
}

function cToF(celsius) {
  let cTemp = celsius;
  let cToF = (cTemp * 9) / 5 + 32;
  return Math.round(cToF);
}

function changeTemptoF(event) {
  event.preventDefault();
  let temp = document.getElementById("temperature");
  if (currentTemp === "c") {
    temp.innerText = fTemp(temp.innerText);
    document.getElementById("temperatureSymbol").innerText = "F";
    currentTemp = "f";
  }
}

function changeTemptoC(event) {
  event.preventDefault();
  let temp = document.getElementById("temperature");
  if (currentTemp === "f") {
    temp.innerText = cToF(temp.innerText);
    document.getElementById("temperatureSymbol").innerText = "C";
    currentTemp = "c";
  }
}

let elementF = document.getElementById("farenheit-link");
elementF.addEventListener("click", changeTemptoF);

let elementC = document.getElementById("celcius-link");
elementC.addEventListener("click", changeTemptoC);

function showWeather(response) {
  let h1 = document.querySelector("h1");
  let h2 = document.querySelector("h2");
  let h3 = document.querySelector("h3");
  let tempBase = document.getElementById("temperature");
  let tempSymbol = document.getElementById("temperatureSymbol");
  let temperature = Math.round(response.data.main.temp);
  h1.innerHTML = `It is currently ${temperature}° in ${response.data.name}`;
  h2.innerHTML = ` ${response.data.name} `;
  tempBase.innerHTML = temperature;
  tempSymbol.innerHTML = currentTemp.toUpperCase();
}

function retrievePosition(position) {
  let currentInput = document.querySelector("#current-input");
  let apiKey = "73a00877081bd43422bdee0f3022beb5";
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
  axios.get(url).then(showWeather);
}

document.getElementById("current-input").onclick = function () {
  navigator.geolocation.getCurrentPosition(retrievePosition);
};
