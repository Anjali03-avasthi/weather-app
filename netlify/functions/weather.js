const fetch = require('node-fetch');

exports.handler = async function(event) {
    const city = event.queryStringParameters.city;
    const apiKey = process.env.OPENWEATHER_API_KEY; // Gets the secret key from Netlify
    const apiURL = `https://api.openweathermap.org/data/2.5/weather?units=metric&q=${city}&appid=${apiKey}`;

    try {
        const response = await fetch(apiURL);
        const data = await response.json();
        return {
            statusCode: 200,
            body: JSON.stringify(data)
        };
    } catch (error) {
        return { statusCode: 500, body: JSON.stringify({ error: 'Failed to fetch data' }) };
    }
};