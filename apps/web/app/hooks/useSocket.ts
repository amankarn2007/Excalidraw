import { useEffect, useState } from "react";
import { WS_URL } from "../config";

//this function will make conection for every user with websocket
export function useSocket() {
    const [loading, setLoading] = useState(true);
    const [socket, setSocket] = useState<WebSocket>();

    useEffect(() => {
        //token is for verify user and find userId
        const ws = new WebSocket(`${WS_URL}?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI5ZTllMGM5Zi00YTdkLTRlYTYtOTUwYS1lZWQzNTkwZWYzM2UiLCJpYXQiOjE3NzIzNzk5OTd9.sxmy2Z-1RQq4hGV8lbwsyd5f7M_cZGVXlCuJjEiNGr0`);

        ws.onopen = () => {
            setLoading(false);
            setSocket(ws);
        }

        ws.onclose = () => {
            console.log("Disconnected");
        }

        return () => ws.close();
    }, [])

    return {
        socket,
        loading
    }

}