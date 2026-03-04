import { useEffect, useRef, useState } from "react";
import IconButton from "./canvas/IconButton";
import { Game } from "../draw/Game";

export type Tool = "mouse" | "rect" | "diamond" | "circle" | "arrow" | "line" | "pencil" | "text";

// pencil, eraser and zooming functionallity remains
export default function Canvas({ roomId, socket }: { roomId: string, socket: WebSocket }) {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [selectedTool, setSelectedTool] = useState<Tool>("mouse"); //topbar selected tool
    const [game, setGame] = useState<Game>(); 

    //if tool changeed, inform game
    useEffect(() => { 
        game?.setTool(selectedTool); //set tool in game class
    }, [selectedTool]);

    //useEffect will attach eventListner
    useEffect(() => {
        if (canvasRef.current) {
            const g = new Game(canvasRef.current, roomId, socket)
            setGame(g);

            return () => { //cleanup
                g.destroy();
            }
        }
    }, [socket]);

    return (
        <div className="fixed overflow-hidden">
            <canvas ref={canvasRef} width={window.innerWidth} height={window.innerHeight}></canvas>

            <Topbar selectedTool={selectedTool} setSelectedTool={setSelectedTool} />
        </div>
    )
}

function Topbar({selectedTool, setSelectedTool}: {
    selectedTool: Tool,
    setSelectedTool: (s: Tool) => void,
}) {
    return (
        <div className="absolute top-5 place-self-center bg-[#232329] flex text-white gap-3 py-1 px-3 rounded-lg items-center">
            <IconButton
                onClick={() => setSelectedTool("mouse")} //set type as 'mouse'
                iconName="arrow_selector_tool"
                isActive={selectedTool === "mouse"} //true | false for this elm
            />
            <IconButton
                onClick={() => setSelectedTool("rect")}
                iconName={"rectangle"}
                isActive={selectedTool === "rect"}
            />
            <IconButton
                onClick={() =>setSelectedTool("diamond")}
                fontIcon={<i className="fa-solid fa-diamond"></i>}
                isActive={selectedTool === "diamond"}
            />
            <IconButton
                onClick={() =>setSelectedTool("circle")}
                iconName={"circle"}
                isActive={selectedTool === "circle"}
            />
            <IconButton
                onClick={() =>setSelectedTool("arrow")}
                iconName="arrow_right_alt"
                isActive={selectedTool === "arrow"}
            />
            <IconButton
                onClick={() =>setSelectedTool("line")}
                iconName="check_indeterminate_small"
                isActive={selectedTool === "line"}
            />
            <IconButton
                onClick={() =>setSelectedTool("pencil")}
                iconName="stylus"
                isActive={selectedTool === "pencil"}
            />
            <IconButton
                onClick={() =>setSelectedTool("text")}
                iconName="text_format"
                isActive={selectedTool === "text"}
            />
        </div>
    )
}