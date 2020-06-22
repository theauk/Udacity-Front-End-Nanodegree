function eventListening() {

    // Listen for the submit button
    const submitButton = document.getElementById("submitButton");
    submitButton.addEventListener("click", () => {
        console.log("Submit button clicked")
        Client.tripSubmit(event);
    });

    // Listen for the search button
    const newSearchButton = document.getElementById("newSearchButton");
    newSearchButton.addEventListener("click", () => {
        console.log("New search button clicked")
        Client.newSearch();
    });

    // Listen for the save button
    const saveButton = document.getElementById("save");
    saveButton.addEventListener("click", () => {
        Client.saveTrip(event);
    });

    // Listen for the remove button
    const removeButton = document.getElementById("remove");
    removeButton.addEventListener("click", () => {
        Client.removeTrip(event);
    });
}

eventListening();

export { eventListening }