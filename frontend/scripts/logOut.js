import { init } from "../script.js";

const loginForm = document.getElementById('login-form');
const documentsContainer = document.getElementById('documents-container');

function renderLogOutBtn() {
    const logOutButton = document.createElement('button');
    logOutButton.classList.add('log-out-button');

    logOutButton.innerText = 'Log Out';

    loginForm.append(logOutButton);

    logOutButton.addEventListener('click', () => {
        documentsContainer.innerHTML = "";
        localStorage.removeItem('user');
        init();
    });
}

export {renderLogOutBtn};