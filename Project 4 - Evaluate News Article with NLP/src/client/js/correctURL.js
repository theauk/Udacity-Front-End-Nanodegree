function correctURL(url) {
    console.log('Running correctURL');
    
    // Regex source: https://regexr.com/39nr7
    const regex = /[(http(s)?):\/\/(www\.)?a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/

    if (regex.test(url)) {
        return true
    } else {
        return false
    }
}

export { correctURL }
