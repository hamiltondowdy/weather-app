var cityHistory = [];
var apiKey = "8d27d3e5298217240e160a88d8accd8c";
var resultElement = document.getElementById("result");
var weatherForecast = document.getElementById("weather-forecast");
var cityForm = document.getElementById("city-form");
var cityInput = document.getElementById("city-name");
var searchBtn = document.getElementById("searchBtn");
var historyContainer = document.getElementById("city-history");


var nameEl =document.createElement("a")

nameEl.setAttribute("class","city-name");
nameEl.setAttribute("href", "./second-page.html");

var iconEl =document.createElement("img");
// assign an SRC attribute to hold the icon URL
iconEl.setAttribute("src","");
var tempEl= document.createElement("p");
var humidityEl= document.createElement("p");
var windEl= document.createElement("p");
var descEl= document.createElement("p");
// appending the dynamically created element
resultElement.append(nameEl,iconEl,tempEl,humidityEl,windEl,descEl);

function appendToHistory(city) {
    // If there is no search term return the function
    if (cityHistory.indexOf(city) !== -1) {
    return;
  }
  cityHistory.push(city);

 localStorage.setItem('search-history',JSON.stringify(cityHistory));
}


var getCity = function(event){ 
    event.preventDefault();
    var cityName = cityInput.value.trim();
    if(cityName){
        getWeatherInfo(cityName);
        //cityInput.value="";
    }else{
        throw("Error City not Found",{
            buttons: {
                cancel:true,
                confirm:false,
            },
         })
    }
}

var getWeatherInfo = function (city) {
    const apiUrl = 
    "https://api.openweathermap.org/data/2.5/weather?q=" +
    city +
    "&units=imperial&appid=" +
    apiKey;
  fetch(apiUrl)
    .then(function (response) {
      if (response.ok) {
        response.json().then(function (data) {
          appendToHistory(city);
          getWeather(data, city);
        });
      } else {
        throw("Error City not found",{
            buttons: {
                cancel:true,
                confirm:false,
            },
         })
      }
    })
    .catch(function (error) {
        throw("error City not found",{
          buttons: {
              cancel:true,
              confirm:false,
          },
       })
      });
  };

var getWeather = function(data) {
    var {name} = data;
    var {icon,description}= data.weather[0];
    var {temp,humidity}= data.main;
    console.log (name,icon,temp,humidity,description);
    nameEl.innerText = "Temp: "+ temp + "F";
    iconEl.src = "http://openweathermap.org/img/wn/" + icon + "@2x.png"
    humidityEl.innerText = "Humidity: "+ humidity;
    descEl.innerText = description;

}