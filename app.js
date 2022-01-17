// weather application
// express server
const express = require("express");
// https module
const https = require("https");

// Create a new express application instance
const app = express();

// api link for openweathermap
const url =
  "https://api.openweathermap.org/data/2.5/weather?q=Duesseldorf,germany&appid=e747450ae79de538a4c9c6149a492561&units=metric";

app.get("/", (req, res) => {
  res.send("Server is up and running");
  // to show the status code from the response of the openweathermap api
  https.get(url, (resp) => {
    console.log(resp.statusCode);

    // to show the response body pure data before parssing them
    // resp.on('data', (pureHexaData) => {
    //   console.log(pureHexaData);
    // });

    // to show the response body pure data after parssing them
    resp.on("data", (pureHexaData) => {
      // console.log(JSON.parse(pureHexaData));
      const weatherData = JSON.parse(pureHexaData);
      const temp = weatherData.main.temp;
      const weatherDescription = weatherData.weather[0].description;
      console.log(temp);
      console.log(weatherDescription);
      

    });
  });
});

// The port the express app will listen on
app.listen(3000, () => {
  console.log("Example app listening on port 3000!");
});
