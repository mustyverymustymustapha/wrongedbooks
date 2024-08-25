const textElement = document.getElementById('text');

function getRandomBookText() {
    const randomWorkId = Math.floor(Math.random() * 10000000);
    fetch(`https://openlibrary.org/works/OL${randomWorkId}W.json`)
        .then(response => response.json())
        .then(data => {
            if (data.description) {
                let text = typeof data.description === 'object' ? data.description.value : data.description;