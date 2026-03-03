import { HTTP_BACKEND } from "@/config";
import axios from "axios";

//connect to backend and fetch all existing data and convert into shapes
export async function getExistingShapes(roomId: string) {
    const res = await axios.get(`${HTTP_BACKEND}/chats/${roomId}`);
    //console.log(res.data.messages);

    const messages = res.data.messages;

    const shapes = messages.map((x: { message: string }) => {
        const messageData = JSON.parse(x.message);
        //console.log(messageData);
        return messageData.shape;
    })

    return shapes;
}