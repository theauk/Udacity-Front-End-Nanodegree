const updateUI = (data) => {

    // Change the view to show the result page instead
    document.getElementById("addTrip").style.display = "none";
    document.getElementById("myTrips").style.display = "none";
    document.getElementById("result").style.display = "block";

    // Show result information
    document.getElementById("resultImg").src = data.image;
    document.getElementById("location").innerHTML = data.location;
    document.getElementById("country").innerHTML = data.country;
    document.getElementById("lengthNumber").innerHTML = data.tripLength.dateDifference;
    document.getElementById("lengthDays").innerHTML = data.tripLength.dayWord;
    document.getElementById("countDownNumber").innerHTML = data.countDown.dateDifference;
    document.getElementById("countDownDays").innerHTML = data.countDown.dayWord;
    document.getElementById("arrivalResult").innerHTML = data.arrivalDate;
    document.getElementById("departureResult").innerHTML = data.departureDate;
    document.getElementById("weatherDetails").innerHTML = data.tripWeather;
}

export { updateUI }