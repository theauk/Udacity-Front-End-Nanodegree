const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
var path = require('path');

const app = express()
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

// 'src/client'
app.use(express.static('dist'))

// Load .env file
const dotenv = require('dotenv');
dotenv.config();

// Port
const port = 8081;
app.listen(port, function () {
    console.log(`Listening on port: ${port}`);
})