function validateInput(location, arrival, departure) {

    if (location == "") {
        alert("Please enter a location")
        console.log("Empty location")
        return false

    } else if (arrival == "") {
        alert("Please enter an arrival date")
        console.log("Empty arrival date")
        return false

    } else if (departure == "") {
        alert("Please enter a departure date")
        console.log("Empty departure date")
        return false

    } else {
        return true
    }
}

export { validateInput }