// Definir la interfaz Joke para representar una broma con su puntuación y fecha
interface Joke {
    broma: string;
    puntuacion: number;
    fecha: string;
}

// Array para almacenar las bromas reportadas
const reportAcudits: Joke[] = [];

// Obtener la fecha actual en formato ISO
const getCurrentDateISO = (): string => new Date().toISOString();

// Agregar una nueva broma al reporte
const addJokeToReport = (joke: string, score: number): void => {
    const currentDateISO = getCurrentDateISO();
    const newJoke: Joke = { broma: joke, puntuacion: score, fecha: currentDateISO };
    reportAcudits.push(newJoke);
    console.log(reportAcudits);
};

// Cargar una broma aleatoria desde una API y mostrarla en el documento HTML
const loadRandomJoke = (): void => {
    const apiUrl =
        Math.random() < 0.5
            ? 'https://icanhazdadjoke.com/'
            : 'https://api.chucknorris.io/jokes/random';

    fetch(apiUrl, { headers: { Accept: 'application/json' } })
        .then(response => response.json())
        .then(data => {
            const jokeOutput = document.getElementById('joke');
            if (jokeOutput) {
                jokeOutput.innerHTML = data.value || data.joke;

                // Agregar listeners a los botones de puntuación para reportar la broma
                document.querySelector('.btn-bueno')?.addEventListener('click', () =>
                    addJokeToReport(jokeOutput.innerHTML, 3)
                );
                document.querySelector('.btn-regular')?.addEventListener('click', () =>
                    addJokeToReport(jokeOutput.innerHTML, 2)
                );
                document.querySelector('.btn-malo')?.addEventListener('click', () =>
                    addJokeToReport(jokeOutput.innerHTML, 1)
                );
            }
        })
        .catch(error => console.error(error));
};

// Agregar listeners a los botones para cargar una nueva broma aleatoria
document.querySelector('.btn-anterior')?.addEventListener('click', loadRandomJoke);
document.querySelector('.btn-siguiente')?.addEventListener('click', loadRandomJoke);
document.querySelector('.btn-joker')?.addEventListener('click', loadRandomJoke);

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
