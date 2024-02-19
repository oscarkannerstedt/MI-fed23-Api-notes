function renderCreateUserForm() {
    const createUserForm = document.getElementById('create-user-form');
    const userNameInput = document.createElement('input');
    const userEmailInput = document.createElement('input');
    const userPasswordInput = document.createElement('input');
    const createUserButton = document.createElement('button');
    createUserButton.classList.add('log-in-button');

    userEmailInput.placeholder = 'Email';
    userPasswordInput.placeholder = 'Password';
    userNameInput.placeholder = "Name";

    userPasswordInput.type = 'password';
    userEmailInput.type = 'email';
    userNameInput.type = "text";

    createUserForm.innerHTML = `<h2>Create User</h2>`;
    createUserButton.innerText = "Create user";

    createUserForm.append(userNameInput, userEmailInput, userPasswordInput, createUserButton);


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
}

async function createUser(newUser) {
    await fetch('http://localhost:3000/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newUser),
    })
    .then((res) => res.json());
    console.log('User created');
}


export {createUser, renderCreateUserForm};