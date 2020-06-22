const validateInput = (location, arrival, departure) => {

    // Find the difference between the two days
    const oneDay = 1000 * 60 * 60 * 24;
    const arrivalDate = new Date (arrival);
    const departureDate = new Date (departure);
    const dateDifference = Math.round((departureDate.getTime() - arrivalDate.getTime()) / oneDay);

    // Check for empty fields
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

        // Check if the arrival date is before the destination date
    } else if (dateDifference < 0) {
        alert("Please enter a departure date that follows the arrival date")
        return false

    } else {
        return true
    }
}

export { validateInput }