export let userInfo = JSON.parse(localStorage.getItem("userInfo")) || {}; /*if null, set it to empty.*/

document.addEventListener("DOMContentLoaded", () =>
{
    document.getElementById("login-form").addEventListener("submit", (e) =>
    {
        e.preventDefault(); /*dont allow page refresh here*/

        const email = document.getElementById("email").value;

        const password = document.getElementById("password").value;

        let usersArray = JSON.parse(localStorage.getItem("userInfo")) || [];

        const findValidUser = usersArray.find(userInfo => userInfo.email === email && userInfo.password === password); /*https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/find refer to find syntax*/

        if(findValidUser)
        {
            document.cookie = `loggedInUser=${email}`
            window.location.href = "home.html";
        }
        else
        {
            const checkIfInvalidMessage = document.querySelector('h3');
            if(checkIfInvalidMessage) /*here im getting rid of the old message so they dont stack up*/
            {
                checkIfInvalidMessage.remove();
            }

            const wrongCredentialsMessage = document.createElement('h3')
            wrongCredentialsMessage.textContent = `Invalid Credentials`;
            wrongCredentialsMessage.classList.add('text-danger');
            wrongCredentialsMessage.classList.add('mt-3');

            document.getElementById("login").appendChild(wrongCredentialsMessage);
        }
    });
});
