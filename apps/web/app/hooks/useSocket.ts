import { useEffect, useState } from "react";
import { WS_URL } from "../config";

//conection with websocket
export function useSocket() {
    const [loading, setLoading] = useState(true);
    const [socket, setSocket] = useState<WebSocket>();

    useEffect(() => {
        const ws = new WebSocket(WS_URL);

        ws.onopen = () => {
            setLoading(false);
            setSocket(ws);
        }

        ws.onclose = () => {
            console.log("Disconnected");
        }

        return () => {
            ws.close();
        }
    }, [])

    return {
        socket,
        loading
    }

}