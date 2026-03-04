import { getExistingShapes } from "./http";
import { Tool } from "../components/Canvas";

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
} | {
    type: "pencil";
    startX: number;
    startY: number;
    endX: number;
    endY: number;
} | {
    type: "diamond";
    startX: number;
    startY: number;
    midX: number;
    midY: number;
    x: number;
    y: number;
} | {
    type: "line";
    startX: number;
    startY: number;
    endX: number;
    endY: number;
}

export class Game {
    //private keyword can be only accessed in class, can't ouside of class
    private canvas: HTMLCanvasElement;
    private ctx: CanvasRenderingContext2D;
    private existingShapes: Shape[];
    private roomId: string;
    private clicked: boolean;
    private startX: number = 0;
    private startY: number = 0;
    private selectedTool: Tool = "mouse";
    private socket: WebSocket;

    constructor(canvas: HTMLCanvasElement, roomId: string, socket: WebSocket) { //necesary props to create Gaamme class
        //constructor is aitomatically called during making class, and make these variables properties for class
        this.canvas = canvas;
        this.ctx = canvas.getContext("2d")!;
        this.existingShapes = [];
        this.roomId = roomId;
        this.socket = socket;
        this.clicked = false;

        //constructor calling these function
        this.init();
        this.initHandlers();
        this.initMouseHandlers();
    }

    //remove method of event listner
    destroy() {
        this.canvas.removeEventListener("mousedown", this.mouseDownHandler)

        this.canvas.removeEventListener("mousemove", this.mouseMoveHandler)

        //when releases mouse button, save shape in db
        this.canvas.removeEventListener("mouseup", this.mouseUpHandler)
    }

    setTool(tool: Tool) {
        this.selectedTool = tool;
    }

    //this function fetch existing shapes, and clear Canvas to show shapes
    async init() {
        this.existingShapes = await getExistingShapes(this.roomId);
        this.clearCanvas();
    }

    //if msg commes, add on existing shape, and then clear & render again
    async initHandlers() {
        this.socket.onmessage = (event) => {
            const message = JSON.parse(event.data);

            if (message.type === "chat") {
                const parsedShape = JSON.parse(message.message);
                this.existingShapes.push(parsedShape.shape);
                this.clearCanvas();
            }
        }
    }

    //(Painter) this func will clear and render existing shapes
    clearCanvas() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height); //clear the canvas
        this.ctx.fillStyle = "#121212"; //redraw black background
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height); //set now

        this.existingShapes.map((shape) => { //redraw all existing shapes
            this.ctx.strokeStyle = "white"; //border white
            this.ctx.lineWidth = 2; //thickness

            //for rectangle
            if (shape.type === "rect") {
                this.ctx.strokeRect(shape.x, shape.y, shape.width, shape.height); //draw new

            } else if (shape.type === "circle") {
                this.ctx.beginPath();
                this.ctx.arc(shape.centerX, shape.centerY, Math.abs(shape.radius), 0, Math.PI * 2);
                this.ctx.stroke();
                this.ctx.closePath();

            } else if(shape.type === "line") {
                this.ctx.beginPath();
                this.ctx.moveTo(shape.startX, shape.startY);
                this.ctx.lineTo(shape.endX, shape.endY);
                this.ctx.stroke();
                this.ctx.closePath();

            } else if(shape.type === "diamond") {
                this.ctx.beginPath();

                this.ctx.moveTo(shape.midX, shape.startY); //Top Point
                this.ctx.lineTo(shape.startX, shape.midY); //Left Point
                this.ctx.lineTo(shape.midX, shape.y); //Bottom Point
                this.ctx.lineTo(shape.x, shape.midY); //Right Point
                this.ctx.lineTo(shape.midX, shape.startY); //Right Mid to Top Mid Point

                this.ctx.stroke();
                this.ctx.closePath();
            }
        })
    }

    //mouse click pe starting x and y positing nikalta hai
    mouseDownHandler = (e: any) => {
        this.clicked = true;
        //starting points
        this.startX = e.offsetX;
        this.startY = e.offsetY;
    }

    //call clearCanvas() continously and draw temporary shape. Isi wajah se shape "khinchta" hua dikhta hai
    mouseMoveHandler = (e: any) => {
        if (this.clicked) {
            const width = e.clientX - this.startX;
            const height = e.clientY - this.startY;

            const selectedTool = this.selectedTool; // Ref se Tool uthao

            this.clearCanvas(); // clear drawings, and make old drawings 
            this.ctx.strokeStyle = "white"; //shape border white

            if (selectedTool === "rect") { //agar rectangular selected hai
                this.ctx.strokeRect(this.startX, this.startY, width, height); //draw new rect

            } else if (selectedTool === "circle") {
                const radius = Math.abs(Math.max(width, height) / 2);
                const centerX = this.startX + (width / 2);
                const centerY = this.startY + (height / 2);

                this.ctx.beginPath();
                this.ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
                this.ctx.stroke();
                this.ctx.closePath();

            } else if (selectedTool === "line") {
                let rect = this.canvas.getBoundingClientRect();
                const x = e.clientX - rect.left;
                let y = e.clientY - rect.top;

                this.ctx.beginPath();
                this.ctx.moveTo(this.startX, this.startY);
                this.ctx.lineTo(x, y);
                this.ctx.stroke();
                this.ctx.closePath();

            } else if (selectedTool === "diamond") {
                const startX = this.startX;
                const startY = this.startY;
                
                let rect = this.canvas.getBoundingClientRect(); //this help us to find x and y position
                const x = e.clientX - rect.left;
                let y = e.clientY - rect.top;

                const midX = (startX + x) / 2; //middile-x point of diamond
                const midY = (startY + y) / 2; //middile-y point of diamond


                this.ctx.beginPath();
                this.ctx.moveTo(midX, startY); //Top Point(top side ka, x axis mid)
                this.ctx.lineTo(startX, midY); //Left Point(left side ka, y axis mid)
                this.ctx.lineTo(midX, y); //Bottom Point(bottom side ka, x axis mid)
                this.ctx.lineTo(x, midY); //Right Point(right side ka, y axis mid)

                this.ctx.lineTo(midX, startY); //Right Mid to Top Mid Point
                this.ctx.stroke();
                this.ctx.closePath();

            } else if (selectedTool === "arrow") {
                let rect = this.canvas.getBoundingClientRect();
                const x = e.clientX - rect.left;
                let y = e.clientY - rect.top;

                this.ctx.beginPath();
                this.ctx.moveTo(this.startX, this.startY);
                this.ctx.lineTo(x, y);
                
                const angle = Math.atan2(y - this.startY, x - this.startX);

                let newX = x-20 * Math.cos(angle - 0.5);
                let newY = y-20 * Math.sin(angle - 0.5);
                this.ctx.lineTo(newX, newY);

                this.ctx.moveTo(x, y);

                newX = x-20 * Math.cos(angle + 0.5);
                newY = y-20 * Math.sin(angle + 0.5);
                this.ctx.lineTo(newX, newY);

                this.ctx.stroke();
                this.ctx.closePath();
            }
        }

    }

    //save the shape when mouse is realeased, and send to backend
    mouseUpHandler = (e: any) => {
        this.clicked = false;
        const width = e.clientX - this.startX;
        const height = e.clientY - this.startY;

        //@ts-ignore
        const selectedTool = this.selectedTool;
        let shape: Shape | null = null;

        if (selectedTool === "rect") {
            shape = {
                type: "rect",
                x: this.startX,
                y: this.startY,
                height,
                width
            }

        } else if (selectedTool === "circle") {
            const radius = Math.abs(Math.max(height, width) / 2);
            shape = {
                type: "circle",
                centerX: this.startX + (width / 2),
                centerY: this.startY + (height / 2),
                radius: radius,
            }
        } else if (selectedTool === "line") {
            let rect = this.canvas.getBoundingClientRect();
            const x = e.clientX - rect.left;
            let y = e.clientY - rect.top;

            shape = { //this will be saved in backend
                type: "line",
                startX: this.startX,
                startY: this.startY,
                endX: x,
                endY: y,
            }

        } else if(selectedTool === "diamond") {

            const startX = this.startX;
            const startY = this.startY;
                
            let rect = this.canvas.getBoundingClientRect(); //this help us to find x and y position
            const x = e.clientX - rect.left;
            let y = e.clientY - rect.top;

            const midX = (startX + x) / 2; //middile-x point of diamond
            const midY = (startY + y) / 2; //middile-y point of diamond

            shape = { //save shape
                type: "diamond",
                startX: startX,
                startY: startY,
                midX: midX,
                midY: midY,
                x: x,
                y: y,
            }
        }

        if (shape) {
            this.existingShapes.push(shape);
            this.socket.send(JSON.stringify({ //send the shape as message
                type: "chat",
                roomId: this.roomId,
                message: JSON.stringify({ shape })
            }))
        }

    }

    initMouseHandlers() {
        this.canvas.addEventListener("mousedown", this.mouseDownHandler)

        this.canvas.addEventListener("mousemove", this.mouseMoveHandler)

        //when releases mouse button, save shape in db
        this.canvas.addEventListener("mouseup", this.mouseUpHandler)
    }
}