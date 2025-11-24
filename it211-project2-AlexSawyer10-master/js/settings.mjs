let darkMode = false;
let userLoggedIn = false;

document.addEventListener("DOMContentLoaded", () => {

    loadCookies();

    const darkModeButton = document.getElementById('dark-mode-button');

        darkModeButton.addEventListener('click', (e) => // switching darkmode button functionality here
        {

            // didn't give expiration date so this is a session cookie.
            darkMode = !darkMode;
            updateGUI();
            document.cookie = `darkmode=${String(darkMode)}; Secure;`; // remember only thing a cookie can have is strings
            console.log(document.cookie);
        });

    const updateForm = document.getElementById("update-settings");

    updateForm.addEventListener("submit", (e) =>
    {
        e.preventDefault();

        const loggedInUser = getCookieValue("loggedInUser");

        const getAllUsers = JSON.parse(localStorage.getItem("userInfo")) || [];

        const userLoggedInCheck = getAllUsers.find(u => u.email === loggedInUser);

        let userZipCode = document.getElementById("zip-code");
        let userZipCodeInput = userZipCode.value;

        userLoggedInCheck.zipcode = userZipCodeInput;

        localStorage.setItem("userInfo", JSON.stringify(getAllUsers));

        userZipCode.value = ""; /*reset it back to nothing once its submitted*/


        const successMessageCheck = document.querySelector('.text-success');
        if(successMessageCheck) /*here im getting rid of the old message so they dont stack up*/
        {
            successMessageCheck.remove();
        }

        const successMessage = document.createElement('h3')

        successMessage.textContent = `Zipcode Updated!`;
        successMessage.classList.add('text-success');
        successMessage.classList.add('mt-3');

        document.getElementById("settings-header").appendChild(successMessage);
    });



});


function loadCookies()
{
    console.log(document.cookie);
    darkMode = getCookieValue('darkmode') === 'true'; /*cookies store everything as strings so have to compare it to a string of true*/

    updateGUI();
}

function getCookieValue(key)
{
    return document.cookie.split('; ')
        .find((c) => c.startsWith(key + "="))
        ?.split('=')[1];
}


function updateGUI()
{
    if(darkMode)
    {
        document.body.style.backgroundColor = '#0a4496'

    }
    else
    {
        document.body.style.backgroundColor = '#ADD8E6'

    }

    const darkModeSetCheck = document.getElementById('dark-mode-button');

        document.getElementById('dark-mode-button').textContent = (darkMode) ? 'Light mode' : 'Dark mode';

}

