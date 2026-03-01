import { HTTP_BACKEND } from "@/config";
import axios from "axios";

type Shape = {
    type: "rect";
    x: number;
    y: number;
    width: number;
    height: number
} | {
    type: "circle";
    centerX: number;
    centerY: number;
    radius: number;
}

//this is the main canvas logic, help to draw sketches
export default async function InitDraw(canvas: HTMLCanvasElement, roomId: string, socket: WebSocket) {
    //@ts-ignore
    const ctx: CanvasRenderingContext2D = canvas.getContext("2d");
    if(!ctx) return;

    let existingShape: Shape[] = await getExistingShapes(roomId); //fetch prev drawings from backend

    //if msg commes, add on existing shape, and then clear & render again
    socket.onmessage = (event) => {
        const message = JSON.parse(event.data);

        if(message.type === "chat"){
            const parsedShape = JSON.parse(message.message);
            existingShape.push(parsedShape.shape);
            clearCanvas(existingShape, canvas, ctx);
        }
    }    

    let clicked = false;
    let startX = 0;
    let startY = 0;

    clearCanvas(existingShape, canvas, ctx); //

    canvas.addEventListener("mousedown", (e) => { //when mouse is clicked
        clicked = true;
        //starting points
        startX = e.offsetX;
        startY = e.offsetY;
    })

    canvas.addEventListener("mouseup", (e) => { //when releases mouse button 
        clicked = false;
        const width = e.clientX - startX;
        const height = e.clientY - startY;

        const shape: Shape = {
            type: "rect",
            x: startX,
            y: startY,
            height,
            width
        }

        existingShape.push(shape);

        socket.send(JSON.stringify({ //send the shape as message
            type: "chat",
            roomId,
            message: JSON.stringify({
                shape
            })
        }))
    })

    canvas.addEventListener("mousemove", (e) => {
        //console.log(e.clientX);
        //console.log(e.clientY);

        if (clicked) {
            const width = e.clientX - startX;
            const height = e.clientY - startY;

            clearCanvas(existingShape, canvas, ctx);

            ctx.strokeStyle = "white"; //Rectangle border white
            ctx.lineWidth = 2; //thickness
            ctx.strokeRect(startX, startY, width, height); //draw new rectangle
        }
    })
}


//this func will clear and render existing shapes
function clearCanvas(existingShape: Shape[], canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D) {

    ctx.clearRect(0, 0, canvas.width, canvas.height); //clear the canvas
    ctx.fillStyle = "#121212"; //redraw black background
    ctx.fillRect(0, 0, canvas.width, canvas.height); //set now

    existingShape.map((shape) => {
        //for rectangle
        if(shape.type === "rect"){
            ctx.strokeStyle = "white"; //border white
            ctx.lineWidth = 2; //thickness
            ctx.strokeRect(shape.x, shape.y, shape.width, shape.height); //draw new
        }
    })    

}

//connect to backend and fetch all existing data and convert into shapes
async function getExistingShapes(roomId: string) {
    const res = await axios.get(`${HTTP_BACKEND}/chats/${roomId}`);
    //console.log(res.data.messages);

    const messages = res.data.messages;

    const shapes = messages.map((x: {message: string}) => {
        const messageData = JSON.parse(x.message);
        //console.log(messageData);
        return messageData.shape;
    })

    return shapes;
}