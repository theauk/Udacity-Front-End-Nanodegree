function newSearch() {

    // Reset input fields
    document.getElementById("where").value = "";
    document.getElementById("arrivalDate").value = "";
    document.getElementById("departureDate").value = "";

    // Show the search section
    document.getElementById("addTrip").style.display = "block";
    document.getElementById("result").style.display = "none";
}

export { newSearch }