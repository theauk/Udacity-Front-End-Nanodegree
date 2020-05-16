function tripSubmit(event) {
    event.preventDefault()

    const location = document.getElementById("where").value;
    const arrival = document.getElementById("arrivalDate").value;
    const departure = document.getElementById("departureDate").value;

    if (location != "" && arrival != "" && departure != "") {

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
                alert("End of client fetch", data)
            })
            .catch(err => alert(err))

    } else {
        // Error messages
        if (location == "") {
            alert("Please enter a location")
            console.log("Empty location")
        } else if (arrival == "") {
            alert("Please enter an arrival date")
            console.log("Empty arrival date")
        } else if (departure == "") {
            alert("Please enter a departure date")
            console.log("Empty departure date")
        }
    }
}

export { tripSubmit }