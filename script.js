console.log("Here we go! You got this !! :D");

// AP KEY: 1342e1bc1df48134a2a819f9c3969c81

// City name API Call: api.openweathermap.org/data/2.5/weather?q={city name}&appid=1342e1bc1df48134a2a819f9c3969c81

//**Need Latitude and Longitude from City API*/
// ONE CALL API Call: https://api.openweathermap.org/data/2.5/onecall?lat={lat}&lon={lon}&exclude={part}&appid=1342e1bc1df48134a2a819f9c3969c81

$(document).ready(function () {
  $("#searchBtn").on("click", function (event) {
    event.preventDefault();
    var city = $("#searchedCity").val();

    console.log(city);

    //prepending to div here
    $("#previousSearchList").prepend('<button type="button" class="btn btn-primary btn-md btn-block">' + city + '</button>')

    // Need to add these classes: type="button" class="btn btn - primary btn - md btn - block"
    // $("button").addClass("btn btn-primary btn-md btn-block")

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
      $("#cityNameText").html(response.name + " " + todaysDate);
      $(".currentHumidity").html("Current Humidity: " + response.main.humidity);
      $(".currentTemp").html("Current Temperature: " + tempF);
      $(".currentWind").html(
        "Current Wind Speed: " + response.wind.speed + "mph"
      );
      //   $(".currentUV").html.(response.)
    });
  });
});

//use lat and long from this API to get the ONE CALL API, then use the same .html appending to enter that info-- just a LOT of it-- you need th

//LUXON for the date (or moment-- that's fine, too)
//img.attr("src", "url...")