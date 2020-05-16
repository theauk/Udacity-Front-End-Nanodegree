const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
var path = require('path');
const fetch = require("node-fetch");

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

// 'src/client'
app.use(express.static('dist'));

// Load .env file
const dotenv = require('dotenv');
dotenv.config();

// Port
const port = 8081;
app.listen(port, function () {
    console.log(`Listening on port: ${port}`);
});

app.get('/', function (req, res) {
    res.sendFile('dist/index.html')
});

// Async fetch function that makes a GET request to the Geonames API
const getCoordinates = async (destination) => {

    // Geonames credentials from .env
    const geoUserName = process.env.geoNamesUserName;
    const baseURL = "http://api.geonames.org/searchJSON?q=";
    // encodeURIComponent to support e.g. special characters
    const fetchURL = `${baseURL}${encodeURIComponent(destination)}&maxRows=10&username=${geoUserName}`;
    console.log("Fetch URL:", fetchURL);

    const response = await fetch(fetchURL)

    try {
        const responseJSON = await response.json();
        const geonamesData = responseJSON.geonames[0];
        console.log("Geonames response:", geonamesData);

        // Check for valid destination
        if (geonamesData == undefined) {
            return "invalid destination"
        } else {
            return { lng: geonamesData.lng, lat: geonamesData.lat }
        }

    } catch (error) {
        console.log("error:", error)
    }
}

// Async function to get weather deatils
const getWeather = async (data, coordinates) => {
    const arrival = new Date(data.arrivalDate);
    const today = new Date();

    // Find the difference in days
    const oneDay = 1000 * 60 * 60 * 24;
    const dateDifference = Math.round((arrival.getTime() - today.getTime()) / oneDay);

    const baseUrl = "http://api.weatherbit.io/v2.0/";
    const key = process.env.weatherbitKey;

    // Get forecast if arrival date is less than 17 days away 
    if (dateDifference < 17) {
        const fetchURL = `${baseUrl}forecast/daily?lat=${coordinates.lat}&lon=${coordinates.lng}&key=${key}`;
        console.log("Fetch weather URL (forecast):", fetchURL)

        const response = await fetch(fetchURL);

        try {
            const responseJSON = await response.json();

            // Search for the arrival date data
            for (let i = 0; i < responseJSON.data.length; i++) {
                if (responseJSON.data[i].valid_date == data.arrivalDate) {
                    const weatherArray = responseJSON.data[i];
                    const weatherJSON = {
                        maxTemp: weatherArray.max_temp,
                        minTemp: weatherArray.min_temp
                    }

                    console.log("Weatherbit response temp (forecast):", weatherJSON);
                    return weatherJSON;
                }
            }

            console.log("Error with dates");

        } catch (error) {
            console.log("error:", error)
        }

        // Get historical weather if arrival date is more than 17 days away 
    } else {

        // Find same dates last year
        const year = 1000 * 60 * 60 * 24 * 365;
        const yearTime = Math.round((arrival.getTime() - year));
        const startDate = new Date(yearTime)

        const endDateTime = Math.round((startDate.getTime() + oneDay));
        const endDate = new Date(endDateTime)

        console.log("Historical dates non-string", startDate, endDate)
        const startDateString = `${startDate.getFullYear()}-${startDate.getMonth() + 1}-${startDate.getDate()}`;
        const endDateString = `${endDate.getFullYear()}-${endDate.getMonth() + 1}-${endDate.getDate()}`;
        console.log("Historical dates string:", startDateString, endDateString);

        const fetchURL = `${baseUrl}history/daily?lat=${coordinates.lat}&lon=${coordinates.lng}&start_date=${startDateString}&end_date=${endDateString}&key=${key}`;
        console.log("Fetch weather URL (historical):", fetchURL)

        const response = await fetch(fetchURL);

        try {
            const responseJSON = await response.json();
            const weatherArray = responseJSON.data;
            const weatherJSON = {
                maxTemp: weatherArray[0].max_temp,
                minTemp: weatherArray[0].min_temp
            }

            console.log("Weatherbit response temp (historical):", weatherJSON);
            return weatherJSON;

        } catch (error) {
            console.log("error:", error)
        }
    };

};

// Countdown function
/*const countDown = (data) => {

    

}*/

app.post('/submitForm', async (req, res) => {

    const response = req.body
    console.log("Running server Geonames function with req. body:", response)
    coordinates = await getCoordinates(response.destination);

    // Invalid destination
    if (coordinates == "invalid destination") {
        console.log("invalid destination")
        res.send({ error: "invalid destination" })

        // Valid destination
    } else {
        console.log("Coordinates:", coordinates)

        // Get the weather from the coordinates
        const weather = await getWeather(response, coordinates);

        res.send(coordinates)
    }

})