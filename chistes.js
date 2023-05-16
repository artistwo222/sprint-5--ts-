"use strict";
var _a, _b, _c;
const reportAcudits = [];
const getCurrentDateISO = () => new Date().toISOString();
const addJokeToReport = (joke, score) => {
    const currentDateISO = getCurrentDateISO();
    const newJoke = { broma: joke, puntuacion: score, fecha: currentDateISO };
    reportAcudits.push(newJoke);
    console.log(reportAcudits);
};
const loadRandomJoke = () => {
    const apiUrl = Math.random() < 0.5 ? 'https://icanhazdadjoke.com/' : 'https://api.chucknorris.io/jokes/random';
    fetch(apiUrl, { headers: { Accept: 'application/json' } })
        .then(response => response.json())
        .then(data => {
        var _a, _b, _c;
        const jokeOutput = document.getElementById('joke');
        if (jokeOutput) {
            jokeOutput.innerHTML = data.value || data.joke;
            (_a = document.querySelector('.btn-bueno')) === null || _a === void 0 ? void 0 : _a.addEventListener('click', () => addJokeToReport(jokeOutput.innerHTML, 3));
            (_b = document.querySelector('.btn-regular')) === null || _b === void 0 ? void 0 : _b.addEventListener('click', () => addJokeToReport(jokeOutput.innerHTML, 2));
            (_c = document.querySelector('.btn-malo')) === null || _c === void 0 ? void 0 : _c.addEventListener('click', () => addJokeToReport(jokeOutput.innerHTML, 1));
        }
    })
        .catch(error => console.error(error));
};
(_a = document.querySelector('.btn-anterior')) === null || _a === void 0 ? void 0 : _a.addEventListener('click', loadRandomJoke);
(_b = document.querySelector('.btn-siguiente')) === null || _b === void 0 ? void 0 : _b.addEventListener('click', loadRandomJoke);
(_c = document.querySelector('.btn-joker')) === null || _c === void 0 ? void 0 : _c.addEventListener('click', loadRandomJoke);
const apiKey = '9a9672669b323406b1010a09130be9fe';
const city = 'barcelona';
const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
fetch(url)
    .then(response => response.json())
    .then(data => {
    console.log(data);
    const weatherDiv = document.getElementById('weather');
    if (weatherDiv) {
        const weatherDescription = data.weather[0].description;
        const temperature = data.main.temp;
        const weatherHTML = `
        <p>${weatherDescription}</p>
        <p>${temperature} °C</p>
      `;
        weatherDiv.innerHTML = weatherHTML;
    }
})
    .catch(error => {
    console.error('Error fetching weather data:', error);
});
fetch(url)
    .then(response => response.json())
    .then(data => {
    const weather = document.querySelector("#weather");
    if (weather) {
        weather.innerHTML = `
        <p>Temperature: ${data.main.temp} &#8451;</p>
        <p>Description: ${data.weather[0].description}</p>
        <img src="http://openweathermap.org/img/wn/${data.weather[0].icon}.png" alt="Weather Icon">
      `;
    }
})
    .catch(error => {
    console.log("Error fetching weather data:", error);
});
