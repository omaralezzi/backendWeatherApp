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
  // need to disable res.send because we can one have one in the same time under this function !!!
  // res.send("Server is up and running");

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
      const weatherIcon = weatherData.weather[0].icon;
      console.log(temp);
      console.log(weatherDescription);
      console.log(weatherIcon);
      const weatherDescriptionImg = `http://openweathermap.org/img/wn/${weatherIcon}@4x.png`;  // @2x.png is the size of the image
      console.log(weatherDescriptionImg);
      
      // using res.write offer many responses in the same time but it must end with res.send()
      // res.send(`<h2 style="color:blue;">The temperature in Düsseldorf city is <i>${temp}</i> and the weather is <i>${weatherDescription}</i></h2>`);

      res.write("<p> the weather is currently " + weatherDescription + "</p>");
      res.write(`<h2 style="color:blue;">The temperature in Dusseldorf city is <i>${temp}</i> and the weather is <i>${weatherDescription}</i></h2>`);
      res.write(`<img src="${weatherDescriptionImg}" alt="weather icon">`);
      res.send();


    });
  });
});

// The port the express app will listen on
app.listen(3000, () => {
  console.log("Example app listening on port 3000!");
});
