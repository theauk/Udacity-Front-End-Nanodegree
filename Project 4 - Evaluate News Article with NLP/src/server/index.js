const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
var AYLIENTextAPI = require('aylien_textapi');

const app = express()
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(express.static('dist'));

// Load .env file
const dotenv = require('dotenv');
dotenv.config();

// Aylien credentials
var textapi = new aylien({
    application_id: process.env.API_ID,
    application_key: process.env.API_KEY
});

// Port
const port = 8080;
app.listen(port, function () {
    console.log(`Listening on port: ${port}`);
})

app.get('/', function (req, res) {
    res.sendFile('dist/index.html');
})

// Get the sentiment analysis
app.get('/sentiment', getAnalysis);

function getAnalysis(req, res) {
    
    const url = req.body.url;
}