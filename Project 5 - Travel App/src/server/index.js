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
const getCoordinates = async (req) => {

    // Geonames credentials from .env
    const geoUserName = process.env.geoNamesUserName;
    const baseURL = "http://api.geonames.org/searchJSON?q=";
    const fetchURL = baseURL + req.body.destination + "&maxRows=10&username=" + geoUserName;
    console.log("Fetch URL:", fetchURL);

    const response = await fetch(fetchURL)

    try {
        const responseJSON = await response.json();
        const geonamesData = responseJSON.geonames[0];
        console.log(geonamesData);
        
    } catch (error) {
        console.log("error:", error)
    }
}

app.post('/submitForm', async (req, res) => {

    console.log("Running server Geo Names function with req:", req.body)

    await getCoordinates(req);

})