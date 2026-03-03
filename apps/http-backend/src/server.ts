import express from "express";
const app = express();
import bcrypt from "bcrypt";
import cors from "cors"
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "@repo/backend-common";
import { isLoggedIn } from "./middleware/isLoggedIn.js";
import {CreateRoomSchema, CreateUserSchema, SigninSchema} from "@repo/common";
import { prismaClient } from "@repo/db/client";

app.use(express.json());
app.use(cors())


app.get("/", (req, res) => {
    res.send("hiiiiiiiiiiiiiiiiiiiiiiiiiiiiii");
})

app.post("/signup", async (req, res) => {

    const parsedResult = CreateUserSchema.safeParse(req.body);

    if(!parsedResult.success) {
        return res.status(400).json({
            message: "Something is missing",
            error: parsedResult.error
        })
    }

    try{
        const {email, password, name, photo} = parsedResult.data;

        const salt = await bcrypt.genSalt(5);
        const hash = await bcrypt.hash(password, salt);

        const findUser = await prismaClient.user.findUnique({
            where: {
                email
            }
        })

        if(findUser) {
            return res.status(409).json({
                message: "User already exists"
            })
        }

        const user = await prismaClient.user.create({
            data: {
                email,
                password: hash,
                name,
                photo
            }
        })
        console.log(user);

        return res.status(200).json({
            message: "User registerd successfully",
            user,
        })

    } catch(err) {
        //console.log(err);
        console.log("ERROR IN SIGNUP ENDPOINT", err);
        return res.json({
            message: "Error in signup endpoint",
            err,
        })
    }

})


app.post("/signin", async (req, res) => {

    const parsedData = await SigninSchema.safeParse(req.body);

    if(!parsedData.success){
        return res.json({
            status: 400,
            message: "Something is missing"
        })
    }

    try{
        const { email, password } = parsedData.data;

        const user = await prismaClient.user.findUnique({
            where: {
                email
            }
        })
        if(!user) return res.status(404).json("Can't find user");
   
        const result = await bcrypt.compare(password, user.password);
        if(!result) {
            return res.status(401).json({
                message: "Wrong password",
            })
        }
        
        const token = await jwt.sign({
            userId: user.id
        }, JWT_SECRET)

        return res.status(200).json({
            message: "User loged in successfully",
            token
        })

    } catch(err) {
        console.log(err);
        return res.json({
            message: "Error in signin endpoint"
        })
    }

})


app.post("/room", isLoggedIn, async (req, res) => {

    const parsedData = CreateRoomSchema.safeParse(req.body);

    if(!parsedData.success){
        console.log(parsedData.error);
        return res.json({
            message: "Incorrect inputs"
        })
    }

    //@ts-ignore
    const userId = req.userId;
    //console.log(userId);

    try {
        const findRoom = await prismaClient.room.findFirst({
            where: {
                slug: parsedData.data.name
            }
        })

        if(findRoom) {
            return res.status(400).json({
                message: "Room already created",
                Room: findRoom.id
            })
        }

        const room = await prismaClient.room.create({
            data: {
                slug: parsedData.data.name,
                adminId: userId,
            }
        })
        console.log(room);

        res.json({
            roomId: room.id
        })

    } catch(e) {
        console.log(e);
        return res.status(411).json({
            message: "Error creating room"
        })
    }

})

app.get("/chats/:roomId", async (req, res) => { //send latest 50 msgs
    const roomSlug = req.params.roomId; //'testing'

    try{
        const room = await prismaClient.room.findFirst({
            where: { slug: roomSlug }
        });
        //console.log(room?.id);

        //@ts-ignore
        if (!room.id) {
            return res.status(404).json({ message: "Room not found" });
        }

        const messages = await prismaClient.chat.findMany({
            where: {
                roomId: Number(room?.id)
            },
            orderBy: {
                id: "desc"
            },
            take: 200, //shows 50 messages only
        })
        //console.log(messages);

        return res.status(200).json({
            messages: messages
        })
    } catch(err) {
        console.log("Error catch in chats route", err);
        return res.status(401).json({
            message: "Error"
        })
    }
})

app.get("/room/:slug", async (req, res) => { //this will find the roomId with the help of slug
    try{
        const slug = req.params.slug;
        //console.log(slug);
    
        const room = await prismaClient.room.findFirst({
            where: {
                slug: slug,
            }
        })
    
        console.log("Room found in DB", room)

        if (!room) {
            return res.status(404).json({
                message: "Room not found"
            });
        }
    
        return res.status(200).json({ //returned roomId
            room: room,
        })
    } catch(err) {
        console.log(err);
        return res.send("Error in Backend");
    }
})

app.get("/rooms", isLoggedIn, async (req, res) => {
    try {
        //@ts-ignore
        const userId = req.userId;
        const rooms = await prismaClient.room.findMany({
            where: {
                adminId: userId,
            }
        })
        //console.log(rooms);

        res.status(201).json({
            rooms: rooms
        })

    } catch (err) {
        res.status(401).json({
            message: "Can't find user's room",
        })
        console.log(err);
    }
})

app.delete("/room/:id", isLoggedIn, async (req, res) => {
    try {
        //@ts-ignore
        const userId = req.userId;
        const roomName = req.params.id;
        if(roomName === null) return;

        const room = await prismaClient.room.findFirst({
            where: {
                //@ts-ignore
                slug: roomName,
                adminId: userId
            }
        })
        if(!room || room === undefined) return;
        const roomId = room.id;


        //if one fails, both will data will be safe
        await prismaClient.$transaction([
            prismaClient.chat.deleteMany({ //deleting chat
                where: {
                    roomId: roomId,
                }
            }),
            prismaClient.room.delete({ //deleting room
                where: {
                    //@ts-ignore
                    slug: roomName,
                    adminId: userId,
                }
            })
        ])
        
        res.status(202).json({
            message: "Room deleted successfullly",
        })

    } catch (err) {
        res.status(401).json({
            message: "Can't delete user's room",
        })
        console.log(err);
    }
})

app.listen(3001, () => {
    console.log("listning on port 3001");
});