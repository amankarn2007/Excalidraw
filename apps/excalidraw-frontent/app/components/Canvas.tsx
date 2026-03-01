import { useEffect, useRef, ReactNode } from "react";
import InitDraw from "../draw";

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
        <div>
            <canvas ref={canvasRef} width={1530} height={725} style={{border: "1px solid #000"}}></canvas>
            
            <div className="absolute top-5 place-self-center bg-[#232329] flex text-white gap-3 py-1 px-3 rounded-lg items-center">
                <IconElem iconName="arrow_selector_tool" />
                <IconElem iconName={"rectangle"} />
                <IconElem fontIcon={<i className="fa-solid fa-diamond"></i>} />
                <IconElem iconName={"circle"} />
                <IconElem iconName="arrow_right_alt" />
                <IconElem iconName="check_indeterminate_small" />
                <IconElem iconName="stylus" />
                <IconElem iconName="text_format" />
            </div>
        </div>
    )
}

interface IconProps {
    iconName?: string,
    fontIcon?: ReactNode
}

function IconElem({iconName, fontIcon}: IconProps) {
    return (
        <div className="hover:bg-[#7a77a3] px-2 py-1 rounded-lg cursor-pointer">
            {iconName && 
                <span className="material-symbols-outlined text-lg! opacity-80">{iconName}</span>
            }
            
            {fontIcon && 
                <div>{fontIcon}</div>
            }
        </div>
    )
}