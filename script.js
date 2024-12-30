const apiKey = 'c677ab5314cd1d8a0df26054b1749d5c'; // Replace with your OpenWeather API key
const searchBtn = document.getElementById('searchBtn');
const weatherInfo = document.getElementById('weatherInfo');

searchBtn.addEventListener('click', () => {
  const city = document.getElementById('city').value;
  if (city) {
    fetchWeather(city);
  } else {
    alert('Please enter a city name!');
  }
});

async function fetchWeather(city) {
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;
  try {
    const response = await fetch(url);
    const data = await response.json();
    if (data.cod === 200) {
      displayWeather(data);
    } else {
      weatherInfo.innerHTML = `<p>${data.message}</p>`;
    }
  } catch (error) {
    weatherInfo.innerHTML = `<p>Error fetching weather data.</p>`;
  }
}

function displayWeather(data) {
  const { name, main, weather } = data;
  const weatherHTML = `
    <h2>${name}</h2>
    <p>Temperature: ${main.temp}°C</p>
    <p>Condition: ${weather[0].description}</p>
    <img src="https://openweathermap.org/img/wn/${weather[0].icon}.png" alt="${weather[0].description}">
  `;
  weatherInfo.innerHTML = weatherHTML;
}
