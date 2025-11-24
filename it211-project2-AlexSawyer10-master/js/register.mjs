export let userInfo = JSON.parse(localStorage.getItem("userInfo")) || {}; /*if null, set it to empty.*/

document.addEventListener("DOMContentLoaded", () =>
{
    document.getElementById("register-form").addEventListener("submit", (e) =>
    {
        e.preventDefault(); /*dont allow page refresh here*/

        const email = document.getElementById("email").value;

        const password = document.getElementById("password").value;

        const zipcode = document.getElementById("zip-code").value;

        let usersArray = JSON.parse(localStorage.getItem("userInfo")) || [];

        const findUser = usersArray.find(userInfo => userInfo.email === email); /*https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/find refer to find syntax*/

        if(findUser) /*meaning if there is already a user registered with this email within localstorage*/
        {
            const checkIfInvalidMessage = document.querySelector('h3');
            if(checkIfInvalidMessage) /*here im getting rid of the old message so they dont stack up*/
            {
                checkIfInvalidMessage.remove();
            }

            const wrongCredentialsMessage = document.createElement('h3')
            wrongCredentialsMessage.textContent = `This email is already registered`;
            wrongCredentialsMessage.classList.add('text-danger');
            wrongCredentialsMessage.classList.add('mt-5');


            document.getElementById("register-title").appendChild(wrongCredentialsMessage);
        }
        else
        {
            usersArray.push({email,password,zipcode});

            /*no need for validation i think because the html form already does that*/
            localStorage.setItem('userInfo', JSON.stringify(usersArray));

            const checkIfInvalidMessage = document.querySelector('h3');
            if(checkIfInvalidMessage) /*here im getting rid of the old message so they dont stack up*/
            {
                checkIfInvalidMessage.remove();
            }

            const wrongCredentialsMessage = document.createElement('h3')
            wrongCredentialsMessage.textContent = `Valid registration! Redirecting you to the login page`;
            wrongCredentialsMessage.classList.add('text-success');

            document.getElementById("register-title").appendChild(wrongCredentialsMessage);

            window.location.href = '../html/home.html';

            document.cookie = `loggedInUser=${email}`

        }


    });
});