"use strict";
var _a, _b, _c;
// Array para almacenar las bromas reportadas
const reportAcudits = [];
// Obtener la fecha actual en formato ISO
const getCurrentDateISO = () => new Date().toISOString();
// Agregar una nueva broma al reporte
const addJokeToReport = (joke, score) => {
    const currentDateISO = getCurrentDateISO();
    const newJoke = { broma: joke, puntuacion: score, fecha: currentDateISO };
    reportAcudits.push(newJoke);
    console.log(reportAcudits);
};
// Variables globales para los listeners de los botones de puntuación
let buenoListener;
let regularListener;
let maloListener;
// Cargar una broma aleatoria desde una API y mostrarla en el documento HTML
const loadRandomJoke = () => {
    const apiUrl = Math.random() < 0.5
        ? "https://icanhazdadjoke.com/"
        : "https://api.chucknorris.io/jokes/random";
    fetch(apiUrl, { headers: { Accept: "application/json" } })
        .then((response) => response.json())
        .then((data) => {
        var _a, _b, _c, _d, _e, _f;
        const jokeOutput = document.getElementById("joke");
        if (jokeOutput) {
            jokeOutput.innerHTML = data.value || data.joke;
            // Eliminar los listeners anteriores
            if (buenoListener) {
                (_a = document
                    .querySelector(".btn-bueno")) === null || _a === void 0 ? void 0 : _a.removeEventListener("click", buenoListener);
            }
            if (regularListener) {
                (_b = document
                    .querySelector(".btn-regular")) === null || _b === void 0 ? void 0 : _b.removeEventListener("click", regularListener);
            }
            if (maloListener) {
                (_c = document
                    .querySelector(".btn-malo")) === null || _c === void 0 ? void 0 : _c.removeEventListener("click", maloListener);
            }
            // Agregar nuevos listeners a los botones de puntuación
            buenoListener = () => addJokeToReport(jokeOutput.innerHTML, 3);
            regularListener = () => addJokeToReport(jokeOutput.innerHTML, 2);
            maloListener = () => addJokeToReport(jokeOutput.innerHTML, 1);
            (_d = document
                .querySelector(".btn-bueno")) === null || _d === void 0 ? void 0 : _d.addEventListener("click", buenoListener);
            (_e = document
                .querySelector(".btn-regular")) === null || _e === void 0 ? void 0 : _e.addEventListener("click", regularListener);
            (_f = document
                .querySelector(".btn-malo")) === null || _f === void 0 ? void 0 : _f.addEventListener("click", maloListener);
        }
    })
        .catch((error) => console.error(error));
};
// Agregar listeners a los botones para cargar una nueva broma aleatoria
(_a = document.querySelector('.btn-anterior')) === null || _a === void 0 ? void 0 : _a.addEventListener('click', loadRandomJoke);
(_b = document.querySelector('.btn-siguiente')) === null || _b === void 0 ? void 0 : _b.addEventListener('click', loadRandomJoke);
(_c = document.querySelector('.btn-joker')) === null || _c === void 0 ? void 0 : _c.addEventListener('click', loadRandomJoke);
// Obtener datos climáticos de una ciudad usando una API
const apiKey = '9a9672669b323406b1010a09130be9fe';
const city = 'barcelona';
const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
// Obtener y mostrar información climática en el documento HTML
fetch(url)
    .then(response => response.json())
    .then(data => {
    console.log(data);
    const weatherDiv = document.getElementById('weather');
    if (weatherDiv) {
        const weatherDescription = data.weather[0].description;
        const temperature = data.main.temp;
        // Crear el HTML para mostrar la descripción del clima y temperatura
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
// Obtener y mostrar información climática en el documento HTML usando otra API
fetch(url)
    .then(response => response
    .json())
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
    console.log('Error fetching weather data:', error);
});
