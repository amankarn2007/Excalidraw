"use client"
import { useEffect, useState } from "react"
import { useSocket } from "../hooks/useSocket";

//web socket connection
export function ChatRoomClient({ messages, id }: {
    messages: {message: string} [],
    id: string
}) {

    const [chats, setChats] = useState(messages); //prev msg already here, that is received from ChatRoom and adding new msgs
    const [currentMessage, setCurrentMessage] = useState(""); //new input value
    const {socket, loading} = useSocket();


    //used to see incoming msgs and then update chats state
    useEffect(() => {
        if(socket && !loading) {
            
            const messageHandler = (event: MessageEvent) => { //set received msg from useSocket
                const parsedData = JSON.parse(event.data);

                if(parsedData.type === "chat"){ //check is this chat msg, or other things like error
                    setChats(prev => [...prev, {message: parsedData.message}]);
                }
            }

            socket.addEventListener("message", messageHandler); //socket me jab naya mmsg aaye to messageHandler trigger kardo 

            //cleanup function
            return () => {
                socket.removeEventListener("message", messageHandler);
                socket.send(JSON.stringify({
                    type: "leave_room",
                    roomId: id,
                }))
            }
        }
    }, [socket, loading, id]); //dependency


    const sendMessage = () => {
        if(!currentMessage.trim()) return; //return empty msg

        socket?.send(JSON.stringify({ //send msg to webSocket
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


//  return (
//    <div className="" style={{width:"100%", height: "100vh", display: "flex", alignItems: "center", justifyContent: "center", backgroundColor: "whitesmoke"}}>

//      <div style={chatComponentStyle}>
//        <div style={{width: "100%", display: "flex",  marginTop: "20px", padding: "0px 40px", boxSizing: "border-box", justifyContent: "space-between"}}>

//          <input type="text" placeholder="Room id" value={roomId} style={{padding: "9px 60px", borderRadius: "5px", fontSize: "15px"}} onChange={(e) => {
//            setRoomId(e.target.value)
//          }}/>

//          <button style={{borderRadius: "5px", padding: "2px 10px", background: "white", cursor: "pointer", backgroundColor: "skyblue"}} onClick={() => {
//            router.push(`/room/${roomId}`); //only redirect to this page 
//          }}>Join room</button>
//        </div>

//        <div style={{width: "88%", height: "78%", padding: "px 0px", backgroundColor: "white", borderRadius: "12px"}} className="bg-blue">
          
//          <div style={{margin: "10px"}}>chats</div>

//        </div>

//        <div style={{width: "100%", display: "flex", marginBottom: "0px", padding: "0px 30px", boxSizing: "border-box", justifyContent: "space-between"}}>

//          <input type="text" placeholder="Enter your message" value={roomId} style={{padding: "9px 60px", borderRadius: "5px", fontSize: "15px"}} onChange={(e) => {}}/>

//          <button style={{borderRadius: "5px", padding: "2px 35px", background: "white", cursor: "pointer", backgroundColor: "skyblue"}} >Send</button>
//        </div>

//      </div>

//    </div>
//  );
//}

//const chatComponentStyle: any = {
//  width: "480px", 
//  height: "625px", 
//  background: "pink", 
//  borderRadius: "12px", 
//  display: "flex", 
//  flexDirection: "column",
//  alignItems: "center",
//  justifyContent: "space-between",
//  borderColor: "gray",
//  //boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
//  boxShadow: "blue",
//  paddingBottom: "15px"
//}