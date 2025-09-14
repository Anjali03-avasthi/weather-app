const fetch = require('node-fetch');

exports.handler = async function (event, context) {
    const city = event.queryStringParameters.city;
    const apiKey = process.env.OPENWEATHER_API_KEY;

    if (!apiKey) {
        return { statusCode: 500, body: JSON.stringify({ error: 'API key is missing.' }) };
    }

    const apiURL = `https://api.openweathermap.org/data/2.5/weather?units=metric&q=${city}&appid=${apiKey}`;

    try {
        const response = await fetch(apiURL);
        const data = await response.json();
        return {
            statusCode: response.status,
            body: JSON.stringify(data)
        };
    } catch (error) {
        return { statusCode: 500, body: JSON.stringify({ error: 'Failed to fetch weather data' }) };
    }
};