$(document).ready(function () {
  var cities = JSON.parse(localStorage.getItem('cities')) || [];
  function renderCities() {
    $("#previousSearchList").empty();
    for (var i = 0; i < cities.length; i++) {
      $("#previousSearchList").append('<button type="button" class="btn btn-primary btn-md btn-block oldCity">' + cities[i] + '</button>')
    }
  }

  function getWeather(city) {
    var queryURL =
      "https://api.openweathermap.org/data/2.5/weather?q=" +
      city +
      "&appid=1342e1bc1df48134a2a819f9c3969c81";

    $.ajax({
      url: queryURL,
      method: "GET",
    }).then(function (response) {

      var d = new Date();
      var todaysDate =
        (d.getMonth() + 1) + "/" + d.getDate() + "/" + d.getFullYear();

      var tempF = Math.floor((response.main.temp - 273.15) * 1.8 + 32);
      var cityImage = "http://openweathermap.org/img/wn/" + response.weather[0].icon + "@2x.png";

      $("#cityNameText").html(response.name + " " + todaysDate);
      $('.cityImage').append('<img src="' + cityImage + '"/>');
      $(".currentHumidity").html("Current Humidity: " + response.main.humidity + "%");
      $(".currentTemp").html("Current Temperature: " + tempF + "\xB0 F");
      $(".currentWind").html(
        "Current Wind Speed: " + response.wind.speed + "MPH"
      );

      var longitude = response.coord.lon;
      var latitude = response.coord.lat;

      queryURLBig = "https://api.openweathermap.org/data/2.5/onecall?lat=" + latitude + "&lon=" + longitude + "&appid=1342e1bc1df48134a2a819f9c3969c81";

      $.ajax({
        url: queryURLBig,
        method: "GET",
      }).then(function (response) {
        $(".currentUV").html("Current UV Index: " + response.current.uvi)

        var UVNumber = parseFloat(response.current.uvi)
        if (UVNumber < 3) {
          $(".currentUV").addClass("favorable")
          $(".currentUV").removeClass("moderate severe")
        }
        else if (UVNumber >= 3 && UVNumber < 8) {
          $(".currentUV").addClass("moderate")
          $(".currentUV").removeClass("favorable severe")
        }
        else {
          $(".currentUV").addClass("severe")
          $(".currentUV").removeClass("favorable moderate")
        }

        //creating the for loop to iterate through the days - set up one and make sure it works, and THEN go back and replace it w "i"
        for (var i = 1; i < 6; i++) {
          var fiveDayTemp = Math.floor((response.daily[i].temp.day - 273.15) * 1.8 + 32);
          var ts = response.daily[i].dt
          var ts_ms = ts * 1000;
          var date_ob = new Date(ts_ms);
          var year = date_ob.getFullYear();
          var month = ("0" + (date_ob.getMonth() + 1)).slice(-2);
          var date = ("0" + date_ob.getDate()).slice(-2);
          var fiveDayDate = (month + "/" + date + "/" + year)
          var weatherIconForecast = "http://openweathermap.org/img/wn/" + response.daily[i].weather[0].icon + "@2x.png"
          //template literals or string interpolation-- dynamically selects
          $(`.dateText${i}`).html(fiveDayDate);
          $(`#weatherIcon${i}`).attr("src", weatherIconForecast);
          $(`.tempText${i}`).html("Temp: " + fiveDayTemp + "\xB0 F");
          $(`.humidityText${i}`).html("Humidity: " + response.daily[i].humidity + "%");
        }

      });

    });
  };

  $("#searchBtn").on("click", function (event) {
    event.preventDefault();

    function saveToStore() {
      localStorage.setItem("cities", JSON.stringify(cities));
    }

    var city = $("#searchedCity").val();

    if (!cities.includes(city)) {
      cities.push(city);
      console.log(cities);
      saveToStore();
    }
    renderCities();

    getWeather(city);

  });

  renderCities()

  $("#previousSearchList").on("click", ".oldCity", function (event) {
    event.preventDefault();

    var city = $(this).text();

    getWeather(city);


  });
});