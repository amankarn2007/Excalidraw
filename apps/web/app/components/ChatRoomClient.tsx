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


    useEffect(() => { //send connection request to  ws
        if(socket && !loading) {
            
            const messageHandler = (event: MessageEvent) => {
                const parsedData = JSON.parse(event.data);

                if(parsedData.type === "chat"){
                    setChats(prev => [...prev, {message: parsedData.message}]);
                }
            }

            socket.addEventListener("message", messageHandler); //

            //cleanup function
            return () => {
                socket.removeEventListener("message", messageHandler);
                socket.send(JSON.stringify({
                    type: "leave_room",
                    roomId: id,
                }))
            }
        }
    }, [socket, loading, id])


    const sendMessage = () => {
        if(!currentMessage.trim()) return; //return empty msg

        socket?.send(JSON.stringify({
            type: "chat",
            roomId: id,
            messages: currentMessage,
        }));

        setCurrentMessage("");
    }


    return (
        <div>
            {chats.map((m, index) => (
                <div key={index}> {m.message} </div>
            ))}

            <input type="text" value={currentMessage} onChange={e => {
                setCurrentMessage(e.target.value);
            }} />

            <button onClick={sendMessage}>Send message</button>
        </div>
    )
}