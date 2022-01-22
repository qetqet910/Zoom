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

wss.on("connection", (Socket) => {
    console.log("Connect from Browser");
    Socket.send("Welcome to Server!")
    Socket.on("message", (message) => { console.log(`Browser : ${message}`); })
    Socket.on("close", () => { console.log("Disconnect from Browser"); });
})

server.listen(3000, handleListen)