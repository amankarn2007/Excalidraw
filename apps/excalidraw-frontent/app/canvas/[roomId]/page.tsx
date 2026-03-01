"use client";
import InitDraw from "@/app/draw";
import { useEffect, useRef } from "react"


export default function Canvas() {
    
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        if(canvasRef.current) {
            
            InitDraw(canvasRef.current); //
        }

    }, [canvasRef])
    
    return (
        <div>
            <canvas ref={canvasRef} width={1530} height={725} style={{border: "1px solid #000"}}></canvas>
        </div>
    )
}