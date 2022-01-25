
const Socket = new WebSocket(`ws://${window.location.host}`)

const ChatList = document.querySelector('.chatList');
const ChatForm = document.querySelector('.chatForm');
const NickForm = document.querySelector('.NickForm');
const NickB = document.querySelector('.Nick');
const ChatB = document.querySelector('.Chat');
const Modal = document.querySelector(".modal")
const CloseBtn = document.querySelector(".close");
const ChatTle = document.querySelector(".ChatTle");
const Complete = document.querySelector(".Complete");

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
    Modal.classList.remove("Active");
    Complete.classList.toggle("Active");
    setTimeout(() => {
        Complete.classList.remove("Active");
    }, 2000)
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



const NickBEvent = (event) => {
    event.preventDefault();
    Modal.classList.toggle("Active")
}

const ChatBEvent = (event) => {
    event.preventDefault();
    ChatTle.classList.toggle("Active")
}

NickB.addEventListener("click", NickBEvent)
ChatB.addEventListener("click", ChatBEvent)
CloseBtn.addEventListener("click", () => {
    Modal.classList.remove("Active")
})