import { createUser } from './scripts/createUser.js';
import { renderLoginForm } from './scripts/login.js';
import { renderLogOutBtn } from './scripts/logOut.js';


function init() {
    if (localStorage.getItem('user')) {
        console.log('is logged in');
        renderLogOutBtn();
    } else {
        console.log('is not logged in');
        renderLoginForm();
    }
}

init();

export {init};