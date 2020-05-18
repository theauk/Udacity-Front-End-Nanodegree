function updateUI(data) {

    // Change the view to show the result page instead
    document.getElementById("addTrip").style.display = "none";
    document.getElementById("myTrips").style.display = "none";
    document.getElementById("result").style.display = "block";

    // Show result information
    document.getElementById("resultImg").src = data.image;
    document.getElementById("location").innerHTML = `${data.location}`;
    document.getElementById("country").innerHTML = `${data.country}`;
    document.getElementById("length").innerHTML = `Trip Length: ${data.tripLength.dateDifference} ${data.tripLength.dayWord}`;
    document.getElementById("countDown").innerHTML = `${data.countDown.dateDifference} ${data.countDown.dayWord} away`;
    document.getElementById("arrivalResult").innerHTML = data.arrivalDate;
    document.getElementById("departureResult").innerHTML = data.departureDate;
    document.getElementById("weatherDetails").innerHTML = `High: ${data.tripWeather.maxTemp}°C / ${data.tripWeather.maxTempF} °F <br> Low: ${data.tripWeather.minTemp}°C / ${data.tripWeather.minTempF} °F`;
}

export { updateUI }