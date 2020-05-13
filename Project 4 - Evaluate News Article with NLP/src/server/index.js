const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
var path = require('path');
var aylien = require("aylien_textapi");

const app = express()
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

// 'src/client'
//app.use(express.static('dist'));
app.use(express.static('src/client'));

// Load .env file
const dotenv = require('dotenv');
dotenv.config();

// Aylien credentials
var textapi = new aylien({
    application_id: process.env.API_ID,
    application_key: process.env.API_KEY
});

// Port
const port = 8081;
app.listen(port, function () {
    console.log(`Listening on port: ${port}`);
})

app.get('/', function (req, res) {
    res.sendFile('dist/index.html')
})

app.post('/sentiment', async (req, res) => {

    console.log("Running server post function")

    try {
        var analysisData = textapi.sentiment({
            'url': req.body.url
        }, function (error, response) {
            if (error === null) {
                console.log("Response from API: ", response);
                res.send(response);
            }
        });

    } catch (error) {

        console.log("Error in server post function")
    }
})