const Socket = io();

const ChatForm = document.querySelector(".Room");
const NameForm = document.querySelector(".Name");
const RoomName = document.querySelector(".RoomName");

NameForm.hidden = true;

console.log(ChatForm, NameForm, RoomName);

const EnterRoomFunc = (RN) => {
    ChatForm.hidden = true;
    NameForm.hidden = false;
    RoomName.innerText = `Room : ${RN}`;
}

ChatForm.addEventListener("submit", (event) => {
    event.preventDefault()
    const input = ChatForm.querySelector('input');
    Socket.emit("EnterRoom", { payload: input.value }, EnterRoomFunc(input.value))
    input.value = "";
}, false)