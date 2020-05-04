// Setup empty JS object to act as endpoint for all routes
projectData = {};

// Require Express to run server and routes
const express = require('express');

// Start up an instance of app
const app = express();

/* Middleware*/
// Configuring express to use body-parser as middle-ware.
const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require('cors');
app.use(cors());

// Initialize the main project folder
app.use(express.static('website'));


// Setup Server
const port = 8000;
const server = app.listen(port, listening);

function listening() {
    console.log(`running on localhost: ${port}`);
};

// Get request
app.get('/get', (request, response) => {
    console.log('Server is sending: ' + projectData);
    response.send(projectData);
});

// Post request
app.post('/post', (request, response) => {
    projectData['temperature'] = request.body.temperature;
    projectData['date'] = request.body.date;
    projectData['userResponse'] = request.body.userResponse;
    console.log('Posted to server: ' + projectData);
    response.send(projectData);
})