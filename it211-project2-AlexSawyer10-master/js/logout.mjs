let userLoggedIn = false;

document.addEventListener("DOMContentLoaded", () =>
{
    loadCookies();

    const welcomeMessage = document.getElementById("welcome");

    const logoutClick = document.getElementById("logout-button");

    logoutClick.addEventListener("click", (e) =>
    {
        logoutLogic();

    });

});

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

function logoutLogic()
{
    /*https://www.w3schools.com/js/js_cookies.asp*/
    document.cookie = `loggedInUser=; expires=Thu, 18 Dec 2013 12:00:00 UTC`; /*the current date we wrote in class wasn't completely destroying the cookie,
                                                                                only setting it null for some reason*/

    console.log("user is logged out");

}