const textElement = document.getElementById('text');

function getRandomBookText() {
    const randomWorkId = Math.floor(Math.random() * 10000000);
    fetch(`https://openlibrary.org/works/OL${randomWorkId}W.json`)
        .then(response => response.json())
        .then(data => {
            if (data.description) {
                let text = typeof data.description === 'object' ? data.description.value : data.description;
                text = text.split(' ').slice(0, 50).join(' ') + '...';
                textElement.textContent = text;
                startFlipping();
            } else {
                getRandomBookText();
            }
        })
        .catch(error => {
            console.error('Error:', error);
            getRandomBookText();
        });
}

function startFlipping() {
    setInterval(() => {
        textElement.classList.toggle('upside-down');
    }, 3000);
}

getRandomBookText();