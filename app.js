// weather application 
// express server
const express = require('express'); 
// https module
const https = require('https');

// Create a new express application instance
const app = express(); 

// api link for openweathermap
const url =
  "https://api.openweathermhttps://api.openweathermap.org/data/2.5/weather?q=Duesseldorf,germany&appid=e747450ae79de538a4c9c6149a492561&units=metricap.org/data/2.5/weather?q=London,uk&appid=e747450ae79de538a4c9c6149a492561";


app.get('/', (req, res) => {
    res.send('Server is up and running');

    https.get(url, (resp) => {
    console.log(resp);
    })
});




// The port the express app will listen on
app.listen(3000, () => {
  console.log('Example app listening on port 3000!');
}
);
