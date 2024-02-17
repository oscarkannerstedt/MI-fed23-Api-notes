import { createUser } from './scripts/createUser.js';
import { renderLoginForm } from './scripts/login.js';


function init() {
    if (localStorage.getItem('user')) {
        console.log('is logged in');
    } else {
        console.log('is not logged in');
        renderLoginForm();
    }
}

init();