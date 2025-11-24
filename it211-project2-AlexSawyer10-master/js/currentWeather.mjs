let userLoggedIn = false;

const apiKey = "d83f0691ecc1dc886b551a5c3186ea95";

/*Five day forecast starts at the day your currently on, onward*/
/*https://openweathermap.org/weather-conditions refer for possible main conditions for icons*/

const REFRESH_SECONDS = 30; /*remember paper wants 30 second refresh timer not 15*/
let secondsUntilRefresh = REFRESH_SECONDS + 1;

/*check lab 5 for api help*/
document.addEventListener('DOMContentLoaded', async () =>
{
    try /*catching if invalid request*/
    {
        loadCookies(); /*see if logged in or not if not kick back to login screen*/
        checkDarkMode();
        const data = await getWeatherData();
        modifyPage(data)
        await refreshManager();
    }
    catch(e)
    {
        console.error(e);
    }

});

async function getWeatherData()
{

        const loggedInUser = getCookieValue("loggedInUser");

        const getAllUsers = JSON.parse(localStorage.getItem("userInfo")) || [];

        const userLoggedInCheck = getAllUsers.find(u => u.email === loggedInUser);

        let userZipCode = userLoggedInCheck.zipcode;

        const url = `https://api.openweathermap.org/data/2.5/weather?zip=${userZipCode},US&units=imperial&appid=${apiKey}`; /*look at units part in the website to make it Fahrenheit*/

        const results = await fetch(url);
        console.log(results);

        if (results.ok === false)
        {
            throw new Error(results.statusText);
        }

        const data = await results.json();
        return data;




}

function modifyPage(data)
{
    document.getElementById("main").textContent = `Main:  ${data.weather[0].main}`; /*weather is an array so to get into it you need to subscript 0 the get to main*/

    document.getElementById("description").textContent = `Description: ${data.weather[0].description}`;

    document.getElementById("temperature").textContent = `Temperature: ${data.main.temp} ℉`;

    document.getElementById("feels-like").textContent = `Feels-like: ${data.main.feels_like} ℉`;

    document.getElementById("temp-min").textContent = `Temp-min: ${data.main.temp_min} ℉`;

    document.getElementById("temp-max").textContent = `Temp-max: ${data.main.temp_max} ℉`;

    document.getElementById("humidity").textContent = `Humidity: ${data.main.humidity} ℉`;

    document.getElementById("wind-speed").textContent = `Wind-speed: ${data.wind.speed} `;

    translateWeatherCode(data)

}

function translateWeatherCode(data)
{

    const mainIcon = document.getElementById('main-icon');

    const temperatureIcon = document.getElementById('temperature-icon');

    const feelsLikeIcon = document.getElementById('feels-like-icon');

    const temperatureMinIcon = document.getElementById('temperature-min-icon');

    const temperatureMaxIcon = document.getElementById('temperature-max-icon');

    const humidityIcon = document.getElementById('humidity-icon');

    const windSpeedIcon = document.getElementById('wind-speed-icon');

    mainIcon.className = '';
    temperatureIcon.className = '';
    feelsLikeIcon.className = '';
    temperatureMinIcon.className = '';
    temperatureMaxIcon.className = '';
    humidityIcon.className = '';
    windSpeedIcon.className = '';

    /*remember im gonna want to refresh the icons also*/

    switch(data.weather[0].main)
    {
        case 'Clouds':
            mainIcon.classList.add ('bi', 'bi-cloudy-fill'); /*base icons */
            mainIcon.style.fontSize = '3rem'; /*apparently icons are treated as fonts? Weird*/
            break;
        case 'Thunderstorm':
            mainIcon.classList.add ('bi', 'bi-cloud-lightning-fill');
            mainIcon.style.fontSize = '3rem'; /*apparently icons are treated as fonts? Weird*/
            break;
        case 'Drizzle':
            mainIcon.classList.add ('bi', 'bi-cloud-drizzle-fill');
            mainIcon.style.fontSize = '3rem'; /*apparently icons are treated as fonts? Weird*/
            break;
        case 'Rain':
            mainIcon.classList.add ('bi', 'bi-cloud-rain');
            mainIcon.style.fontSize = '3rem'; /*apparently icons are treated as fonts? Weird*/
            break;
        case 'Snow':
            mainIcon.classList.add ('bi', 'bi-cloud-snow-fill');
            mainIcon.style.fontSize = '3rem'; /*apparently icons are treated as fonts? Weird*/
            break;
        case 'Mist':
            mainIcon.classList.add ('bi', 'bi-cloud-drizzle');
            mainIcon.style.fontSize = '3rem'; /*apparently icons are treated as fonts? Weird*/
            break;
        case 'Smoke':
        case 'Sand':
        case 'Ash':
            mainIcon.classList.add ('bi', 'bi-cloud-haze2-fill'); /*Best I could get, it kinda looks like sand in a way*/
            mainIcon.style.fontSize = '3rem'; /*apparently icons are treated as fonts? Weird*/
            break;
        case 'Squall':
            mainIcon.classList.add ('bi', 'bi-brightness-alt-low'); /*Best I could get*/
            mainIcon.style.fontSize = '3rem'; /*apparently icons are treated as fonts? Weird*/
            break;
        case 'Tornado':
            mainIcon.classList.add ('bi', 'bi-tornado');
            mainIcon.style.fontSize = '3rem';
            break;
        case 'Haze':
            mainIcon.classList.add ('bi', 'bi-cloud-haze2-fill');
            mainIcon.style.fontSize = '3rem'; /*apparently icons are treated as fonts? Weird*/
            break;
        case 'Dust':
            mainIcon.classList.add ('bi','bi-cloud-fog'); /*best i could get for this one*/
            mainIcon.style.fontSize = '3rem'; /*apparently icons are treated as fonts? Weird*/
            break;
        case 'Clear':
            mainIcon.classList.add ('bi', 'bi-brightness-alt-low');
            mainIcon.style.fontSize = '3rem';
            break;

    }

    switch (true)
    {
        case data.main.temp < 0:
            temperatureIcon.classList.add ('bi', 'bi-thermometer-snow');
            temperatureIcon.style.fontSize = '2.4rem';
            break;
        case data.main.temp >= 0 && data.main.temp <= 36:
            temperatureIcon.classList.add ('bi', 'bi-thermometer');
            temperatureIcon.style.fontSize = '2.4rem';
            break;
        case data.main.temp > 36 && data.main.temp <=  50:
            temperatureIcon.classList.add ('bi', 'bi-thermometer-low');
            temperatureIcon.style.fontSize = '2.4rem';
            break;
        case data.main.temp > 50 && data.main.temp <=  60:
            temperatureIcon.classList.add ('bi', 'bi-thermometer-half');
            temperatureIcon.style.fontSize = '2.4rem';
            break;
        case data.main.temp > 60 && data.main.temp <=  80:
            temperatureIcon.classList.add ('bi', 'bi-thermometer-high');
            temperatureIcon.style.fontSize = '2.4rem';
            break;
        case data.main.temp > 80:
            temperatureIcon.classList.add ('bi', 'bi-thermometer-sun');
            temperatureIcon.style.fontSize = '2.4rem';
            break;

    }

    switch (true)
    {
        case data.main.feels_like < 0:
            feelsLikeIcon.classList.add ('bi', 'bi-thermometer-snow');
            feelsLikeIcon.style.fontSize = '2.4rem';
            break;
        case data.main.feels_like  >= 0 && data.main.feels_like  <= 36:
            feelsLikeIcon.classList.add ('bi', 'bi-thermometer');
            feelsLikeIcon.style.fontSize = '2.4rem';
            break;
        case data.main.temp > 36 && data.main.feels_like <=  50:
            feelsLikeIcon.classList.add ('bi', 'bi-thermometer-low');
            feelsLikeIcon.style.fontSize = '2.4rem';
            break;
        case data.main.feels_like  > 50 && data.main.feels_like <=  60:
            feelsLikeIcon.classList.add ('bi', 'bi-thermometer-half');
            feelsLikeIcon.style.fontSize = '2.4rem';
            break;
        case data.main.feels_like  > 60 && data.main.feels_like  <=  80:
            feelsLikeIcon.classList.add ('bi', 'bi-thermometer-high');
            feelsLikeIcon.style.fontSize = '2.4rem';
            break;
        case data.main.feels_like  > 80:
            feelsLikeIcon.classList.add ('bi', 'bi-thermometer-sun');
            feelsLikeIcon.style.fontSize = '2.4rem';
            break;

    }

    switch (true)
    {
        case data.main.temp_min < 0:
            temperatureMinIcon.classList.add ('bi', 'bi-thermometer-snow');
            temperatureMinIcon.style.fontSize = '2.4rem';
            break;
        case data.main.temp_min  >= 0 && data.main.temp_min  <= 36:
            temperatureMinIcon.classList.add ('bi', 'bi-thermometer');
            temperatureMinIcon.style.fontSize = '2.4rem';
            break;
        case data.main.temp_min > 36 && data.main.temp_min<=  50:
            temperatureMinIcon.classList.add ('bi', 'bi-thermometer-low');
            temperatureMinIcon.style.fontSize = '2.4rem';
            break;
        case data.main.temp_min  > 50 && data.main.temp_min <=  60:
            temperatureMinIcon.classList.add ('bi', 'bi-thermometer-half');
            temperatureMinIcon.style.fontSize = '2.4rem';
            break;
        case data.main.temp_min  > 60 && data.main.temp_min  <=  80:
            temperatureMinIcon.classList.add ('bi', 'bi-thermometer-high');
            temperatureMinIcon.style.fontSize = '2.4rem';
            break;
        case data.main.temp_min  > 80:
            temperatureMinIcon.classList.add ('bi', 'bi-thermometer-sun');
            temperatureMinIcon.style.fontSize = '2.4rem';
            break;

    }

    switch (true)
    {
        case data.main.temp_max < 0:
            temperatureMaxIcon.classList.add ('bi', 'bi-thermometer-snow');
            temperatureMaxIcon.style.fontSize = '2.4rem';
            break;
        case data.main.temp_max  >= 0 && data.main.temp_max  <= 36:
            temperatureMaxIcon.classList.add ('bi', 'bi-thermometer');
            temperatureMaxIcon.style.fontSize = '2.4rem';
            break;
        case data.main.temp_max > 36 && data.main.temp_max<=  50:
            temperatureMaxIcon.classList.add ('bi', 'bi-thermometer-low');
            temperatureMaxIcon.style.fontSize = '2.4rem';
            break;
        case data.main.temp_max  > 50 && data.main.temp_max <=  60:
            temperatureMaxIcon.classList.add ('bi', 'bi-thermometer-half');
            temperatureMaxIcon.style.fontSize = '2.4rem';
            break;
        case data.main.temp_max  > 60 && data.main.temp_max  <=  80:
            temperatureMaxIcon.classList.add ('bi', 'bi-thermometer-high');
            temperatureMaxIcon.style.fontSize = '2.4rem';
            break;
        case data.main.temp_max  > 80:
            temperatureMaxIcon.classList.add ('bi', 'bi-thermometer-sun');
            temperatureMaxIcon.style.fontSize = '2.4rem';
            break;

    }

    switch (true)
    {
        case data.main.humidity < 0:
            humidityIcon.classList.add ('bi', 'bi-thermometer-snow');
            humidityIcon.style.fontSize = '2.4rem';
            break;
        case data.main.humidity  >= 0 && data.main.humidity  <= 36:
            humidityIcon.classList.add ('bi', 'bi-thermometer');
            humidityIcon.style.fontSize = '2.4rem';
            break;
        case data.main.humidity > 36 && data.main.humidity<=  50:
            humidityIcon.classList.add ('bi', 'bi-thermometer-low');
            humidityIcon.style.fontSize = '2.4rem';
            break;
        case data.main.humidity  > 50 && data.main.humidity <=  60:
            humidityIcon.classList.add ('bi', 'bi-thermometer-half');
            humidityIcon.style.fontSize = '2.4rem';
            break;
        case data.main.humidity  > 60 && data.main.humidity  <=  80:
            humidityIcon.classList.add ('bi', 'bi-thermometer-high');
            humidityIcon.style.fontSize = '2.4rem';
            break;
        case data.main.humidity  > 80:
            humidityIcon.classList.add ('bi', 'bi-thermometer-sun'); /*this is a real one had to double-check it looked weird*/
            humidityIcon.style.fontSize = '2.4rem';
            break;

    }

    windSpeedIcon.classList.add('bi','bi-wind') /*only 1 wind speed icon I can use so no conditions are needed*/
    windSpeedIcon.style.fontSize = '2.4rem';

}

 async function refreshManager()/*refer to JS_fetch code for refreshing*/
{
    if(--secondsUntilRefresh <= 0)
    {
        document.getElementById('refresh-timer').textContent = 'Refreshing...'
        const data = await getWeatherData();
        modifyPage(data);
        secondsUntilRefresh = REFRESH_SECONDS;
    }

    document.getElementById('refresh-timer').textContent = `Refreshing in ${secondsUntilRefresh} second(s)...`;

    setTimeout(refreshManager, 1000);


}

function loadCookies()
{
    console.log(document.cookie);
    userLoggedIn = getCookieValue('loggedInUser');

    if (!userLoggedIn)
    {
        window.location.href = 'login.html';
    }

}

function getCookieValue(key)
{
    return document.cookie.split('; ')
        .find((c) => c.startsWith(key + "="))
        ?.split('=')[1];
}


function checkDarkMode()
{
    const darkModeCheck = getCookieValue('darkmode') === 'true';

    if(darkModeCheck)
    {
        document.body.style.backgroundColor = '#0a4496'
    }
    else
    {
        document.body.style.backgroundColor = '#ADD8E6'

    }
}



