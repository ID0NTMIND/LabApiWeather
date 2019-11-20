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
const templateOnError = `
    <div>Something wrong.Try later.</div>
    <div>Response is: ${weather.status} ${weather.statusText}</div>
`;
async function handleClick(e) {
    e.preventDefault();
    let inputValue = document.getElementById('city').value;
    const outputField = document.getElementById('weather');
    outputField.innerHTML = await getWeatherData(inputValue);
}
async function getWeatherData(inputValue) {
    let weather = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${inputValue}&APPID=${APIKey}`);
    if (weather.ok) {
        const jsonWeather = await weather.json();
        const html = Mustache.to_html(templateOnSuccess, jsonWeather);
        return html;
    } else {
        return templateOnError;
    }
}