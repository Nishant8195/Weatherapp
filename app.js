const { log } = require("console");
const express = require ("express");
const { STATUS_CODES } = require("http");
const https = require("https");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.urlencoded({extended: true}));

app.get("/",function(req,res){
    res.sendFile(__dirname + "/index.html");
    
})

app.post("/",function(req,res){
    const query = req.body.cityName;
    const apikey = "f1e59ac6c8482764dcf2a858a3c183c7";
    const units = "metric";
    const url ="https://api.openweathermap.org/data/2.5/weather?q="+query+"&appid="+apikey+"&units="+units;
    https.get(url,function(response){
        // console.log(response.statusCode);
        response.on("data",function(data){
            const weatherdata = JSON.parse(data)
            const temp = weatherdata.main.temp
            const feels_like = weatherdata.main.feels_like
            const weatherdescription = weatherdata.weather[0].description
            const icon = weatherdata.weather[0].icon
            const imageURL = "https://ssl.gstatic.com/onebox/weather/64/partly_cloudy.png"
            res.write("<h1>The weather is currently "+weatherdescription+" </h>");
            res.write("<h1>Temperature in "+req.body.cityName+" is "+temp+" degree celcius.And it feels like"+feels_like+" </h1>");
            res.write("<img src="+ imageURL+">");
            res.send;
        })
    })
})


app.listen(3000, function(){
    console.log("server is running on port 3000.");
})
