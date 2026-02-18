import WebSocket, { WebSocketServer } from "ws";
const wss = new WebSocketServer({port: 8080});
import jwt, { JwtPayload } from "jsonwebtoken";
import { JWT_SECRET } from "@repo/backend-common";

interface User {
    ws: WebSocket,
    rooms: string[],
    userId: string
}

const users: User[] = []; //store all users

function checkUser(token: string): string | null { //check jwt token
    try{
        //@ts-ignore
        const decoded = jwt.verify(token, JWT_SECRET);
    
        if(typeof decoded === 'string'){
            return null;
        }
    
        if(!decoded || !decoded.email){
            return null;
        }
    
        return decoded.email; //this func will return email

    } catch(e) {
        console.log("ERROR in check User");
        return null;
    }
}


wss.on("connection", async function connection(ws, request){
    const url = request.url; // ws://localhost:3000?token=123123
    if(!url) return;

    const queryParams = new URLSearchParams(url.split('?')[1]);
    const token = queryParams.get('token')
    if(!token) return;

    const userId = checkUser(token); //verify user

    if(userId == null) {
        ws.close();
        return null;
    }

    users.push({ //store in global var
        userId,
        rooms: [],
        ws
    })


    ws.on("message", function message(data) { //handle msg

       const parsedData = JSON.parse(data as unknown as string);
        //parsedData = { "type": "join_room", "roomId": "room1", "message": "hi there" }

       if(parsedData.type === 'join_room') {
            const user = users.find(x => x.ws === ws); //find user

            user?.rooms.push(parsedData.roomId); //add user's roomId in room
        }

       if(parsedData.type === 'leave_room') {
            const user = users.find(x => x.ws === ws); //find user
            if(!user) return;

            user.rooms = user?.rooms.filter(x => x !== parsedData.roomId); //remove user roomId
        }

        if(parsedData.type === "chat") {
            //console.log("CHAT RECEIVED:", parsedData);
            
            const roomId = parsedData.roomId; //roomId
            const message = parsedData.message; //msg

            users.forEach(user => { //traverse on users

                if(user.rooms.includes(roomId)){ //if roomId matche's

                    user.ws.send(JSON.stringify({ //then send msg
                        type: "chat",
                        message: message,
                        roomId
                    }))
                }
            })
        }

    })
})