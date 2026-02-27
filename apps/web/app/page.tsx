"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";


//Home Page
export default function Home() {
  const [roomId, setRoomId] = useState("");
  const router = useRouter();

  return (
    <div className="" style={{width:"100%", height: "100vh", display: "flex", alignItems: "center", justifyContent: "center", backgroundColor: "whitesmoke"}}>

      <div style={chatComponentStyle}>
        <div style={{width: "100%", display: "flex",  marginTop: "20px", padding: "0px 40px", boxSizing: "border-box", justifyContent: "space-between"}}>

          <input type="text" placeholder="Room id" value={roomId} style={{padding: "9px 60px", borderRadius: "5px", fontSize: "15px"}} onChange={(e) => {
            setRoomId(e.target.value)
          }}/>

          <button style={{borderRadius: "5px", padding: "2px 10px", background: "white", cursor: "pointer", backgroundColor: "skyblue"}} onClick={() => {
            router.push(`/room/${roomId}`)
          }}>Join room</button>
        </div>

        <div style={{width: "88%", height: "78%", padding: "5px 0px", backgroundColor: "white", borderRadius: "12px"}} className="bg-blue">
          chats
        </div>

        <div style={{width: "100%", display: "flex", marginBottom: "0px", padding: "0px 30px", boxSizing: "border-box", justifyContent: "space-between"}}>

          <input type="text" placeholder="Enter your message" value={roomId} style={{padding: "9px 60px", borderRadius: "5px", fontSize: "15px"}} onChange={(e) => {
            setRoomId(e.target.value)
          }}/>

          <button style={{borderRadius: "5px", padding: "2px 35px", background: "white", cursor: "pointer", backgroundColor: "skyblue"}} >Send</button>
        </div>

      </div>

    </div>
  );
}

const chatComponentStyle: any = {
  width: "480px", 
  height: "625px", 
  background: "pink", 
  borderRadius: "12px", 
  display: "flex", 
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "space-between",
  borderColor: "gray",
  //boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
  boxShadow: "blue",
  paddingBottom: "15px"
}