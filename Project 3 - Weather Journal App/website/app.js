/* Global Variables */
const apiKey = '7b08b66db08e5e3614f8e466817a979a';
const baseURL = 'http://api.openweathermap.org/data/2.5/weather?zip=';

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth() + '.' + d.getDate() + '.' + d.getFullYear();

// Event listeners
document.getElementById('generate').addEventListener('click', performAction);

// Callback function
function performAction(e) {
    const zip = document.getElementById('zip').value;
    const feelings = document.getElementById('feelings').value;

    // Get the weather data based on the user entry
    getData(baseURL + zip + "&appid=" + apiKey).then(function (weather) {

        // Format the data as JSON
        let data = {
            'temperature': weather.main.temp,
            'date': newDate,
            'userResponse': feelings
        };
        // Post the data to the server
        return postData('/post', data);

    }).then(function (weatherData) {
        // Get the weather data from the server
        return getData('/get');

    }).then(function (responseData) {
        // Update the UI
        updateUI(responseData);
        
    }).catch((err) => {
        // Ask for new input if necessary
        errorFunction();
    })
}

// Get
const getData = async (url = '') => {
    const res = await fetch(url)
    try {
        const data = await res.json();
        console.log(data)
        return data;
    } catch (error) {
        console.log("error", error);
    }
}

// Post
const postData = async (url = '', data = {}) => {

    const response = await fetch(url, {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });

    try {
        const newData = await response.json();
        return newData;
    } catch (error) {
        console.log("error", error);
    }
};

// Update the UI
const updateUI = async (data) => {

    // Convert the temperature from Kelvin to C and F
    const cTemp = (data.temperature - 273.15).toFixed(1);
    const fTemp = (((data.temperature - 273.15) * (9 / 5)) + 32).toFixed(1);

    // Display the data to the user
    date.innerHTML = data.date;
    temp.innerHTML = cTemp + ' °C / ' + fTemp + ' °F';
    content.innerHTML = data.userResponse;
}

// Error function
const errorFunction = async () => {
    zip.value = '';
    zip.placeholder = 'Please enter a valid US zip code';
}