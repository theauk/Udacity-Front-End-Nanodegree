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

            .then(data => {
                document.getElementById('submittedURL').innerHTML = data.text;
                document.getElementById('polarity').innerHTML = data.polarity.charAt(0).toUpperCase() + data.polarity.slice(1);
                document.getElementById('polarityConfidence').innerHTML = (data.polarity_confidence * 100).toFixed(2) + "%";
                document.getElementById('subjectivity').innerHTML = data.subjectivity.charAt(0).toUpperCase() + data.subjectivity.slice(1);
                document.getElementById('subjectivityConfidence').innerHTML = (data.subjectivity_confidence * 100).toFixed(2) + "%";
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
