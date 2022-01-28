const cityHistory = [];
const apiKey = "8d27d3e5298217240e160a88d8accd8c";
const resultElement = document.getElementById("result");
const weatherForecast = document.getElementById("weather-forecast");
const cityForm = document.getElementById("city-form");
const cityInput = document.getElementById("city-name");
const searchBtn = document.getElementById("searchBtn");
const historyContainer = document.getElementById("city-history");


const getCity = function(event){ 
    event.preventDefault();
    var cityName = cityInputEl.value.trim();
    if(cityName){
        //run the get weather function 
        getWeatherInfo(cityName);
        //clear the input filed 
        cityInputEl.value="";
        // if there is no input for the user 
    }else{
        // alert the user to enster a valid city 
        swal("Error City not Found",{
            buttons: {
                cancel:true,
                confirm:false,
            },
         })
    }
}

const getWeatherInfo = function (city) {
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
        swal("Error City not found",{
            buttons: {
                cancel:true,
                confirm:false,
            },
         })
      }
    })
    .catch(function (error) {
        swal("error City not found",{
          buttons: {
              cancel:true,
              confirm:false,
          },
       })
      });
  };