const express = require("express");
const https = require("https");
require("dotenv").config();

const app = express();

const API_KEY = process.env.API_KEY;


app.get("/", function(req,res){

    let url = "https://api.openweathermap.org/data/2.5/weather?q=toronto&appid=" + API_KEY+"&units=metric";

    https.get(url, function(response){

        response.on("data", function(data){

            const weatherData  = JSON.parse(data);
            const temp = weatherData.main.temp;
            const description = weatherData.weather[0].description;
            const city = weatherData.name;
            const icon = weatherData.weather[0].icon;
            const iconURL = "http://openweathermap.org/img/wn/"+icon+"@2x.png";
  
           res.write("<h1>The temperature in " + city + " is " + temp + " degrees Celsius </h1>");
            res.write("<h3>The weather  is " + description +" </h3>");
            res.write("<img src ="+iconURL+ ">");
            res.send();
        });
       
    });

});





app.listen(3000, function(){

console.log("Server running on port 3000.....");

});

