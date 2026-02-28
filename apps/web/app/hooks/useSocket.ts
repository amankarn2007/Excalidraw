import { useEffect, useState } from "react";
import { WS_URL } from "../config";

//this function will make conection for every user with websocket
export function useSocket() {
    const [loading, setLoading] = useState(true);
    const [socket, setSocket] = useState<WebSocket>();

    useEffect(() => {
        //token is for verify user and find userId
        const ws = new WebSocket(`${WS_URL}?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2YTNkMGZmYy1kNjlmLTQ0ZGUtYWU5Mi0yNjBlNjg1ZTQ1YTgiLCJpYXQiOjE3NzIwNDI0NzR9.dvUntObaplRNFKO_eViE3J0VT7t5U0dh3K-LHkgcB18`);

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