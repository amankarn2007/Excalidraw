import axios from "axios"
import { BACKEND_URL } from "../../config"
import { ChatRoom } from "../../components/ChatRoom";

//URL se slug lena, Backend se roomId nikalna, Validate karna
async function getRoomId(slug: string) {
    try{
        const fullUrl = `http://localhost:3000/room/${slug}`;
        console.log(fullUrl);
        
        const response = await axios.get(fullUrl);
    
        console.log(response.data.room);
    
        return response.data.room.id;
    } catch(err) {
        console.log(err);
    }
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