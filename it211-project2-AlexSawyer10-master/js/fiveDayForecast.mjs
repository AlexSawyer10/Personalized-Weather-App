let userLoggedIn = false;

const apiKey = "d83f0691ecc1dc886b551a5c3186ea95";

/*to pull the weather for each day separately, i'm thinking of having a hash set and filtering the dt_txt which is the date */
document.addEventListener('DOMContentLoaded', async () =>
{
    try
    {

        loadCookies(); /*see if logged in or not if not kick back to login screen*/
        checkDarkMode();
        const data = await getWeatherData();
        modifyPage(data)
        /*dont need refresh manager here, only for current weather*/
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

    const url = `https://api.openweathermap.org/data/2.5/forecast?zip=${userZipCode},US&units=imperial&appid=${apiKey}`; /*look at units part in the website to make it Fahrenheit*/

    const results =  await fetch(url);
    console.log(results);


    if (results.ok === false)
    {
        throw new Error(results.statusText);
    }

    const data =  await results.json();
    console.log(data);


    return data;

}

function modifyPage(data)
{
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    /*getDay returns a number so I have to correlate that number with the day of the week*/
    const getDayOneDate = `${data.list[0].dt_txt}`
    const dateObject = new Date(getDayOneDate); /*have to make it into an object because getDayOneDate is returned as an string and getDay only works with date objects.*/
    let dayOne = dateObject.getDay();
    let dayOneTextContent = days[dayOne]

    const getDayTwoDate = `${data.list[8].dt_txt}`
    const dateTwoObject = new Date(getDayTwoDate);
    let dayTwo = dateTwoObject.getDay();
    let dayTwoTextContent = days[dayTwo]

    const getDayThreeDate = `${data.list[16].dt_txt}`
    const dateThreeObject = new Date(getDayThreeDate);
    let dayThree = dateThreeObject.getDay();
    let dayThreeTextContent = days[dayThree]

    const getDayFourDate = `${data.list[24].dt_txt}`
    const dateFourObject = new Date(getDayFourDate);
    let dayFour = dateFourObject.getDay();
    let dayFourTextContent = days[dayFour]

    const getDayFiveDate = `${data.list[32].dt_txt}`
    const dateFiveObject = new Date(getDayFiveDate);
    let dayFive = dateFiveObject.getDay();
    let dayFiveTextContent = days[dayFive]


    console.log(dayOneTextContent);

    /*subscript and find it*/
    const dayOneDay = document.getElementById('day-1-day').textContent = dayOneTextContent;
    const dayOneMain = document.getElementById('day-1-main').textContent = `Main: ${data.list[0].weather[0].main}`;
    const dayOneTemperature = document.getElementById('day-1-temperature').textContent = `Temp: ${data.list[0].main.temp} ℉`


    const dayTwoDay = document.getElementById('day-2-day').textContent = dayTwoTextContent;
    const dayTwoMain = document.getElementById('day-2-main').textContent = `Main: ${data.list[8].weather[0].main}`;
    const dayTwoTemperature = document.getElementById('day-2-temperature').textContent = `Temp: ${data.list[8].main.temp} ℉`

    const dayThreeDay = document.getElementById('day-3-day').textContent = dayThreeTextContent;
    const dayThreeMain = document.getElementById('day-3-main').textContent = `Main: ${data.list[16].weather[0].main}`;
    const dayThreeTemperature = document.getElementById('day-3-temperature').textContent = `Temp: ${data.list[16].main.temp} ℉`

    const dayFourDay = document.getElementById('day-4-day').textContent =dayFourTextContent;
    const dayFourMain = document.getElementById('day-4-main').textContent = `Main: ${data.list[24].weather[0].main}`;
    const dayFourTemperature = document.getElementById('day-4-temperature').textContent = `Temp: ${data.list[24].main.temp} ℉`

    const dayFiveDay = document.getElementById('day-5-day').textContent = dayFiveTextContent
    const dayFiveMain = document.getElementById('day-5-main').textContent = `Main: ${data.list[32].weather[0].main}`;
    const dayFiveTemperature = document.getElementById('day-5-temperature').textContent = `Temp: ${data.list[32].main.temp} ℉`

    translateWeatherCode(data)

}


function translateWeatherCode(data)
{

    const dayOneMainIcon = document.getElementById('day-1-main-icon');
    const dayTwoMainIcon = document.getElementById('day-2-main-icon');
    const dayThreeMainIcon = document.getElementById('day-3-main-icon');
    const dayFourMainIcon = document.getElementById('day-4-main-icon');
    const dayFiveMainIcon = document.getElementById('day-5-main-icon');

    const dayOneTemperatureIcon = document.getElementById('day-1-temperature-icon');
    const dayTwoTemperatureIcon = document.getElementById('day-2-temperature-icon');
    const dayThreeTemperatureIcon = document.getElementById('day-3-temperature-icon');
    const dayFourTemperatureIcon = document.getElementById('day-4-temperature-icon');
    const dayFiveTemperatureIcon = document.getElementById('day-5-temperature-icon');

    switch(data.list[0].weather[0].main)
    {
        case 'Clouds':
            dayOneMainIcon.classList.add ('bi', 'bi-cloudy-fill'); /*base icons */
            dayOneMainIcon.style.fontSize = '3rem'; /*apparently icons are treated as fonts? Weird*/
            break;
        case 'Thunderstorm':
            dayOneMainIcon.classList.add ('bi', 'bi-cloud-lightning-fill');
            dayOneMainIcon.style.fontSize = '3rem';
            break;
        case 'Drizzle':
            dayOneMainIcon.classList.add ('bi', 'bi-cloud-drizzle-fill');
            dayOneMainIcon.style.fontSize = '3rem';
            break;
        case 'Rain':
            dayOneMainIcon.classList.add ('bi', 'bi-cloud-rain');
            dayOneMainIcon.style.fontSize = '3rem';
            break;
        case 'Snow':
            dayOneMainIcon.classList.add ('bi', 'bi-cloud-snow-fill');
            dayOneMainIcon.style.fontSize = '3rem';
            break;
        case 'Mist':
            dayOneMainIcon.classList.add ('bi', 'bi-cloud-drizzle');
            dayOneMainIcon.style.fontSize = '3rem';
            break;
        case 'Smoke':
        case 'Sand':
        case 'Ash':
            dayOneMainIcon.classList.add ('bi', 'bi-cloud-haze2-fill'); /*Best I could get, it kinda looks like sand in a way*/
            dayOneMainIcon.style.fontSize = '3rem';
            break;
        case 'Squall':
            dayOneMainIcon.classList.add ('bi', 'bi-brightness-alt-low'); /*Best I could get*/
            dayOneMainIcon.style.fontSize = '3rem';
            break;
        case 'Tornado':
            dayOneMainIcon.classList.add ('bi', 'bi-tornado');
            dayOneMainIcon.style.fontSize = '3rem';
            break;
        case 'Haze':
            dayOneMainIcon.classList.add ('bi', 'bi-cloud-haze2-fill');
            dayOneMainIcon.style.fontSize = '3rem';
        break;
        case 'Dust':
            dayOneMainIcon.classList.add ('bi','bi-cloud-fog'); /*best i could get for this one*/
            dayOneMainIcon.style.fontSize = '3rem';
            break;
        case 'Clear':
            dayOneMainIcon.classList.add ('bi', 'bi-brightness-alt-low');
            dayOneMainIcon.style.fontSize = '3rem';
            break;

    }

    switch(data.list[8].weather[0].main)
    {
        case 'Clouds':
            dayTwoMainIcon.classList.add ('bi', 'bi-cloudy-fill'); /*base icons */
            dayTwoMainIcon.style.fontSize = '3rem';
            break;
        case 'Thunderstorm':
            dayTwoMainIcon.classList.add ('bi', 'bi-cloud-lightning-fill');
            dayTwoMainIcon.style.fontSize = '3rem';
            break;
        case 'Drizzle':
            dayTwoMainIcon.classList.add ('bi', 'bi-cloud-drizzle-fill');
            dayTwoMainIcon.style.fontSize = '3rem';
            break;
        case 'Rain':
            dayTwoMainIcon.classList.add ('bi', 'bi-cloud-rain');
            dayTwoMainIcon.style.fontSize = '3rem';
            break;
        case 'Snow':
            dayTwoMainIcon.classList.add ('bi', 'bi-cloud-snow-fill');
            dayTwoMainIcon.style.fontSize = '3rem';
            break;
        case 'Mist':
            dayTwoMainIcon.classList.add ('bi', 'bi-cloud-drizzle');
            dayTwoMainIcon.style.fontSize = '3rem';
            break;
        case 'Smoke':
        case 'Sand':
        case 'Ash':
            dayTwoMainIcon.classList.add ('bi', 'bi-cloud-haze2-fill'); /*Best I could get, it kinda looks like sand in a way*/
            dayTwoMainIcon.style.fontSize = '3rem';
            break;
        case 'Squall':
            dayTwoMainIcon.classList.add ('bi', 'bi-brightness-alt-low'); /*Best I could get*/
            dayTwoMainIcon.style.fontSize = '3rem';
            break;
        case 'Tornado':
            dayTwoMainIcon.classList.add ('bi', 'bi-tornado');
            dayTwoMainIcon.style.fontSize = '3rem';
            break;
        case 'Haze':
            dayTwoMainIcon.classList.add ('bi', 'bi-cloud-haze2-fill');
            dayTwoMainIcon.style.fontSize = '3rem';
            break;
        case 'Dust':
            dayTwoMainIcon.classList.add ('bi','bi-cloud-fog'); /*best i could get for this one*/
            dayTwoMainIcon.style.fontSize = '3rem';
            break;
        case 'Clear':
            dayTwoMainIcon.classList.add ('bi', 'bi-brightness-alt-low');
            dayTwoMainIcon.style.fontSize = '3rem';
            break;

    }

    switch(data.list[16].weather[0].main)
    {
        case 'Clouds':
            dayThreeMainIcon.classList.add ('bi', 'bi-cloudy-fill'); /*base icons */
            dayThreeMainIcon.style.fontSize = '3rem';
            break;
        case 'Thunderstorm':
            dayThreeMainIcon.classList.add ('bi', 'bi-cloud-lightning-fill');
            dayThreeMainIcon.style.fontSize = '3rem';
            break;
        case 'Drizzle':
            dayThreeMainIcon.classList.add ('bi', 'bi-cloud-drizzle-fill');
            dayThreeMainIcon.style.fontSize = '3rem';
            break;
        case 'Rain':
            dayThreeMainIcon.classList.add ('bi', 'bi-cloud-rain');
            dayThreeMainIcon.style.fontSize = '3rem';
            break;
        case 'Snow':
            dayThreeMainIcon.classList.add ('bi', 'bi-cloud-snow-fill');
            dayThreeMainIcon.style.fontSize = '3rem';
            break;
        case 'Mist':
            dayThreeMainIcon.classList.add ('bi', 'bi-cloud-drizzle');
            dayThreeMainIcon.style.fontSize = '3rem';
            break;
        case 'Smoke':
        case 'Sand':
        case 'Ash':
            dayThreeMainIcon.classList.add ('bi', 'bi-cloud-haze2-fill'); /*Best I could get, it kinda looks like sand in a way*/
            dayThreeMainIcon.style.fontSize = '3rem';
            break;
        case 'Squall':
            dayThreeMainIcon.classList.add ('bi', 'bi-brightness-alt-low'); /*Best I could get*/
            dayThreeMainIcon.style.fontSize = '3rem';
            break;
        case 'Tornado':
            dayThreeMainIcon.classList.add ('bi', 'bi-tornado');
            dayThreeMainIcon.style.fontSize = '3rem';
            break;
        case 'Haze':
            dayThreeMainIcon.classList.add ('bi', 'bi-cloud-haze2-fill');
            dayThreeMainIcon.style.fontSize = '3rem';
            break;
        case 'Dust':
            dayThreeMainIcon.classList.add ('bi','bi-cloud-fog'); /*best i could get for this one*/
            dayThreeMainIcon.style.fontSize = '3rem';
            break;
        case 'Clear':
            dayThreeMainIcon.classList.add ('bi', 'bi-brightness-alt-low');
            dayThreeMainIcon.style.fontSize = '3rem';
            break;

    }

    switch(data.list[24].weather[0].main)
    {
        case 'Clouds':
            dayFourMainIcon.classList.add ('bi', 'bi-cloudy-fill'); /*base icons */
            dayFourMainIcon.style.fontSize = '3rem';
            break;
        case 'Thunderstorm':
            dayFourMainIcon.classList.add ('bi', 'bi-cloud-lightning-fill');
            dayFourMainIcon.style.fontSize = '3rem';
            break;
        case 'Drizzle':
            dayFourMainIcon.classList.add ('bi', 'bi-cloud-drizzle-fill');
            dayFourMainIcon.style.fontSize = '3rem';
            break;
        case 'Rain':
            dayFourMainIcon.classList.add ('bi', 'bi-cloud-rain');
            dayFourMainIcon.style.fontSize = '3rem';
            break;
        case 'Snow':
            dayFourMainIcon.classList.add ('bi', 'bi-cloud-snow-fill');
            dayFourMainIcon.style.fontSize = '3rem';
            break;
        case 'Mist':
            dayFourMainIcon.classList.add ('bi', 'bi-cloud-drizzle');
            dayFourMainIcon.style.fontSize = '3rem';
            break;
        case 'Smoke':
        case 'Sand':
        case 'Ash':
            dayFourMainIcon.classList.add ('bi', 'bi-cloud-haze2-fill'); /*Best I could get, it kinda looks like sand in a way*/
            dayFourMainIcon.style.fontSize = '3rem';
            break;
        case 'Squall':
            dayFourMainIcon.classList.add ('bi', 'bi-brightness-alt-low'); /*Best I could get*/
            dayFourMainIcon.style.fontSize = '3rem';
            break;
        case 'Tornado':
            dayFourMainIcon.classList.add ('bi', 'bi-tornado');
            dayFourMainIcon.style.fontSize = '3rem';
            break;
        case 'Haze':
            dayFourMainIcon.classList.add ('bi', 'bi-cloud-haze2-fill');
            dayFourMainIcon.style.fontSize = '3rem';
            break;
        case 'Dust':
            dayFourMainIcon.classList.add ('bi','bi-cloud-fog'); /*best i could get for this one*/
            dayFourMainIcon.style.fontSize = '3rem';
            break;
        case 'Clear':
            dayFourMainIcon.classList.add ('bi', 'bi-brightness-alt-low');
            dayFourMainIcon.style.fontSize = '3rem';
            break;

    }

    switch(data.list[32].weather[0].main)
    {
        case 'Clouds':
            dayFiveMainIcon.classList.add ('bi', 'bi-cloudy-fill'); /*base icons */
            dayFiveMainIcon.style.fontSize = '3rem';
            break;
        case 'Thunderstorm':
            dayFiveMainIcon.classList.add ('bi', 'bi-cloud-lightning-fill');
            dayFiveMainIcon.style.fontSize = '3rem';
            break;
        case 'Drizzle':
            dayFiveMainIcon.classList.add ('bi', 'bi-cloud-drizzle-fill');
            dayFiveMainIcon.style.fontSize = '3rem';
            break;
        case 'Rain':
            dayFiveMainIcon.classList.add ('bi', 'bi-cloud-rain');
            dayFiveMainIcon.style.fontSize = '3rem';
            break;
        case 'Snow':
            dayFiveMainIcon.classList.add ('bi', 'bi-cloud-snow-fill');
            dayFiveMainIcon.style.fontSize = '3rem';
            break;
        case 'Mist':
            dayFiveMainIcon.classList.add ('bi', 'bi-cloud-drizzle');
            dayFiveMainIcon.style.fontSize = '3rem';
            break;
        case 'Smoke':
        case 'Sand':
        case 'Ash':
            dayFiveMainIcon.classList.add ('bi', 'bi-cloud-haze2-fill'); /*Best I could get, it kinda looks like sand in a way*/
            dayFiveMainIcon.style.fontSize = '3rem';
            break;
        case 'Squall':
            dayFiveMainIcon.classList.add ('bi', 'bi-brightness-alt-low'); /*Best I could get*/
            dayFiveMainIcon.style.fontSize = '3rem';
            break;
        case 'Tornado':
            dayFiveMainIcon.classList.add ('bi', 'bi-tornado');
            dayFiveMainIcon.style.fontSize = '3rem';
            break;
        case 'Haze':
            dayFiveMainIcon.classList.add ('bi', 'bi-cloud-haze2-fill');
            dayFiveMainIcon.style.fontSize = '3rem';
            break;
        case 'Dust':
            dayFiveMainIcon.classList.add ('bi','bi-cloud-fog'); /*best i could get for this one*/
            dayFiveMainIcon.style.fontSize = '3rem';
            break;
        case 'Clear':
            dayFiveMainIcon.classList.add ('bi', 'bi-brightness-alt-low');
            dayFiveMainIcon.style.fontSize = '3rem';
            break;

    }

    switch(true)
    {
        case data.list[0].main.temp < 0:
            dayOneTemperatureIcon.classList.add ('bi', 'bi-thermometer-snow');
            dayOneTemperatureIcon.style.fontSize = '2.4rem';
            break;
        case data.list[0].main.temp >= 0 && data.list[0].main.temp <= 36:
            dayOneTemperatureIcon.classList.add ('bi', 'bi-thermometer');
            dayOneTemperatureIcon.style.fontSize = '2.4rem';
            break;
        case data.list[0].main.temp > 36 && data.list[0].main.temp <=  50:
            dayOneTemperatureIcon.classList.add ('bi', 'bi-thermometer-low');
            dayOneTemperatureIcon.style.fontSize = '2.4rem';
            break;
        case data.list[0].main.temp > 50 && data.list[0].main.temp <=  60:
            dayOneTemperatureIcon.classList.add ('bi', 'bi-thermometer-half');
            dayOneTemperatureIcon.style.fontSize = '2.4rem';
            break;
        case data.list[0].main.temp > 60 && data.list[0].main.temp <=  80:
            dayOneTemperatureIcon.classList.add ('bi', 'bi-thermometer-high');
            dayOneTemperatureIcon.style.fontSize = '2.4rem';
            break;
        case data.list[0].main.temp > 80:
            dayOneTemperatureIcon.classList.add ('bi', 'bi-thermometer-sun');
            dayOneTemperatureIcon.style.fontSize = '2.4rem';
            break;

    }

    switch(true)
    {
        case data.list[8].main.temp < 0:
            dayTwoTemperatureIcon.classList.add ('bi', 'bi-thermometer-snow');
            dayTwoTemperatureIcon.style.fontSize = '2.4rem';
            break;
        case data.list[8].main.temp >= 0 && data.list[8].main.temp <= 36:
            dayTwoTemperatureIcon.classList.add ('bi', 'bi-thermometer');
            dayTwoTemperatureIcon.style.fontSize = '2.4rem';
            break;
        case data.list[8].main.temp > 36 && data.list[8].main.temp <=  50:
            dayTwoTemperatureIcon.classList.add ('bi', 'bi-thermometer-low');
            dayTwoTemperatureIcon.style.fontSize = '2.4rem';
            break;
        case data.list[8].main.temp > 50 && data.list[8].main.temp <=  60:
            dayTwoTemperatureIcon.classList.add ('bi', 'bi-thermometer-half');
            dayTwoTemperatureIcon.style.fontSize = '2.4rem';
            break;
        case data.list[8].main.temp > 60 && data.list[8].main.temp <=  80:
            dayTwoTemperatureIcon.classList.add ('bi', 'bi-thermometer-high');
            dayTwoTemperatureIcon.style.fontSize = '2.4rem';
            break;
        case data.list[8].main.temp > 80:
            dayTwoTemperatureIcon.classList.add ('bi', 'bi-thermometer-sun');
            dayTwoTemperatureIcon.style.fontSize = '2.4rem';
            break;

    }

    switch(true)
    {
        case data.list[16].main.temp < 0:
            dayThreeTemperatureIcon.classList.add ('bi', 'bi-thermometer-snow');
            dayThreeTemperatureIcon.style.fontSize = '2.4rem';
            break;
        case data.list[16].main.temp >= 0 && data.list[16].main.temp <= 36:
            dayThreeTemperatureIcon.classList.add ('bi', 'bi-thermometer');
            dayThreeTemperatureIcon.style.fontSize = '2.4rem';
            break;
        case data.list[16].main.temp > 36 && data.list[16].main.temp <=  50:
            dayThreeTemperatureIcon.classList.add ('bi', 'bi-thermometer-low');
            dayThreeTemperatureIcon.style.fontSize = '2.4rem';
            break;
        case data.list[16].main.temp > 50 && data.list[16].main.temp <=  60:
            dayThreeTemperatureIcon.classList.add ('bi', 'bi-thermometer-half');
            dayThreeTemperatureIcon.style.fontSize = '2.4rem';
            break;
        case data.list[16].main.temp > 60 && data.list[16].main.temp <=  80:
            dayThreeTemperatureIcon.classList.add ('bi', 'bi-thermometer-high');
            dayThreeTemperatureIcon.style.fontSize = '2.4rem';
            break;
        case data.list[16].main.temp > 80:
            dayThreeTemperatureIcon.classList.add ('bi', 'bi-thermometer-sun');
            dayThreeTemperatureIcon.style.fontSize = '2.4rem';
            break;

    }

    switch(true)
    {
        case data.list[24].main.temp < 0:
            dayFourTemperatureIcon.classList.add ('bi', 'bi-thermometer-snow');
            dayFourTemperatureIcon.style.fontSize = '2.4rem';
            break;
        case data.list[24].main.temp >= 0 && data.list[24].main.temp <= 36:
            dayFourTemperatureIcon.classList.add ('bi', 'bi-thermometer');
            dayFourTemperatureIcon.style.fontSize = '2.4rem';
            break;
        case data.list[24].main.temp > 36 && data.list[24].main.temp <=  50:
            dayFourTemperatureIcon.classList.add ('bi', 'bi-thermometer-low');
            dayFourTemperatureIcon.style.fontSize = '2.4rem';
            break;
        case data.list[24].main.temp > 50 && data.list[24].main.temp <=  60:
            dayFourTemperatureIcon.classList.add ('bi', 'bi-thermometer-half');
            dayFourTemperatureIcon.style.fontSize = '2.4rem';
            break;
        case data.list[24].main.temp > 60 && data.list[24].main.temp <=  80:
            dayFourTemperatureIcon.classList.add ('bi', 'bi-thermometer-high');
            dayFourTemperatureIcon.style.fontSize = '2.4rem';
            break;
        case data.list[24].main.temp > 80:
            dayFourTemperatureIcon.classList.add ('bi', 'bi-thermometer-sun');
            dayFourTemperatureIcon.style.fontSize = '2.4rem';
            break;

    }

    switch(true)
    {
        case data.list[32].main.temp < 0:
            dayFiveTemperatureIcon.classList.add ('bi', 'bi-thermometer-snow');
            dayFiveTemperatureIcon.style.fontSize = '2.4rem';
            break;
        case data.list[32].main.temp >= 0 && data.list[32].main.temp <= 36:
            dayFiveTemperatureIcon.classList.add ('bi', 'bi-thermometer');
            dayFiveTemperatureIcon.style.fontSize = '2.4rem';
            break;
        case data.list[32].main.temp > 36 && data.list[32].main.temp <=  50:
            dayFiveTemperatureIcon.classList.add ('bi', 'bi-thermometer-low');
            dayFiveTemperatureIcon.style.fontSize = '2.4rem';
            break;
        case data.list[32].main.temp > 50 && data.list[32].main.temp <=  60:
            dayFiveTemperatureIcon.classList.add ('bi', 'bi-thermometer-half');
            dayFiveTemperatureIcon.style.fontSize = '2.4rem';
            break;
        case data.list[32].main.temp > 60 && data.list[32].main.temp <=  80:
            dayFiveTemperatureIcon.classList.add ('bi', 'bi-thermometer-high');
            dayFiveTemperatureIcon.style.fontSize = '2.4rem';
            break;
        case data.list[32].main.temp > 80:
            dayFiveTemperatureIcon.classList.add ('bi', 'bi-thermometer-sun');
            dayFiveTemperatureIcon.style.fontSize = '2.4rem';
            break;

    }

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