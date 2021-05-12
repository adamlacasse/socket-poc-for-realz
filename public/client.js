const socket = io();

const user = {};

const buzzerBtn = document.getElementById('buzzer-button');
buzzerBtn.addEventListener('click', () => {
    user.id = socket.id;
    user.time = new Date().toLocaleTimeString('en-US');
    socket.emit('buzz', user);
});

const buzzerList = document.getElementById('buzzer-list');

socket.on('newBuzzer', (arg) => {
    console.log('got this from the server:')
    console.log(arg);

    const li = document.createElement('li');
    li.innerText = `${arg.name} (${arg.id})`;
    buzzerList.append(li);
});

const addUserForm = document.getElementById('add-user-form');
const addUserInput = document.getElementById('add-user-input');
const userGreeting = document.getElementById('user-greeting');

addUserForm.onsubmit = (e) => {
    e.preventDefault();
    console.log(addUserInput.value);
    user.name = addUserInput.value;
    addUserForm.style.display = 'none';

    userGreeting.innerText = `Hi, ${user.name}`
};
