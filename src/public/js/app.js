const Socket = io();

const ChatForm = document.querySelector(".Room");
const NameForm = document.querySelector(".Name");

let RN;
NameForm.hidden = true;

function EnterRoomFunc() {
    ChatForm.hidden = true;
    NameForm.hidden = false;
    const RoomName = document.querySelector(".RoomName");
    RoomName.innerText = `Room : ${RN}`;
}

ChatForm.addEventListener("submit", (event) => {
    event.preventDefault()
    const input = ChatForm.querySelector('input');
    RN = input.value
    Socket.emit("enter_room", input.value, EnterRoomFunc())
    input.value = "";
}, false)