import { useEffect, useRef } from "react";
import InitDraw from "../draw";
import Tools from "./canvas/Tools";

export default function Canvas({roomId, socket}: {roomId: string, socket: WebSocket}) {
    
    const canvasRef = useRef<HTMLCanvasElement>(null);
    
    //useEffect will attach eventListner
    useEffect(() => {
        if(canvasRef.current) {
            console.log("InitDraw called")
            InitDraw(canvasRef.current, roomId, socket); //trigger when 
        }

    }, [socket]);

    return (
        <div className="fixed overflow-hidden">
            <canvas ref={canvasRef} width={window.innerWidth} height={window.innerHeight}></canvas>
            <Tools />
        </div>
    )
}

