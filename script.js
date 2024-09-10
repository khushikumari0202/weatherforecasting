// script.js
document.getElementById('weather-form').addEventListener('submit', function(e) {
    e.preventDefault();
    const city = document.getElementById('city-input').value;
    getWeather(city);
  });
  
  async function getWeather(city) {
    const apiKey = '0d46cbe5f2646ff71379e0e103fbe0bf';  // OpenWeatherMap API key
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;
  
    try {
      const response = await fetch(url);
      const data = await response.json();
      displayWeather(data);
    } catch (error) {
      console.error('Error fetching weather data:', error);
    }
  }
  
  function displayWeather(data) {
    const weatherResult = document.getElementById('weather-result');
    if (data.cod === '404') {
      weatherResult.innerHTML = `<p>City not found. Please try again.</p>`;
      return;
    }
  
    const temperature = (data.main.temp - 273.15).toFixed(2);  // Convert from Kelvin to Celsius
    const weatherInfo = `
      <h2>${data.name}</h2>
      <p>Temperature: ${temperature} °C</p>
      <p>Humidity: ${data.main.humidity} %</p>
      <p>Wind Speed: ${data.wind.speed} m/s</p>
    `;
    weatherResult.innerHTML = weatherInfo;
  }
  