const createUserForm = document.getElementById('create-user-form');
const createUserButton = document.getElementById('create-user-btn');
const userNameInput = document.getElementById('create-user-name');
const userEmailInput = document.getElementById('create-user-email');
const userPasswordInput = document.getElementById('create-user-password');


function renderCreateUserForm() {
    createUserForm.style.display = 'block';
}

function hideCreateUserForm() {
    createUserForm.style.display = 'none';
}

createUserButton.addEventListener("click", () => {
    console.log("click on createUserButton");

    if (
        userNameInput.value === '' ||
        userEmailInput.value === '' ||
        userPasswordInput.value === '' ||
        !userEmailInput.value.match('[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,}$')
      ) {
        console.log("You must fill in the fields correctly");
        return;
      }

    const newUser = {
        userName: userNameInput.value,
        userEmail: userEmailInput.value,
        userPassword: userPasswordInput.value,
    };

    createUser(newUser);
    userNameInput.innerHTML = '';
    userEmailInput.innerHTML = '';
    userPasswordInput.innerHTML = '';

});

async function createUser(newUser) {
    await fetch('http://localhost:3000/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newUser),
    })
    .then((res) => res.json());
    console.log('User created');
}


export {createUser, renderCreateUserForm, hideCreateUserForm};