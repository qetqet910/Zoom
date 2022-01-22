import express from "express";
import http from "http";
import WebSocket, { WebSocketServer } from "ws";

const app = express();

app.set("view engine", "pug")
app.set("views", __dirname + "/views")
app.use("/public", express.static(__dirname + "/public"))
app.get("/", (_, res) => res.render("index"))
app.get("/*", (_, res) => res.redirect("/"))

const handleListen = () => console.log(`Listening on http://localhost:3000`);

const server = http.createServer(app)
const wss = new WebSocketServer({ server })

const fakeDB = []

wss.on("connection", (Socket) => {
    fakeDB.push(Socket);
    console.log("Connect from Browser");
    Socket["Nickname"] = "익명"
    Socket.on("message", (message) => {
        const msg = JSON.parse(message);
        switch (msg.type) {
            case "Nick":
                Socket["Nickname"] = msg.payload
            case "Chat":
                fakeDB.forEach((SocketF) =>
                    SocketF.send(`${Socket.Nickname} : ${msg.payload}`)
                );
        }
    })
    Socket.on("close", () => { console.log("Disconnect from Browser"); });
})

server.listen(3000, handleListen)