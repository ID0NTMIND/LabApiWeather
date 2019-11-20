const APIKey = '7b6d16b9aad94f104b9310d42ef9ebf0';
let template = `
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
async function handleClick() {
    const inputValue = document.getElementById('city').value;
    const outputField = document.getElementById('weather');
    const weather = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${inputValue}&APPID=${APIKey}`);
    if (weather.ok) {
        const jsonWeather = await weather.json();
        const html = Mustache.to_html(template, jsonWeather);
        outputField.innerHTML = html;
    } else {
        template = `
        <div > Something wrong.Try later. </div>
        <div> Response is: ${weather.status} ${weather.statusText}</div>
    `;
        outputField.innerHTML = template;
    }
}