function updateUI(data) {
    const searchView = document.getElementById("addTrip");
    const resultView = document.getElementById("result");

    // Change the view to show the result page instead
    searchView.style.display = "none";
    resultView.style.display = "block";

    // Show result information
    document.getElementById("resultImg").src = data.image;
    document.getElementById("locationName").innerHTML = `${data.destination}, ${data.country}`;
    document.getElementById("length").innerHTML = `Trip Length: ${data.tripLength.dateDifference} ${data.tripLength.dayWord}`;
    document.getElementById("countDown").innerHTML = `${data.countDown.dateDifference} ${data.countDown.dayWord} away`;
    document.getElementById("arrivalResult").innerHTML = data.arrivalDate;
    document.getElementById("departureResult").innerHTML = data.departureDate;
    document.getElementById("weatherDetails").innerHTML = `High: ${data.tripWeather.maxTemp}°C <br> Low: ${data.tripWeather.minTemp}°C`;
}

export { updateUI }