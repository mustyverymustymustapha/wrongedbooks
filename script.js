const textElement = document.getElementById('text');
const speedSlider = document.getElementById('speed');
const speedValue = document.getElementById('speed-value');
let flipInterval;

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
    if (flipInterval) {
        clearInterval(flipInterval);
    }
    flipInterval = setInterval(() => {
        textElement.classList.toggle('upside-down');
    }, speedSlider.value * 1000);
}

speedSlider.addEventListener('input', function() {
    speedValue.textContent = this.value;
    startFlipping();
});

getRandomBookText();