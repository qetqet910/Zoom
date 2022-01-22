
const Socket = new WebSocket(`ws://${window.location.host}`)

const ChatList = document.querySelector('.chatList');
const ChatForm = document.querySelector('.chatForm');
const NickForm = document.querySelector('.NickForm');

const MakeMessage = (type, payload) => {
    const msg = { type, payload };
    return JSON.stringify(msg);
}

const ChatFormFn = (event) => {
    event.preventDefault();
    const ChatInput = ChatForm.querySelector('input');
    Socket.send(MakeMessage("Chat", ChatInput.value))
    ChatInput.value = "";
}

const NickFormFn = (event) => {
    event.preventDefault();
    const NickInput = NickForm.querySelector('input');
    Socket.send(MakeMessage("Nick", NickInput.value));
    NickInput.value = "";
}

ChatForm.addEventListener('submit', ChatFormFn)
NickForm.addEventListener('submit', NickFormFn)

Socket.addEventListener('message', (message) => {
    const li = document.createElement('li');
    li.innerText = `${message.data}`;
    ChatList.appendChild(li);
})

Socket.addEventListener('close', () => {
    console.log("Disconnect from Server 🛠️");
})

Socket.addEventListener('open', () => {
    console.log("Connect from Server 👍");
})
