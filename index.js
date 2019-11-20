const APIKey = '7b6d16b9aad94f104b9310d42ef9ebf0';
let template = template `
    {{#weather}}
        <p>The weather is {{description}}</p>
    {{/weather}}
    {{#main}}
        <p>The temperature is {{temp}} in Kelvins</p>
        <p>The humidity is {{humidity}}%</p>
        <p>The pressure is {{pressure}} hPa</p>
    {{/main}}
    {{#wind}}
        <p>The wind is {{speed}} meters per hour</p>
    {{/wind}}
`;
const handleClick = () => {
    const inputValue = document.getElementById('city').value;
    const outputField = document.getElementById('weather');
    const weather = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${inputValue}&APPID=${APIKey}`);
    if (weather.ok) {
        const jsonWeather = await weather.json();
        const html = Mustache.to_html(template, jsonWeather);
        outputField.innerHTML = html;
    } else {
        alert(`Error while requesting API: ${weather.status} ${weather.statusText}. Try another one, please.`);
    }
}