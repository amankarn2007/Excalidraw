import { WebSocketServer } from "ws";
const wss = new WebSocketServer({port: 8080});


wss.on("connection", function connection(ws, request){
    const url = request.url;
    if(!url) return;


    ws.on("message", (message) => {
        ws.send("PONG");
    })
})