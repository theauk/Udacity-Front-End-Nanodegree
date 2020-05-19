function removeTrip() {

    // Get the trip details needed to delete
    const location = document.getElementById("location").innerHTML;
    const arrivalDate = document.getElementById("arrivalResult").innerHTML;
    const departureDate = document.getElementById("departureResult").innerHTML;
    const id = `${location} + ${arrivalDate} + ${departureDate}`;
    console.log("Delete:", id);

    fetch("http://localhost:8081/remove", {
        method: "POST",
        mode: "cors",
        headers: {
            "Content-type": "application/json"
        },
        body: JSON.stringify(
            { id: id }),
    })
        .then(res => {
            console.log("Response from delete trip fetch", res);

            // Update my trips
            let trip = document.getElementById(id);
            trip.parentNode.removeChild(trip);

        })
        .catch(err => console.log(err))

    Client.newSearch();
}

export { removeTrip }