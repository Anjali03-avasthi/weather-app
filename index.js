const apiKey = "b7ef6a80186befd99bc79fb214d43b06"; // Your API key
const apiURL = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

const searchBox = document.querySelector(".search-bar input");
const searchBtn = document.querySelector(".search-bar button");
const weatherIcon = document.querySelector(".weather-icon");
const weatherCard = document.querySelector(".weather-card");

async function currentWeather(city) {
    const response = await fetch(apiURL + city + `&appid=${apiKey}`);

    if (response.status == 404) {
        document.querySelector(".error").style.display = "block";
        document.querySelector(".weather-info").style.display = "none";
    } else {
        const data = await response.json();

        document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "°c";
        document.querySelector(".city").innerHTML = data.name;
        document.querySelector(".main").innerHTML = data.weather[0].main;
        document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
        document.querySelector(".wind").innerHTML = data.wind.speed + " km/h";

        const weatherCondition = data.weather[0].main;

        // --- UPDATED & IMPROVED SWITCH STATEMENT ---
        switch (weatherCondition) {
            case "Clouds":
                weatherIcon.src = "./images/clouds.png";
                weatherCard.style.backgroundImage = `linear-gradient(to bottom, rgba(0,0,0,0.2), rgba(0,0,0,0.6)), url('images/clouds-bg.jpg')`;
                break;
            case "Clear":
                weatherIcon.src = "./images/clear.png";
                weatherCard.style.backgroundImage = `linear-gradient(to bottom, rgba(0,0,0,0.2), rgba(0,0,0,0.6)), url('images/clear-bg.jpg')`;
                break;
            case "Rain":
            case "Drizzle":
                weatherIcon.src = "./images/rain.png";
                weatherCard.style.backgroundImage = `linear-gradient(to bottom, rgba(0,0,0,0.2), rgba(0,0,0,0.6)), url('images/rain-bg.jpg')`;
                break;
            case "Mist":
            case "Haze":
            case "Smoke":
            case "Fog":
                weatherIcon.src = "./images/mist.png";
                weatherCard.style.backgroundImage = `linear-gradient(to bottom, rgba(0,0,0,0.2), rgba(0,0,0,0.6)), url('images/mist-bg.jpg')`;
                break;
            case "Snow":
                weatherIcon.src = "./images/snow.png";
                weatherCard.style.backgroundImage = `linear-gradient(to bottom, rgba(0,0,0,0.2), rgba(0,0,0,0.6)), url('images/snow-bg.jpg')`;
                break;
            case "Thunderstorm":
                weatherIcon.src = "./images/thunderstorm.png"; // You might need to add a thunderstorm.png image
                weatherCard.style.backgroundImage = `linear-gradient(to bottom, rgba(0,0,0,0.2), rgba(0,0,0,0.6)), url('images/rain-bg.jpg')`;
                break;
            default:
                // For any other condition, use a default icon and background
                weatherIcon.src = "./images/clear.png"; 
                weatherCard.style.backgroundImage = `none`; 
                break;
        }

        document.querySelector(".weather-info").style.display = "block";
        document.querySelector(".error").style.display = "none";
    }
}

searchBtn.addEventListener("click", () => {
    currentWeather(searchBox.value);
});

searchBox.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
        currentWeather(searchBox.value);
    }
});