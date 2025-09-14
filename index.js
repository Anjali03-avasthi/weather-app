const apiKey = "b7ef6a80186befd99bc79fb214d43b06"; // Your key is public here
const apiURL = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

const searchBox = document.querySelector(".search-bar input");
const searchBtn = document.querySelector(".search-bar button");
const weatherIcon = document.querySelector(".weather-icon");
const weatherCard = document.querySelector(".weather-card");

async function currentWeather(city) {
    const response = await fetch(apiURL + city + `&appid=${apiKey}`);

    if(response.status == 404){
        document.querySelector(".error").style.display = "block";
        document.querySelector(".weather-info").style.display = "none";
    } else {
        const data = await response.json();
        document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "°c";
        document.querySelector(".city").innerHTML = data.name;
        document.querySelector(".main").innerHTML = data.weather[0].main;
        document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
        document.querySelector(".wind").innerHTML = data.wind.speed + " km/h";

        weatherIcon.src = `images/${data.weather[0].main.toLowerCase()}.png`;
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