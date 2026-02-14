import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import {JWT_SECRET} from "@repo/backend-common"

export const isLoggedIn = async (req: Request, res: Response, next: NextFunction) => {

    try{        
        const token = req.headers.authorization;
        //console.log(token)

        if(!token){
            return res.status(400).json({
                message: "you have to login first",
            })
        }

        const decoded = await jwt.verify(token, JWT_SECRET);

        if(decoded){
            //@ts-ignore
            req.userId = decoded.userId;
            next();
        } else{
            return res.status(401).json({
                message: "you are not authorised",
            })
        }

    } catch(err){
        console.log(err);
        res.send("Error");
    }
}