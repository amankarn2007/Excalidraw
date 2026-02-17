import { WebSocketServer } from "ws";
const wss = new WebSocketServer({ port: 8080 });
import jwt from "jsonwebtoken";
const JWT_SECRET = "iajsfdlikj@#";
wss.on("connection", async function connection(ws, request) {
    const url = request.url; // ws://localhost:3000?token=123123
    // ["ws://localhost:3000", "token=123123"]
    if (!url)
        return;
    const queryParams = new URLSearchParams(url.split('?')[1]);
    const token = queryParams.get('token');
    //@ts-ignore
    const decoded = await jwt.decode(token, JWT_SECRET);
    if (!decoded || !decoded.userId) {
        ws.close();
        return;
    }
    if (decoded) {
        console.log("Decoded value is true");
    }
    console.log("Decoded value is false");
    ws.on("message", (message) => {
        ws.send("PONG");
    });
});
