function clickSavedTrip(id) {

    const element = document.getElementById(id);
    console.log(id)

    fetch("http://localhost:8081/savedTrip", {
        method: "POST",
        mode: "cors",
        headers: {
            "Content-type": "application/json"
        },
        body: JSON.stringify(
            { trip: id }),
    })
        .then(res => res.json())

        .then(data => {
            console.log("Response from click saved trip", data);

            // Hide the save button
            document.getElementById("save").style.display = "none";

            // Update the UI
            Client.updateUI(data);

        })
        .catch(err => console.log(err))
}

export { clickSavedTrip }