"use client";
import { useEffect, useState } from "react";
import { WS_URL } from "@/config";
import Canvas from "./Canvas";


export default function RoomCanvas({roomId}:{roomId: string}) {

    const [socket, setSocket] = useState<WebSocket | null>(null);

    //connect to our ws server, so we can send & receive shapes
    useEffect(() => { //this useEffect will join us to ws
        const token = localStorage.getItem("token");
        console.log(token);

        const ws = new WebSocket(`${WS_URL}?token=${token}`);

        ws.onopen = () => {
            setSocket(ws);
            
            ws.send(JSON.stringify({
                type: "join_room",
                roomId: roomId,
            }))
        }
    }, [])

    
    if(!socket) {
        return (
            <div>Connecting to server...</div>
        )
    }

    //after connecting to ws server, render Canvas component
    return (
        <div className="">
            <Canvas roomId={roomId} socket={socket} />
        </div>
    )
}