import { createUser, renderCreateUserForm } from './scripts/createUser.js';
import { renderLoginForm } from './scripts/login.js';
import { renderLogOutBtn } from './scripts/logOut.js';
import { showEditor } from './scripts/documentEditor.js';
import { fetchUserDocuments, renderUserDocuments } from './scripts/documents.js';


function init() {
    const user = JSON.parse(localStorage.getItem('user'));
    console.log(user);
    if (user) {
        console.log('User is logged in');
        renderLogOutBtn();
        renderUserDocuments(user.userId);
    } else {
        console.log('User is not logged in');
        renderLoginForm();
        renderCreateUserForm();
    }
}

init();

export {init};