const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
var path = require('path');
const fetch = require("node-fetch");

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

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

// For testing the server
app.get('/test', function (req, res) {
    res.send({'message':'Working'})
});

// Function to find the number of days between two specific days
const datedif = (day1, day2) => {

    // Find the difference in days
    const oneDay = 1000 * 60 * 60 * 24;
    const dateDifference = Math.round((day2.getTime() - day1.getTime()) / oneDay);

    // Check the days
    let dayWord = "days"
    if (dateDifference == 1) {
        dayWord = "day";
    }

    return { dateDifference: dateDifference, dayWord: dayWord }

}

// Function to convert C to F
const convertTemp = (tempC) => {
    let tempF = tempC * 9 / 5 + 32;
    return tempF
}

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
            return {
                lng: geonamesData.lng,
                lat: geonamesData.lat,
                country: geonamesData.countryName
            }
        }

    } catch (error) {
        console.log("error:", error)
    }
}

// Async function to get weather deatils
const getWeather = async (data, coordinates) => {

    const arrival = new Date(data.arrivalDate);
    const today = new Date();
    const dateDif = datedif(today, arrival).dateDifference;
    console.log("Difference between today and arrival:", dateDif);

    const baseUrl = "http://api.weatherbit.io/v2.0/";
    const key = process.env.weatherbitKey;

    // Get forecast if arrival date is less than 17 days away 
    if (dateDif < 17 && dateDif >= 0) {
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
                        minTemp: weatherArray.min_temp,
                        maxTempF: convertTemp(weatherArray.max_temp),
                        minTempF: convertTemp(weatherArray.min_temp)
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

        // Find the day after
        const oneDay = 1000 * 60 * 60 * 24;
        const endDateTime = Math.round((startDate.getTime() + oneDay));
        const endDate = new Date(endDateTime)

        // Turn them into strings for the API
        const startDateString = `${startDate.getFullYear()}-${startDate.getMonth() + 1}-${startDate.getDate()}`;
        const endDateString = `${endDate.getFullYear()}-${endDate.getMonth() + 1}-${endDate.getDate()}`;
        console.log("Historical dates (string):", startDateString, endDateString);

        const fetchURL = `${baseUrl}history/daily?lat=${coordinates.lat}&lon=${coordinates.lng}&start_date=${startDateString}&end_date=${endDateString}&key=${key}`;
        console.log("Fetch weather URL (historical):", fetchURL)

        const response = await fetch(fetchURL);

        try {
            const responseJSON = await response.json();
            const weatherArray = responseJSON.data;
            const weatherJSON = {
                maxTemp: weatherArray[0].max_temp,
                minTemp: weatherArray[0].min_temp,
                maxTempF: convertTemp(weatherArray[0].max_temp),
                minTempF: convertTemp(weatherArray[0].min_temp)
            }

            console.log("Weatherbit response temp (historical):", weatherJSON);
            return weatherJSON;

        } catch (error) {
            console.log("error:", error)
        }
    };

};

// Async function to get pixabay image
const pixabay = async (city, country) => {

    const key = process.env.pixabayKey;
    const baseURL = "https://pixabay.com/api/";
    const imageType = "&image_type=photo";
    const orientation = "&orientation=horizontal";
    const qcity = `&q=${encodeURIComponent(city)}`
    const qcountry = `&q=${encodeURIComponent(country)}`
    const fetchURL = `${baseURL}?key=${key}${qcity}${imageType}${orientation}`;
    console.log("Pixabay fetch url (city+country):", fetchURL)

    const response = await fetch(fetchURL)

    try {
        const data = await response.json();

        // If there are no images from the city, we fetch only for the country
        if (data.totalHits == 0) {
            const newFetchURL = `${baseURL}?key=${key}${qcountry}${imageType}${orientation}`;
            console.log("Instead -> pixabay fetch url (country):", newFetchURL)
            const responseCountry = await fetch(newFetchURL)

            try {
                const newData = await responseCountry.json();
                console.log("Response from pixabay:", newData.hits[0].webformatURL)
                return newData.hits[0].webformatURL;

            } catch (error) {
                console.log("error", error)
            }

        } else {
            console.log("Response from pixabay:", data.hits[0].webformatURL)
            return data.hits[0].webformatURL;
        }
    } catch (error) {
        console.log("error:", error)
    }
}

app.post('/submitForm', async (req, res) => {

    const response = req.body
    console.log("Running submit form server function with req. body:", response)
    coordinates = await getCoordinates(response.destination);

    // Invalid destination
    if (coordinates == "invalid destination") {
        console.log("invalid destination")
        res.send({ error: "invalid destination" })

        // Valid destination
    } else {

        console.log("Coordinates and country:", coordinates)

        // Get the weather from the coordinates
        const weather = await getWeather(response, coordinates);

        // Get the countdown
        const countD = datedif(new Date(), new Date(response.arrivalDate));
        countD.dateDifference += 1;

        // Get the trip length (add one to account for the day itself)
        let tripLen = datedif(new Date(response.arrivalDate), new Date(response.departureDate));
        tripLen.dateDifference += 1;

        // Get image
        const image = await pixabay(response.destination, coordinates.country)

        const data = {
            // Upper-case first letter
            destination: response.destination.charAt(0).toUpperCase() + response.destination.slice(1),
            country: coordinates.country,
            arrivalDate: response.arrivalDate,
            departureDate: response.departureDate,
            tripLength: tripLen,
            countDown: countD,
            tripWeather: weather,
            image: image
        }

        console.log("Data from submit form server function", data)
        res.send(data)
    }

});

module.exports = app;