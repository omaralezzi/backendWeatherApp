// weather application
// express server
const express = require("express");
// https module
const https = require("https");
// environment variables
require("dotenv").config();
// body parser
const bodyParser = require("body-parser");

// importing the env variables PORT and apiKey from .env file
const PORT = process.env.PORT || 3000;

//api key for weather api openweathermap.org
const apiKey = process.env.API_KEY;

// Create a new express application instance
const app = express();

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  // here need to re-add

  // //Step to generate query string
  // const queryCity = "dusseldorf";
  // const units = "metric";

  // // api link for openweathermap
  // const url =
  //   `https://api.openweathermap.org/data/2.5/weather?q=${queryCity}&appid=${apiKey}&units=${units}`;

  //   console.log(url);
  // // need to disable res.send because we can one have one in the same time under this function !!!
  //   // res.send("Server is up and running");

  //   // to show the status code from the response of the openweathermap api
  //   https.get(url, (resp) => {
  //     console.log(resp.statusCode);

  //     // to show the response body pure data before parssing them
  //     // resp.on('data', (pureHexaData) => {
  //     //   console.log(pureHexaData);
  //     // });

  //     // to show the response body pure data after parssing them
  //     resp.on("data", (pureHexaData) => {
  //       // console.log(JSON.parse(pureHexaData));
  //       const weatherData = JSON.parse(pureHexaData);
  //       const temp = weatherData.main.temp;
  //       const weatherDescription = weatherData.weather[0].description;
  //       const weatherIcon = weatherData.weather[0].icon;
  //       console.log(temp);
  //       console.log(weatherDescription);
  //       console.log(weatherIcon);
  //       const weatherDescriptionImg = `http://openweathermap.org/img/wn/${weatherIcon}@4x.png`;  // @2x.png is the size of the image
  //       console.log(weatherDescriptionImg);

  //       // using res.write offer many responses in the same time but it must end with res.send()
  //       // res.send(`<h2 style="color:blue;">The temperature in Düsseldorf city is <i>${temp}</i> and the weather is <i>${weatherDescription}</i></h2>`);

  //       res.write("<p> the weather is currently " + weatherDescription + "</p>");
  //       res.write(`<h2 style="color:blue;">The temperature in Dusseldorf city is <i>${temp}</i> and the weather is <i>${weatherDescription}</i></h2>`);
  //       res.write(`<img src="${weatherDescriptionImg}" alt="weather icon">`);
  //       res.send();

  //     });
  //   });
  res.sendFile(__dirname + "/index.html");
});

app.post("/", (req, res) => {
  // console.log("Post from the index.html received");
  // console.log(req.body.cityName);

  //Step to generate query string
  const queryCity = req.body.cityName;
  const units = "metric";

  // api link for openweathermap
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${queryCity}&appid=${apiKey}&units=${units}`;

  console.log(url);

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
      const weatherDescriptionImg = `http://openweathermap.org/img/wn/${weatherIcon}@4x.png`; // @2x.png is the size of the image
      console.log(weatherDescriptionImg);

      // using res.write offer many responses in the same time but it must end with res.send()
      // res.send(`<h2 style="color:blue;">The temperature in Düsseldorf city is <i>${temp}</i> and the weather is <i>${weatherDescription}</i></h2>`);

      res.write("<p> the weather is currently " + weatherDescription + "</p>");
      res.write(
        `<h2 style="color:blue;">The temperature in ${queryCity} city is <i>${temp}</i> and the weather is <i>${weatherDescription}</i></h2>`
      );
      res.write(`<img src="${weatherDescriptionImg}" alt="weather icon">`);
      res.send();
    });
  });
});

// The port the express app will listen on
app.listen(PORT, () => {
  console.log("Example app listening on port 3000!");
});
