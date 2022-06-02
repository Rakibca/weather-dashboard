let cities = [];
let dateToday = moment().format("l");
let day1 = moment().add(1, "days").format("l");
let day2 = moment().add(2, "days").format("l");
let day3 = moment().add(3, "days").format("l");
let day4 = moment().add(4, "days").format("l");
let day5 = moment().add(5, "days").format("l");
let weatherData = document.getElementById("weatherData");


weatherData.addEventListener("click", function(event) {
  event.preventDefault();
  let cityName = document.getElementById("cityName").value;

  //var element = document.querySelector("button-container");
  var btn = document.createElement("button");
  var t = document.createTextNode(cityName);
  btn.setAttribute("style", "color:red;font-size:23px");
  btn.appendChild(t);
  document.body.appendChild(btn);
  //btn.setAttribute("onclick", alert("clicked"));
  //$("#button-container").addClass("btn");
   //$("p:nth-child(5)").css("background-color", "yellow");

  console.log(cityName);
  localStorage.setItem("profile", cityName);
  cities.push(cityName);
  localStorage.setItem("cities", JSON.stringify(cities));

  let searchedCities = JSON.parse(localStorage.getItem("cities"));
  if (searchedCities) {
    cities = searchedCities
    console.log(cities);
  } else {
    cities = [];
  }




  // var btn = document.createElement("BUTTON");
  // var t = document.createTextNode("CLICK ME");
  // btn.setAttribute("style", "color:red;font-size:23px");
  // btn.appendChild(t);
  // document.body.appendChild(btn);
  // btn.setAttribute("onclick", alert("clicked"));





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

        document.getElementById("displayName").innerHTML = data.name + "  " + "(" + dateToday + ")";
        //document.getElementById("img0").src = "http://openweathermap.org/img/wn/" + data.weather[0].icon + ".png";
        document.getElementById("displayTemp").innerHTML = "Temp: " + Number(data.main.temp).toFixed(1) + " °C";
        document.getElementById("displayWind").innerHTML = "Wind: " + Number(data.wind.speed).toFixed(1) + " MPH";
        document.getElementById("displayHumidity").innerHTML = "Humidity: " + Number(data.main.temp).toFixed(1) + " %";
        document.getElementById("displayUV").innerHTML = "UV Index: " + Number(data.main.temp).toFixed(1);
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
      document.getElementById("day1").textContent = day1;
      document.getElementById("day2").textContent = day2;
      document.getElementById("day3").textContent = day3;
      document.getElementById("day4").textContent = day4;
      document.getElementById("day5").textContent = day5;
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
