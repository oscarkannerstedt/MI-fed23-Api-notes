import { init } from "../script.js";

const loginForm = document.getElementById('login-form');

function renderLogOutBtn() {
    const logOutButton = document.createElement('button');
    logOutButton.classList.add('log-out-button');

    logOutButton.innerText = 'logga ut';

    loginForm.append(logOutButton);

    logOutButton.addEventListener('click', () => {
        localStorage.removeItem('user');
        init();
    });
}

export {renderLogOutBtn};