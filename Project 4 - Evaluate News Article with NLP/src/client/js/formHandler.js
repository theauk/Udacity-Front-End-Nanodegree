function handleSubmit(event) {
    event.preventDefault()

    // Check for correct URL
    let userURL = document.getElementById('url').value
    let isValidURL = Client.correctURL(userURL)

    if (isValidURL) {
        console.log('Submitted URL:', userURL);

        fetch('http://localhost:8081/sentiment', {
            method: 'POST',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ url: userURL })
        })
            .then(res => res.json())

            .then(function (data) {
                document.getElementById('polarity').innerText = data.polarity;
                document.getElementById('subjtectivity').innerText = data.subjectivity;
                document.getElementById('submittedURL').innerHTML = data.text;
                document.getElementById('polarityConfidence').innerHTML = data.polarity_confidence;
                document.getElementById('subjectivityConfidence').innerHTML = data.subjectivity_confidence;
            });

    } else {
        console.log('Invalid URL');
        alert('Please enter a valid URL')
    }

    // Clear the input field.
    const theForm = document.getElementById("url");
    theForm.value = '';
}

export { handleSubmit }
