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
        d.getFullYear() + "/" + (d.getMonth() + 1) + "/" + d.getDate();

      var tempF = Math.floor((response.main.temp - 273.15) * 1.8 + 32);
      //.html might not work bc you're not adding a whole element!
      $("#cityNameText").html(response.Name + todaysDate);
      $(".currentTemp").html(tempF);
      $(".currentWind").html(response.wind);
      //   $(".currentUV").html.(response.)
    });
  });
});
