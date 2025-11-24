let userLoggedIn = false;

document.addEventListener("DOMContentLoaded", () =>
{
    loadCookies();
    checkDarkMode();
    const welcomeMessage = document.getElementById("welcome");

    welcomeMessage.textContent = `Welcome: ${userLoggedIn}`;

    const userInfo = localStorage.getItem("userInfo");

    const loggedInUser = getCookieValue("loggedInUser");

    const getAllUsers = JSON.parse(localStorage.getItem("userInfo")) || [];

    const userLoggedInCheck = getAllUsers.find(u => u.email === loggedInUser);

    let userZipCode = userLoggedInCheck.zipcode;

    const userZipCodeMessage = document.getElementById("user-zipcode").textContent = `Zip Code: ${userZipCode}`;

});

/*remember pulled functions from cookies code from class, refer to that*/
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
