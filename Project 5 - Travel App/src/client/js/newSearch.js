function newSearch() {

    // Reset input fields
    document.getElementById("where").value = "";
    document.getElementById("arrivalDate").value = "";
    document.getElementById("departureDate").value = "";

    // Show the search section
    document.getElementById("result").style.display = "none";
    document.getElementById("addTrip").style.display = "block";
    document.getElementById("myTrips").style.display = "block";

    // Show save button again
    document.getElementById("save").style.display = "";

    // Hide delete button again
    document.getElementById("remove").style.display = "none";

}

export { newSearch }