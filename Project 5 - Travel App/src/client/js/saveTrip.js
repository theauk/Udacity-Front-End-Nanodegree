function saveTrip() {

    const location = document.getElementById("location").innerHTML;
    const country = document.getElementById("country").innerHTML;
    const lenDif = document.getElementById("lengthNumber").innerHTML;
    const lenWord = document.getElementById("lengthDays").innerHTML;
    const countDif = document.getElementById("countDownNumber").innerHTML;
    const countWord = document.getElementById("countDownDays").innerHTML;
    const arrivalDate = document.getElementById("arrivalResult").innerHTML;
    const departureDate = document.getElementById("departureResult").innerHTML;
    const weather = document.getElementById("weatherDetails").innerHTML;
    const image = document.getElementById("resultImg").src;

    fetch("http://localhost:8081/save", {
        method: "POST",
        mode: "cors",
        headers: {
            "Content-type": "application/json"
        },
        body: JSON.stringify(
            {
                location: location,
                country: country,
                tripLength: { dateDifference: lenDif, dayWord: lenWord },
                countDown: { dateDifference: countDif, dayWord: countWord },
                arrivalDate: arrivalDate,
                departureDate: departureDate,
                tripWeather: weather,
                image: image
            }),
    })
        .then(res => {
            console.log("Response from save trip fetch", res);

            // Update my trips
            let tripTiles = document.getElementById("tripTiles");
            let trip = `<div class="trip" id="${location} + ${arrivalDate} + ${departureDate}">
                  <img class="tripImg" src=${image}>
                  <div class="savedDescription">
                    <h3 class="tripTitle" id="${location}">${location}</h3>
                    <h3 class="tripTitle" id="${country}">${country}</h3>
                  </div>
                  <p class="tripDates">${arrivalDate} to ${departureDate}</p>
                </div>`;

            tripTiles.insertAdjacentHTML("afterbegin", trip);

            // Add an event listener
            let newElement = document.getElementById(`${location} + ${arrivalDate} + ${departureDate}`)
            newElement.addEventListener("click", () => {
                console.log("Trip tile clicked", `${location} + ${arrivalDate} + ${departureDate}`)
                Client.clickSavedTrip(`${location} + ${arrivalDate} + ${departureDate}`);
            });

        })
        .catch(err => console.log(err))

    Client.newSearch();
}

export { saveTrip }