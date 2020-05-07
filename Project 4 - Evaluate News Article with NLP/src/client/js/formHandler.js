function handleSubmit(event) {
    event.preventDefault()

    // Check for correct URL
    let formText = document.getElementById('url').value
    let url = client.correctURL(formText)

    if (url) {
        console.log('Submitted URL:', url);

        fetch('/sentiment', {
            method: 'POST',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({text: url})
        })
        .then(res => res.json())
        .then(data => {
            document.getElementById('polarity').innerHTML = data.polarity;
            // ETC.
        });
    }
}

export { handleSubmit }
