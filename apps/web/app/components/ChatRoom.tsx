import axios from "axios";
import { BACKEND_URL } from "../config";
import { ChatRoomClient } from "./ChatRoomClient";


//find the old chats with the help of id, Client ko initial data dena

async function getChats(roomId: string) {
    const response = await axios.get(`${BACKEND_URL}/chats/${roomId}`);
    return response.data.messages;
}

export async function ChatRoom({id}: {id: string}) {
    const messages = await getChats(id);
 
    return <ChatRoomClient messages={messages} id={id} />
}