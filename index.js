const APIKey = '7b6d16b9aad94f104b9310d42ef9ebf0';
const templateOnSuccess = `
    {{#weather}}
        <p>The weather - {{description}}.</p>
    {{/weather}}
    {{#main}}
        <p>The temperature - {{temp}} K.</p>
        <p>The humidity - {{humidity}}%.</p>
        <p>The pressure - {{pressure}} hPa.</p>
    {{/main}}
    {{#wind}}
        <p>The wind - {{speed}} meters/hour.</p>
    {{/wind}}
    {{#sys}}
        <p>City is located in - {{country}}.</p>
    {{/sys}}
`;

document.getElementById('weatherForm').addEventListener('submit', handleSubmit);
const templateOnError = `
    <div>Something wrong.Try later.</div>
    <div>Response is: {{cod}} {{message}}</div>
`;
async function handleSubmit(e) {
    e.preventDefault();
    if (e.target[0].value === '') {
        addElementToHTML('<div>Nothing to search. You need to write something.</div>')
        return;
    }
    addElementToHTML(await handleWeatherData(await getWeatherData(e.target[0].value)));
}
async function getWeatherData(inputValue) {
    let weather = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${inputValue}&APPID=${APIKey}`);
    return weather;
}

async function handleWeatherData(weatherData) {
    if (weatherData.ok) {
        const jsonWeather = await weatherData.json();
        const html = Mustache.to_html(templateOnSuccess, jsonWeather);
        return html;
    }
    const jsonWeather = await weatherData.json();
    const html = Mustache.to_html(templateOnError, jsonWeather);
    return html;
}

function addElementToHTML(html) {
    const outputField = document.getElementById('weather');
    outputField.innerHTML = html;
}