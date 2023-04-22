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
  let apiKey = "62bc298785543e137bc6756e514eb1c3";
  let url = `https://api.openweathermap.org/data/2.5/weather?q=${searchInput.value
    .trim()
    .toLowerCase()}&appid=${apiKey}`;
  axios.get(url).then(showWeather);
}

let form = document.getElementById("search-bar");
form.addEventListener("submit", search);

let dateElement = document.getElementById("date");
let currentTime = new Date();
dateElement.innerHTML = formDate(currentTime);

/*
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
elementC.addEventListener("click", changeTemptoC); */

function showWeather(response) {
  console.log(response);
  let title = document.querySelector("#title");
  let city = document.querySelector("#city");
  let description = document.querySelector("#description");
  let temp_min = document.querySelector("#temp_min");
  let temp_max = document.querySelector("#temp_max");
  let wind_speed = document.querySelector("#wind_speed");
  let humidity = document.querySelector("#humidity");
  let feels_like = document.querySelector("#feels_like");
  let temperature = document.querySelector("#temperature");
  let icon = document.querySelector("#icon");
  temperature.innerHTML = `${response.data.main.temp}`;
  title.innerHTML = `It is currently ${response.data.main.feels_like}°F in ${response.data.name}`;
  city.innerHTML = ` ${response.data.name} `;
  description.innerHTML = `${response.data.weather[0].description}`;
  icon.src = `https://openweathermap.org/img/wn/${response.data.weather[0].icon}.png`;
  temp_max.innerHTML = ` ${response.data.main.temp_max}`;
  temp_min.innerHTML = ` ${response.data.main.temp_min}`;
  wind_speed.innerHTML = `${response.data.wind.speed}`;
  humidity.innerHTML = `${response.data.main.humidity}`;
  geoCoding();
}

document.getElementById("current-input").onclick = function () {
  navigator.geolocation.getCurrentPosition(retrievePosition);
};

function geoCoding(response) {
  let searchInput = document.querySelector("#search-input");
  let apiKey = "62bc298785543e137bc6756e514eb1c3";
  let url = `http://api.openweathermap.org/geo/1.0/direct?q=${searchInput.value}&limit=5&appid=${apiKey}`;
  axios.get(url).then(function (response) {
    console.log(response);
    Smork(response);
  });
}

function Smork(response) {
  let smork = response.data[0].name;
  let apiKey = "eac360db5fc86ft86450f3693e73o43f";
  let url = `https://api.shecodes.io/weather/v1/forecast?query=${smork}&key=${apiKey}&units=metric`;
  axios.get(url).then(function (response) {
    console.log(response);
    RenderSmork(response);
  });
}

function RenderSmork(response) {
  let day = ` <div class="card">
                            <div class="card-body">
                                <h5 class="card-title">Monday</h5>
                                <i><span> Weather type: </span>${response.data.daily[0].condition.description},
                                <span> day temperature </span> ${response.data.daily[0].temperature.day}°C,
                                <span> humidity </span> ${response.data.daily[0].temperature.humidity}%,
                                <span> wind speed </span> ${response.data.daily[0].wind.speed}m/s;</i>
                            </div>
                        </div>

                        <div class="card">
                            <div class="card-body">
                                <h5 class="card-title">Tuesday</h5>
                                <i><span> Weather type: </span>${response.data.daily[1].condition.description},
                                <span> day temperature </span> ${response.data.daily[1].temperature.day}°C,
                                <span> humidity </span> ${response.data.daily[1].temperature.humidity}%,
                                <span> wind speed </span> ${response.data.daily[1].wind.speed}m/s;</i>
                            </div>
                        </div>

                        <div class="card">
                            <div class="card-body">
                                <h5 class="card-title">Wednesday</h5>
                                <i><span> Weather type: </span>${response.data.daily[2].condition.description},
                                <span> day temperature </span> ${response.data.daily[2].temperature.day}°C,
                                <span> humidity </span> ${response.data.daily[2].temperature.humidity}%,
                                <span> wind speed </span> ${response.data.daily[2].wind.speed}m/s;</i>
                            </div>
                        </div>

                        <div class="card">
                            <div class="card-body">
                                <h5 class="card-title">Thursday</h5>
                                <i><span> Weather type: </span>${response.data.daily[3].condition.description},
                                <span> day temperature </span> ${response.data.daily[3].temperature.day}°C,
                                <span> humidity </span> ${response.data.daily[3].temperature.humidity}%,
                                <span> wind speed </span> ${response.data.daily[3].wind.speed}m/s;</i>
                            </div>
                        </div>

                        <div class="card">
                            <div class="card-body">
                                <h5 class="card-title">Friday</h5>
                                <i><span> Weather type: </span>${response.data.daily[4].condition.description},
                                <span> day temperature </span> ${response.data.daily[4].temperature.day}°C,
                                <span> humidity </span> ${response.data.daily[4].temperature.humidity}%,
                                <span> wind speed </span> ${response.data.daily[4].wind.speed}m/s;</i>
                            </div>
                        </div> `;
  document.getElementById("day").innerHTML = day;
}
