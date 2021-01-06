const express = require('express');
const https = require('https');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.urlencoded({extended: true}));
app.get("/", function(req, res) {
   

   res.sendFile(__dirname+"/index.html")     
    // res.send("server is running");
})
app.post("/", function(req, res) {
    console.log(req.body.cityName);

    
const key = "3a1a87f62a32c94a7f62cc605693d891"
const unit = "metric"
const query = req.body.cityName;
const url = "https://api.openweathermap.org/data/2.5/weather?q="+ query +"&units="+ unit +"&appid="+key;
https.get(url , (response) => {
    console.log(response.statusCode);

    response.on('data', function(data) {
        const weatherData = JSON.parse(data)
        const temp = weatherData.main.temp
        const weatherDescription = weatherData.weather[0].description
        const icon = weatherData.weather[0].icon
        const imageURL = " http://openweathermap.org/img/wn/"+ icon + "@2x.png"
        res.write("<p>The weather is currently "+ weatherDescription+"</p>")
        res.write("<h1>the temperature in " + query + " is "+ temp + " °C.</h1>");
        res.write("<img src=" +imageURL+">")
        res.send()
    })
})
})

app.listen(3000, function() {
    console.log('server is running on port 3000!');
})