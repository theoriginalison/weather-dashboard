console.log("Here we go! You got this !! :D");

// AP KEY: 1342e1bc1df48134a2a819f9c3969c81

// City name API Call: api.openweathermap.org/data/2.5/weather?q={city name}&appid=1342e1bc1df48134a2a819f9c3969c81

//**Need Latitude and Longitude from City API*/
// ONE CALL API Call: https://api.openweathermap.org/data/2.5/onecall?lat={lat}&lon={lon}&exclude={part}&appid=1342e1bc1df48134a2a819f9c3969c81


$(document).ready(function () {
  $("#searchBtn").on("click", function (event) {
    event.preventDefault();
    //bc this is only taking one city
    const cities = []

    function saveToStore() {
      localStorage.setItem("cities", JSON.stringify(cities));
    }

    const city = $("#searchedCity").val();


    if (!cities.includes(city)) {
      cities.push(city);
      console.log(cities);
      saveToStore();
    }
    for (var i = 0; i < cities.length; i++) {
      $("#previousSearchList").append('<button type="button" class="btn btn-primary btn-md btn-block">' + cities[i] + '</button>')
    }
    // $("#previousSearchList").prepend('<button type="button" class="btn btn-primary btn-md btn-block">' + city + '</button>')

    var queryURL =
      "https://api.openweathermap.org/data/2.5/weather?q=" +
      city +
      "&appid=1342e1bc1df48134a2a819f9c3969c81";

    // console.log(queryURL);

    $.ajax({
      url: queryURL,
      method: "GET",
    }).then(function (response) {
      console.log(response);

      var d = new Date();
      var todaysDate =
        (d.getMonth() + 1) + "/" + d.getDate() + "/" + d.getFullYear();

      var tempF = Math.floor((response.main.temp - 273.15) * 1.8 + 32);
      $("#cityNameText").html(response.name + " " + todaysDate);
      $(".currentHumidity").html("Current Humidity: " + response.main.humidity);
      $(".currentTemp").html("Current Temperature: " + tempF + "\xB0 F");
      $(".currentWind").html(
        "Current Wind Speed: " + response.wind.speed + "MPH"
      );

      // //Five Day Forecast - date, temp, humidity
      // //Day 1
      //   dayOnetemp = Math.floor((response.daily.temp.day - 273.15) * 1.8 + 32);
      //   $(".dateText1").html();
      //   $("#weatherIcon1").html();
      //   $(".tempText1").html();
      //   $(".humidityText1").html();

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
        //need uvi as a value?
        //var uviColor = //need uvi as a value to create an if/else statement w colors for favorable moderate severe--already added in the CSS

      });


      //need local storage-- this just sets the item for now, but it's cleared as soon as something new is entered
      //each city needs to be pushed inside of a cities array

      // var storedCities = localStorage.getItem("city"); then prepend each?
    });
  });
});

//use lat and long from this API to get the ONE CALL API, then use the same .html appending to enter that info-- just a LOT of it-- you need th

//LUXON for the date (or moment-- that's fine, too)
//img.attr("src", "url...")