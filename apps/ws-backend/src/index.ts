import WebSocket, { WebSocketServer } from "ws";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "@repo/backend-common";
import { prismaClient } from "@repo/db/client";

const wss = new WebSocketServer({port: 8080});

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
        //console.log(decoded);
        
        if(typeof decoded == 'string'){
            return null;
        }
    
        if(!decoded || !decoded.userId){
            return null;
        }
    
        return decoded.userId; //this func will return email

    } catch(e) {
        console.log("ERROR in check User");
        return null;
    }
}


wss.on("connection", async function connection(ws, request){
    const url = request.url; // ws://localhost:8080?token=123123
    if(!url) return;

    const queryParams = new URLSearchParams(url.split('?')[1]);
    const token = queryParams.get('token')
    if(!token) return;

    const userId = checkUser(token); //verify user and return's userId
    console.log(userId);

    if(!userId) {
        ws.close();
        return null;
    }

    users.push({ //store in global var
        userId,
        rooms: [],
        ws
    })


    ws.on("message", async function message(data) { //handle msg
        try{
            let parsedData: any;

            const messageString = data.toString();
            parsedData = JSON.parse(messageString); //buffer to string
            //parsedData = { "type": "join_room","roomId": "room1", "message": "hi there" }


            if (parsedData.type === 'join_room') {
                const user = users.find(x => x.ws === ws); //find user

                user?.rooms.push(parsedData.roomId); //add user's roomId in room
                //console.log("join: " + user?.rooms)
            }

            if (parsedData.type === 'leave_room') {
                const user = users.find(x => x.ws === ws); //find user
                if (!user) return;

                user.rooms = user?.rooms.filter(x => x !== parsedData.roomId); //remove user roomId
                console.log("leaved: " + user.rooms)
            }

            if (parsedData.type === "chat") {
                //console.log("CHAT RECEIVED:", parsedData);

                const roomSlug = parsedData.roomId; //roomSlug, find roomId
                const message = parsedData.message; //msg

                if(!message) {
                    console.log("Message missing in payload");
                    return;
                }

                const room = await prismaClient.room.findFirst({
                    where: {
                        slug: roomSlug
                    }
                })
                //console.log(room);

                if(!room) {
                    console.log("Can't find room");
                    return;
                }

                await prismaClient.chat.create({ //store chat in db
                    data: {
                        message: message,
                        roomId: room.id,
                        userId: userId,
                    }
                })

                users.forEach(user => { //traverse on users
                    //console.log(users.length);

                    //@ts-ignore
                    if (user.rooms.includes(room.id)) { //if roomId matche's

                        user.ws.send(JSON.stringify({ //then send msg
                            type: "chat",
                            message: message,
                            roomId: room.id
                        }))
                    }
                })
            }
        } catch (err) {
            console.log("Error in WebSoclet message event handle", err)
        }

    })
})