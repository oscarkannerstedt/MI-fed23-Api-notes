import { createUser, renderCreateUserForm, hideCreateUserForm } from './scripts/createUser.js';
import { renderLoginForm } from './scripts/login.js';
import { renderLogOutBtn } from './scripts/logOut.js';
import { showEditor } from './scripts/documentEditor.js';


function init() {
    if (localStorage.getItem('user')) {
        console.log('is logged in');
        renderLogOutBtn();
        hideCreateUserForm();
        // showEditor();
    } else {
        console.log('is not logged in');
        renderLoginForm();
        renderCreateUserForm();
    }
}

init();

export {init};