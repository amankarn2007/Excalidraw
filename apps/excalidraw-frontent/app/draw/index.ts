

export default function InitDraw(canvas: HTMLCanvasElement) {
    //@ts-ignore
    const ctx: CanvasRenderingContext2D = canvas.getContext("2d");
    if(!ctx) return;

    let clicked = false;
    let startX = 0;
    let startY = 0;

    ctx.fillStyle = "rgba(0, 0, 0)"; //initial background color
    ctx.fillRect(0, 0, canvas.width, canvas.height); //paint

    canvas.addEventListener("mousedown", (e) => { //when mouse is clicked
        clicked = true;
        //starting points
        startX = e.offsetX;
        startY = e.offsetY;
    })

    canvas.addEventListener("mouseup", (e) => {
        clicked = false;
    })

    canvas.addEventListener("mousemove", (e) => {
        //console.log(e.clientX);
        //console.log(e.clientY);

        if (clicked) {
            const width = e.clientX - startX;
            const height = e.clientY - startY;

            ctx.clearRect(0, 0, canvas.width, canvas.height); //clear the canvas

            ctx.fillStyle = "black"; //redraw black background
            ctx.fillRect(0, 0, canvas.width, canvas.height); //set now

            ctx.strokeStyle = "white"; //Rectangle border white
            ctx.lineWidth = 2; //thickness
            ctx.strokeRect(startX, startY, width, height); //draw new rectangle
        }
    })
}