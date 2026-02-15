import express from "express";
const app = express();
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "@repo/backend-common";
import { isLoggedIn } from "./middleware/isLoggedIn.js";
import {CreateUserSchema} from "@repo/common";

app.use(express.json());

app.get("/", (req, res) => {
    res.send("hii");
})


app.post("/signup", async (req, res) => {
    //const {username, password, firstname, lastname} = req.body;

    const parsedResult = CreateUserSchema.safeParse(req.body);

    if(!parsedResult.success) {
        return res.status(400).json({
            message: "Something is missing",
            error: parsedResult.error
        })
    }

    const {username, password, firstname, lastname} = parsedResult.data;

    try{

        if(!username || !password || !firstname || !lastname){
            return res.status(400).json({
                message: "Enter details first",
            })
        }

        const salt = await bcrypt.genSalt(5);
        const hash = await bcrypt.hash(password, salt);

        const user = {
            username, 
            password: hash, 
            firstname, 
            lastname
        }
        console.log(user);

        return res.status(200).json({
            message: "User registerd successfully",
            user,
        })

    } catch(err) {
        console.log(err);
        return res.json({
            message: "Error in signup endpoint"
        })
    }

})

app.post("/signin", async (req, res) => {
    const {username, password} = req.body;

    try{
        if(!username || !password){
            return res.status(400).json({
                message: "Enter details first",
            })
        }

        const token = await jwt.sign({
            username,
        }, JWT_SECRET)

        const user = {
            username, password
        }
        console.log(user);

        return res.status(200).json({
            message: "User logedin successfully",
            user,
            token
        })

    } catch(err) {
        console.log(err);
        return res.json({
            message: "Error in signup endpoint"
        })
    }

})


app.post("/room", isLoggedIn, (req, res) => {

    res.json({
        message: "middleware worked properly"
    })

})


app.listen(3000, () => {
    console.log("listning on port 3000");
});