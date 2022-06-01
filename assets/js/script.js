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



  // let btn = document.getElementsByClassName('btn');
  // let container = document.getElementsByClassName('container');
  //
  // let action = function(e) {
  //   // set up new button
  //   let newBtn = document.createElement('button');
  //   newBtn.innerHTML = 'this is has been clicked <span>0</span> times';
  //
  //
  //   // get the current element's count
  //   let numb = Number(e.target.children[0].innerHTML);
  //   e.target.children[0].innerHTML = numb + 1;
  // }
  // for (let i = 0; i < btn.length; i++) {
  //   btn[i].addEventListener('click', action);
  // }



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

        document.getElementById("list-group-item1").innerHTML = data.name + "  " + "(" + dateToday + ")";
        //document.getElementById("img0").src = "http://openweathermap.org/img/wn/" + data.weather[0].icon + ".png";
        document.getElementById("list-group-item2").innerHTML = "Temp: " + Number(data.main.temp).toFixed(1) + " °C";
        document.getElementById("list-group-item3").innerHTML = "Wind: " + Number(data.wind.speed).toFixed(1) + " MPH";
        document.getElementById("list-group-item4").innerHTML = "Humidity: " + Number(data.main.temp).toFixed(1) + " %";
        document.getElementById("list-group-item5").innerHTML = "Humidity: " + Number(data.main.temp).toFixed(1) + " %";
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


// function displaySearchHist() {
//
// };
