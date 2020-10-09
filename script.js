console.log("Here we go! You got this !! :D");

//TO DO:
//UV Index CSS classes for color and the range

$(document).ready(function () {
  var cities = JSON.parse(localStorage.getItem('cities')) || [];
  function renderCities() {
    $("#previousSearchList").empty();
    for (var i = 0; i < cities.length; i++) {
      $("#previousSearchList").append('<button type="button" class="btn btn-primary btn-md btn-block oldCity">' + cities[i] + '</button>')
    }
  }
  //this is where #previousSearchList
  $("#searchBtn").on("click", function (event) {
    event.preventDefault();

    function saveToStore() {
      localStorage.setItem("cities", JSON.stringify(cities));
    }
    //this line below will need to be changed in the copy and paste
    var city = $("#searchedCity").val();

    if (!cities.includes(city)) {
      cities.push(city);
      console.log(cities);
      saveToStore();
    }
    renderCities()

    var queryURL =
      "https://api.openweathermap.org/data/2.5/weather?q=" +
      city +
      "&appid=1342e1bc1df48134a2a819f9c3969c81";

    console.log(queryURL);

    $.ajax({
      url: queryURL,
      method: "GET",
    }).then(function (response) {
      console.log(response);

      var d = new Date();
      var todaysDate =
        (d.getMonth() + 1) + "/" + d.getDate() + "/" + d.getFullYear();

      var tempF = Math.floor((response.main.temp - 273.15) * 1.8 + 32);
      var cityImage = "http://openweathermap.org/img/wn/" + response.weather[0].icon + "@2x.png";
      console.log(cityImage)
      console.log(response.weather[0].icon)
      $("#cityNameText").html(response.name + " " + todaysDate);
      $('.cityImage').append('<img src="' + cityImage + '"/>');
      $(".currentHumidity").html("Current Humidity: " + response.main.humidity);
      $(".currentTemp").html("Current Temperature: " + tempF + "\xB0 F");
      $(".currentWind").html(
        "Current Wind Speed: " + response.wind.speed + "MPH"
      );






      var longitude = response.coord.lon;
      var latitude = response.coord.lat;

      queryURLBig = "https://api.openweathermap.org/data/2.5/onecall?lat=" + latitude + "&lon=" + longitude + "&appid=1342e1bc1df48134a2a819f9c3969c81";
      console.log(queryURLBig)

      $.ajax({
        url: queryURLBig,
        method: "GET",
      }).then(function (response) {
        console.log(response.current.uvi);
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

        // Five Day Forecast
        // //Day 1
        dayOneTemp = Math.floor((response.daily[0].temp.day - 273.15) * 1.8 + 32);
        var ts = response.daily[0].dt
        var ts_ms = ts * 1000;
        var date_ob = new Date(ts_ms);
        var year = date_ob.getFullYear();
        var month = ("0" + (date_ob.getMonth() + 1)).slice(-2);
        var date = ("0" + date_ob.getDate()).slice(-2);
        var dayOneDate = (month + "/" + date + "/" + year)
        var weatherIconOne = "http://openweathermap.org/img/wn/" + response.daily[0].weather[0].icon + "@2x.png"

        console.log(weatherIconOne)

        $(".dateText1").html(dayOneDate);
        $("#weatherIcon1").attr("src", weatherIconOne);
        $(".tempText1").html("Temperature: " + dayOneTemp + "\xB0 F");
        $(".humidityText1").html("Humidity: " + response.daily[0].humidity);

        // //Day 2
        dayTwoTemp = Math.floor((response.daily[1].temp.day - 273.15) * 1.8 + 32);
        var ts = response.daily[1].dt
        var ts_ms = ts * 1000;
        var date_ob = new Date(ts_ms);
        var year = date_ob.getFullYear();
        var month = ("0" + (date_ob.getMonth() + 1)).slice(-2);
        var date = ("0" + date_ob.getDate()).slice(-2);
        var dayTwoDate = (month + "/" + date + "/" + year)
        var weatherIconTwo = "http://openweathermap.org/img/wn/" + response.daily[1].weather[0].icon + "@2x.png"

        $(".dateText2").html(dayTwoDate);
        $("#weatherIcon2").attr("src", weatherIconTwo);
        $(".tempText2").html("Temperature: " + dayTwoTemp + "\xB0 F");
        $(".humidityText2").html("Humidity: " + response.daily[1].humidity);

        // //Day 3
        dayThreeTemp = Math.floor((response.daily[2].temp.day - 273.15) * 1.8 + 32);
        var ts = response.daily[2].dt
        var ts_ms = ts * 1000;
        var date_ob = new Date(ts_ms);
        var year = date_ob.getFullYear();
        var month = ("0" + (date_ob.getMonth() + 1)).slice(-2);
        var date = ("0" + date_ob.getDate()).slice(-2);
        var dayThreeDate = (month + "/" + date + "/" + year)
        var weatherIconThree = "http://openweathermap.org/img/wn/" + response.daily[2].weather[0].icon + "@2x.png"

        $(".dateText3").html(dayThreeDate);
        $("#weatherIcon3").attr("src", weatherIconThree);
        $(".tempText3").html("Temperature: " + dayThreeTemp + "\xB0 F");
        $(".humidityText3").html("Humidity: " + response.daily[2].humidity);

        // //Day 4
        dayFourTemp = Math.floor((response.daily[3].temp.day - 273.15) * 1.8 + 32);
        var ts = response.daily[3].dt
        var ts_ms = ts * 1000;
        var date_ob = new Date(ts_ms);
        var year = date_ob.getFullYear();
        var month = ("0" + (date_ob.getMonth() + 1)).slice(-2);
        var date = ("0" + date_ob.getDate()).slice(-2);
        var dayFourDate = (month + "/" + date + "/" + year)
        var weatherIconFour = "http://openweathermap.org/img/wn/" + response.daily[3].weather[0].icon + "@2x.png"

        $(".dateText4").html(dayFourDate);
        $("#weatherIcon4").attr("src", weatherIconFour);
        $(".tempText4").html("Temperature: " + dayFourTemp + "\xB0 F");
        $(".humidityText4").html("Humidity: " + response.daily[3].humidity);

        // //Day 5
        dayFiveTemp = Math.floor((response.daily[4].temp.day - 273.15) * 1.8 + 32);
        var ts = response.daily[4].dt
        var ts_ms = ts * 1000;
        var date_ob = new Date(ts_ms);
        var year = date_ob.getFullYear();
        var month = ("0" + (date_ob.getMonth() + 1)).slice(-2);
        var date = ("0" + date_ob.getDate()).slice(-2);
        var dayFiveDate = (month + "/" + date + "/" + year)
        var weatherIconFive = "http://openweathermap.org/img/wn/" + response.daily[4].weather[0].icon + "@2x.png"

        $(".dateText5").html(dayFiveDate);
        $("#weatherIcon5").attr("src", weatherIconFive);
        $(".tempText5").html("Temperature: " + dayFiveTemp + "\xB0 F");
        $(".humidityText5").html("Humidity: " + response.daily[4].humidity);

      });

    });
  });
  renderCities()


  //use lat and long from this API to get the ONE CALL API, then use the same .html appending to enter that info-- just a LOT of it-- you need th

  //LUXON for the date (or moment-- that's fine, too)
  //img.attr("src", "url...")

  //weather icon: http://openweathermap.org/img/wn/{imgherelike10d}@2x.png
  //"http://openweathermap.org/img/wn/" + response.weather.icon + "@2x.png"
  //for usual search:
  //for big search:




  //FOR APPENDED CITIES / SEARCHED CITIES

  $("#previousSearchList").on("click", ".oldCity", function (event) {
    event.preventDefault();

    var city = $(this).text();
    console.log(city)

    var queryURL =
      "https://api.openweathermap.org/data/2.5/weather?q=" +
      city +
      "&appid=1342e1bc1df48134a2a819f9c3969c81";

    console.log(queryURL);

    $.ajax({
      url: queryURL,
      method: "GET",
    }).then(function (response) {
      console.log(response);

      var d = new Date();
      var todaysDate =
        (d.getMonth() + 1) + "/" + d.getDate() + "/" + d.getFullYear();

      var tempF = Math.floor((response.main.temp - 273.15) * 1.8 + 32);
      var cityImage = "http://openweathermap.org/img/wn/" + response.weather[0].icon + "@2x.png";
      console.log(cityImage)
      console.log(response.weather[0].icon)
      $("#cityNameText").html(response.name + " " + todaysDate); // + response.weather.icon - need to create this first as a variable
      $('.cityImage').append('<img src="' + cityImage + '"/>')
      $(".currentHumidity").html("Current Humidity: " + response.main.humidity);
      $(".currentTemp").html("Current Temperature: " + tempF + "\xB0 F");
      $(".currentWind").html(
        "Current Wind Speed: " + response.wind.speed + "MPH"
      );

      // //Five Day Forecast - date, temp, humidity
      // //Day 1
      //   dayOneTemp = Math.floor((response.daily.temp.day - 273.15) * 1.8 + 32);
      //   $(".dateText1").html();
      //   $("#weatherIcon1").html();
      //   $(".tempText1").html("Current Temperature: " + dayOneTemp + "\xB0 F");
      //   $(".humidityText1").html("Current Humidity: " + response.daily.humidity);

      // //Day 2
      // //Day 3
      // //Day 4
      // //Day 5



      var longitude = response.coord.lon;
      var latitude = response.coord.lat;

      queryURLBig = "https://api.openweathermap.org/data/2.5/onecall?lat=" + latitude + "&lon=" + longitude + "&appid=1342e1bc1df48134a2a819f9c3969c81";
      console.log(queryURLBig)

      $.ajax({
        url: queryURLBig,
        method: "GET",
      }).then(function (response) {
        console.log(response.current.uvi);
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

        // Five Day Forecast
        // //Day 1
        dayOneTemp = Math.floor((response.daily[0].temp.day - 273.15) * 1.8 + 32);
        var ts = response.daily[0].dt
        var ts_ms = ts * 1000;
        var date_ob = new Date(ts_ms);
        var year = date_ob.getFullYear();
        var month = ("0" + (date_ob.getMonth() + 1)).slice(-2);
        var date = ("0" + date_ob.getDate()).slice(-2);
        var dayOneDate = (month + "/" + date + "/" + year)
        var weatherIconOne = "http://openweathermap.org/img/wn/" + response.daily[0].weather[0].icon + "@2x.png"

        console.log(weatherIconOne)

        $(".dateText1").html(dayOneDate);
        $("#weatherIcon1").attr("src", weatherIconOne);
        $(".tempText1").html("Temperature: " + dayOneTemp + "\xB0 F");
        $(".humidityText1").html("Humidity: " + response.daily[0].humidity);

        // //Day 2
        dayTwoTemp = Math.floor((response.daily[1].temp.day - 273.15) * 1.8 + 32);
        var ts = response.daily[1].dt
        var ts_ms = ts * 1000;
        var date_ob = new Date(ts_ms);
        var year = date_ob.getFullYear();
        var month = ("0" + (date_ob.getMonth() + 1)).slice(-2);
        var date = ("0" + date_ob.getDate()).slice(-2);
        var dayTwoDate = (month + "/" + date + "/" + year)
        var weatherIconTwo = "http://openweathermap.org/img/wn/" + response.daily[1].weather[0].icon + "@2x.png"

        $(".dateText2").html(dayTwoDate);
        $("#weatherIcon2").attr("src", weatherIconTwo);
        $(".tempText2").html("Temperature: " + dayTwoTemp + "\xB0 F");
        $(".humidityText2").html("Humidity: " + response.daily[1].humidity);

        // //Day 3
        dayThreeTemp = Math.floor((response.daily[2].temp.day - 273.15) * 1.8 + 32);
        var ts = response.daily[2].dt
        var ts_ms = ts * 1000;
        var date_ob = new Date(ts_ms);
        var year = date_ob.getFullYear();
        var month = ("0" + (date_ob.getMonth() + 1)).slice(-2);
        var date = ("0" + date_ob.getDate()).slice(-2);
        var dayThreeDate = (month + "/" + date + "/" + year)
        var weatherIconThree = "http://openweathermap.org/img/wn/" + response.daily[2].weather[0].icon + "@2x.png"

        $(".dateText3").html(dayThreeDate);
        $("#weatherIcon3").attr("src", weatherIconThree);
        $(".tempText3").html("Temperature: " + dayThreeTemp + "\xB0 F");
        $(".humidityText3").html("Humidity: " + response.daily[2].humidity);

        // //Day 4
        dayFourTemp = Math.floor((response.daily[3].temp.day - 273.15) * 1.8 + 32);
        var ts = response.daily[3].dt
        var ts_ms = ts * 1000;
        var date_ob = new Date(ts_ms);
        var year = date_ob.getFullYear();
        var month = ("0" + (date_ob.getMonth() + 1)).slice(-2);
        var date = ("0" + date_ob.getDate()).slice(-2);
        var dayFourDate = (month + "/" + date + "/" + year)
        var weatherIconFour = "http://openweathermap.org/img/wn/" + response.daily[3].weather[0].icon + "@2x.png"

        $(".dateText4").html(dayFourDate);
        $("#weatherIcon4").attr("src", weatherIconFour);
        $(".tempText4").html("Temperature: " + dayFourTemp + "\xB0 F");
        $(".humidityText4").html("Humidity: " + response.daily[3].humidity);

        // //Day 5
        dayFiveTemp = Math.floor((response.daily[4].temp.day - 273.15) * 1.8 + 32);
        var ts = response.daily[4].dt
        var ts_ms = ts * 1000;
        var date_ob = new Date(ts_ms);
        var year = date_ob.getFullYear();
        var month = ("0" + (date_ob.getMonth() + 1)).slice(-2);
        var date = ("0" + date_ob.getDate()).slice(-2);
        var dayFiveDate = (month + "/" + date + "/" + year)
        var weatherIconFive = "http://openweathermap.org/img/wn/" + response.daily[4].weather[0].icon + "@2x.png"

        $(".dateText5").html(dayFiveDate);
        $("#weatherIcon5").attr("src", weatherIconFive);
        $(".tempText5").html("Temperature: " + dayFiveTemp + "\xB0 F");
        $(".humidityText5").html("Humidity: " + response.daily[4].humidity);
      });

    });
  });
});