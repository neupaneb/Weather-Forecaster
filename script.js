document.getElementById('weather-form').addEventListener('submit', function(e) {
    e.preventDefault();
    const city = document.getElementById('city').value.trim();
    if (city) {
        getWeather(city);
    } else {
        alert('Please enter a city name.');
    }
});

function getWeather(city) {
    const apiKey = '8347054924807bcb93d02c3cd4c4a61a'; // Your API key
    const encodedCity = encodeURIComponent(city);
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodedCity}&appid=${apiKey}&units=metric`;

    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            if (data.cod === 200) {
                document.getElementById('weather-result').style.display = 'block';
                document.getElementById('city-name').textContent = data.name;
                document.getElementById('temperature').textContent = `Temperature: ${data.main.temp}°C`;
                document.getElementById('description').textContent = `Description: ${data.weather[0].description}`;
                document.getElementById('humidity').textContent = `Humidity: ${data.main.humidity}%`;
                document.getElementById('wind-speed').textContent = `Wind Speed: ${data.wind.speed} m/s`;
            } else {
                alert('City not found. Please try again.');
            }
        })
        .catch(error => {
            alert('An error occurred: ' + error.message);
            console.error('Fetch error:', error);
        });
}
