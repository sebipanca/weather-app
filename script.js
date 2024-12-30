const apiKey = 'c677ab5314cd1d8a0df26054b1749d5c'; // Replace with your OpenWeather API key
const searchBtn = document.getElementById('searchBtn');
const weatherInfo = document.getElementById('weatherInfo');
const outfitSuggestion = document.getElementById('outfitSuggestion');

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
      suggestOutfit(data);
    } else {
      weatherInfo.innerHTML = `<p>${data.message}</p>`;
      outfitSuggestion.innerHTML = '';
    }
  } catch (error) {
    weatherInfo.innerHTML = `<p>Error fetching weather data.</p>`;
    outfitSuggestion.innerHTML = '';
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

function suggestOutfit(data) {
  const { main, weather } = data;
  let suggestion = '';

  if (main.temp > 25) {
    suggestion = 'It’s hot outside! Wear a t-shirt, shorts, and sunglasses.';
  } else if (main.temp > 15) {
    suggestion = 'Mild weather. A light jacket and jeans should work.';
  } else if (main.temp > 5) {
    suggestion = 'It’s chilly! Wear a warm jacket and boots.';
  } else {
    suggestion = 'It’s freezing! Bundle up with a heavy coat, gloves, and a hat.';
  }

  if (weather[0].main.toLowerCase().includes('rain')) {
    suggestion += ' Don’t forget an umbrella or a raincoat!';
  } else if (weather[0].main.toLowerCase().includes('snow')) {
    suggestion += ' Make sure to wear snow boots and a scarf.';
  }

  outfitSuggestion.innerHTML = `<p>${suggestion}</p>`;
}
