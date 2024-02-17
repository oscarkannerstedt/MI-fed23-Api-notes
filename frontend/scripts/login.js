const loginForm = document.getElementById('login-form');

function renderLoginForm() {
    const emailInput = document.createElement('input');
    const passwordInput = document.createElement('input');
    const logInUserButton = document.createElement('button');
    logInUserButton.classList.add('log-in-button')

    emailInput.placeholder = 'Email';
    passwordInput.placeholder = 'Password';

    passwordInput.type = 'password';
    emailInput.type = 'email';

    loginForm.innerHTML = `<h2>Login</h2>`;
    logInUserButton.innerText = "login";

    loginForm.append(emailInput, passwordInput, logInUserButton);

    logInUserButton.addEventListener("click", () => {
        if (
            emailInput.value === '' ||
            passwordInput.value === '' ||
            !emailInput.value.match('[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,}$')
        ) {
            console.log('You must fill in the fields correctly');
            return;
        }

        let user = {
            userEmail: emailInput.value,
            userPassword: passwordInput.value,
        };
        logInUser(user);
    });
};

async function logInUser(user) {
    await fetch('http://localhost:3000/users/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(user),
    })
    .then((res) => {
        if (res.status === 200) {
            return res.json();
        } else if (res.status === 404) {
            throw new Error("User not found in database");
        } else {
            throw new Error("Failed logged in");
        }
    })
    .then((loggedUser) => {
            localStorage.setItem('user', JSON.stringify(loggedUser));
            console.log("Succesfully logged in");
            loginForm.innerHTML = "";
            // init();
    })
    .catch((err) => {
        console.log('Failed logged in', err);
    })
}

export {renderLoginForm};