import axios from "axios"
import { BACKEND_URL } from "../../config"
import { ChatRoom } from "../../components/ChatRoom";

//URL se slug lena, Backend se roomId nikalna, Validate karna
async function getRoomId(slug: string) {
    console.log(`${BACKEND_URL}/room/${slug}`)
    const response = await axios.get(`${BACKEND_URL}/room/${slug}`);

    console.log(response.data.room);

    return response.data.room.id;
}


export default async function ChatRoom1({
    params,
}: {
    params: {slug: string}
}) {
    
    const {slug} = await params; //slug means room name
    const roomId = await getRoomId(slug);

    return <ChatRoom id={roomId} />
}