
const Socket = new WebSocket(`ws://${window.location.host}`)

Socket.addEventListener('message', (message) => {
    console.log(`Server : ${message.data}`);
})

Socket.addEventListener('close', () => {
    console.log("Disconnect from Server 🛠️");
})

Socket.addEventListener('open', () => {
    console.log("Connect from Server 👍");
})

setTimeout(() => {
    Socket.send("안녕하세용")
}, 4000);