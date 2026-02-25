"use client"
import { useEffect, useState } from "react"
import { useSocket } from "../hooks/useSocket";

//web socket connection
export function ChatRoomClient({ 
    messages, id
}: {
    messages: {message: string} [],
    id: string
}) {

    const [chats, setChats] = useState(messages); //prev msg already here
    const [currentMessage, setCurrentMessage] = useState("");
    const {socket, loading} = useSocket();

    console.log("ChatRoomClient render");


    useEffect(() => {
        if(socket && !loading) {
            
            socket.send(JSON.stringify({
                type: "join_room",
                roomId: id
            }))

            socket.onmessage = (event) => {
                const parsedData = JSON.parse(event.data);
                console.log(parsedData);

                if(parsedData.type === "chat") {
                    setChats(c => [...c, parsedData.message])
                }
            }
        }
    }, [socket, loading, id])


    return (
        <div>
            {/*{ chats.map(m => <div> {m.message} </div>) }*/}

            {chats.map((m, index) => (
                <div key={index}>{m.message}</div>
            ))}

            <input type="text" value={currentMessage} onChange={e => {
                setCurrentMessage(e.target.value);
            }} />

            <button onClick={() => {
                socket?.send(JSON.stringify({
                    type: "chat",
                    roomId: id,
                    message: currentMessage
                }))

                setCurrentMessage("");
            }}>Send message</button>
        </div>
    )
}