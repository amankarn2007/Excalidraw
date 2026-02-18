import express from "express";
const app = express();
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "@repo/backend-common";
import { isLoggedIn } from "./middleware/isLoggedIn.js";
import {CreateRoomSchema, CreateUserSchema, SigninSchema} from "@repo/common";
import { prismaClient } from "@repo/db/client";

app.use(express.json());



app.get("/", (req, res) => {
    res.send("hii");
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
            return res.status(400).json({
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
        console.log("ERROR IN SIGNUP ENDPOINT")
        return res.json({
            message: "Error in signup endpoint"
        })
    }

})


app.post("/signin", async (req, res) => {

    const parsedData = await SigninSchema.safeParse(req.body);

    if(!parsedData.success){
        return res.json({
            status: 401,
            message: "Can't parse the data"
        })
    }

    try{
        const { email, password } = parsedData.data;

        const user = await prismaClient.user.findUnique({
            where: {
                email
            }
        })

        if(!user) return res.status(400).json("Can't find user");
   
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


app.listen(3000, () => {
    console.log("listning on port 3000");
});