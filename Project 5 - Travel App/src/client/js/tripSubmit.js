function tripSubmit(event) {
    event.preventDefault()

    const location = document.getElementById("where").value;
    const arrival = document.getElementById("arrivalDate").value;
    const departure = document.getElementById("departureDate").value;

    // Validate input
    const validateInput = Client.validateInput(location, arrival, departure);

    if (validateInput) {

        fetch("http://localhost:8081/submitForm", {
            method: "POST",
            mode: "cors",
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify(
                {
                    destination: location,
                    arrivalDate: arrival,
                    departureDate: departure
                }),
        })
            .then(res => res.json())

            .then(data => {
                
                console.log("Response from fetch", data);

                // Check for valid destination
                if (data.error == "invalid destination") {
                    alert("Please enter a valid destination")
                } else {
                    Client.updateUI(data);
                }
            })
            .catch(err => alert(err))

    } else {
        console.log("See input error message above")
    }
}

export { tripSubmit }