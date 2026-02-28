import axios from "axios"
import { ChatRoom } from "../../components/ChatRoom";

//ye slug se id find krke ChatRoom ko bhejdega

async function getRoomId(slug: string) { //get roomId with slug
    try{
        const fullUrl = `http://localhost:3000/room/${slug}`;
        //console.log(fullUrl);
        
        const response = await axios.get(fullUrl);
    
        console.log(response.data.room);
    
        return response.data.room.id;
    } catch(err) {
        console.log(err);
    }
}


export default async function ChatRoom1({params,}: {
    params: {slug: string}
}) {

    const {slug} = await params;
    const roomId = await getRoomId(slug);

    return <ChatRoom id={roomId} /> //send roomId to ChatRoom
}