"use client";
import { useEffect, useState } from "react";
import { WS_URL } from "@/config";
import Canvas from "./Canvas";


export default function RoomCanvas({roomId}:{roomId: string}) {

    const [socket, setSocket] = useState<WebSocket | null>(null);

    //connect to our ws server, so we can send & receive shapes
    useEffect(() => { //this useEffect will join us to ws
        const ws = new WebSocket(`${WS_URL}?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI5ZTllMGM5Zi00YTdkLTRlYTYtOTUwYS1lZWQzNTkwZWYzM2UiLCJpYXQiOjE3NzIzNzk5OTd9.sxmy2Z-1RQq4hGV8lbwsyd5f7M_cZGVXlCuJjEiNGr0`);

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