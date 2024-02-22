import { createUser, renderCreateUserForm } from './scripts/createUser.js';
import { renderLoginForm } from './scripts/login.js';
import { renderLogOutBtn } from './scripts/logOut.js';
import { showEditor } from './scripts/documentEditor.js';
import { fetchUserDocuments, renderUserDocuments } from './scripts/documents.js';


function init() {
    const storedUser = JSON.parse(localStorage.getItem('user'));

    if (storedUser && storedUser.user && storedUser.user.userId) {
        const userId = storedUser.user.userId;
        console.log('User is logged in', storedUser);
        renderLogOutBtn();
        renderUserDocuments(userId);
    } else {
        console.log('User is not logged in');
        renderLoginForm();
        renderCreateUserForm();
    }
}

init();

export {init};