//let cityNameEl = document.getElementById("search-input");
let startDate = moment().format("MM-DD-YYYY");



// let newDate1 = moment(startDate, "MM-DD-YYYY").add(5, 'days');;
// let newDate1 = moment().add(5, 'days').format("MM-DD-YYYY");
// let day1El = document.querySelector("card-text");
// day1El.innerHTML = newDate1;
// console.log(newDate1);

function getForecast() {
  let weatherData = document.getElementById("weatherData");
  weatherData.addEventListener("click", function(event) {
    event.preventDefault();
    let cityName = document.getElementById("cityName").value;

    console.log(cityName);
    let city = {
      name: cityName
    };
    localStorage.setItem("profile", JSON.stringify(city));
    //alert(localStorage.getItem("profile"));

    let urlApi = "https://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&units=metric&appid=b1969f4d80b7913cb634923b17dd0605";
    let urlFiveDay = "https://api.openweathermap.org/data/2.5/forecast?q=" + cityName + "&units=metric&appid=b1969f4d80b7913cb634923b17dd0605";
    if (cityName == "") {
      console.log("Please enter a city name");
    } else {
      fetch(urlApi)
        .then(function(response) {
          if (!response.ok) {
            throw response.json();
          }
          return response.json();
        })
        .then(function(data) {
          console.log(data);
          let nameOfCity = `<h5><span>City: </span>${data.name}</h5>`;
          document.getElementById("display_city").insertAdjacentHTML('afterbegin', nameOfCity);
          let temp = `<h5><span>Temp: </span>${data.main.temp}<span> °C</span></h5>`;
          document.getElementById("display_temp").insertAdjacentHTML('afterbegin', temp);
          let wind = `<h5><span>Wind: </span>${data.wind.speed}<span> MPH</span></h5>`;
          document.getElementById("display_wind").insertAdjacentHTML('afterbegin', wind);
          let uv = `<h5><span>UV Index: </span>${data.wind.speed}<span></span></h5>`;
          document.getElementById("display_uv").insertAdjacentHTML('afterbegin', uv);
        })
        .catch(function(error) {
          console.log(error);
        });
    }

    fetch(urlFiveDay)
      .then(function(response) {
        if (!response.ok) {
          throw response.json();
        }
        return response.json();
      })
      .then(function(data) {
        console.log('Fetch Response: \n--------------');
        console.log(data);
        for (i = 0; i < 5; i++) {
          document.getElementById("img" + (i + 1)).src = "http://openweathermap.org/img/wn/" + data.list[i].weather[0].icon + ".png";
        }
        for (i = 0; i < 5; i++) {
          document.getElementById("temp" + (i + 1)).innerHTML = "Temp: " + Number(data.list[i].main.temp).toFixed(1) + " °C";
        }
        for (i = 0; i < 5; i++) {
          document.getElementById("wind" + (i + 1)).innerHTML = "Wind: " + Number(data.list[i].wind.speed).toFixed(1) + " MPH";
        }
        for (i = 0; i < 5; i++) {
          document.getElementById("humidity" + (i + 1)).innerHTML = "Humidity: " + Number(data.list[i].main.temp).toFixed(1) + " %";
        }
      })
  });
}

getForecast();
