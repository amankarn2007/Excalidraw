"use client";
import { useRouter } from "next/navigation"; //used to navigate from one page to other page
import { useState } from "react";


//Home Page, take roomId and redirect to room/:roomId
export default function Home() {
  const [roomId, setRoomId] = useState("");
  const router = useRouter();

  return (
    <div className="" style={{width:"100%", height: "100vh", display: "flex", alignItems: "center", justifyContent: "center", backgroundColor: "whitesmoke"}}>

      <div style={joinComponentStyle}>
        <input type="text" placeholder="Room id" value={roomId} style={{padding: "12px 85px", textAlign: "center",borderRadius: "5px", fontSize: "15px"}} 
        onChange={(e) => {
          setRoomId(e.target.value)
        }}/>

        <button style={{borderRadius: "5px", padding: "10px 142px", fontSize: "1rem", marginTop: "20px", background: "white", cursor: "pointer", backgroundColor: "skyblue"}} onClick={() => {
          router.push(`/room/${roomId}`); //only redirect to this page 
        }}>Join room</button>
      </div>
    </div>
  );
}

const joinComponentStyle: any = {
  width: "480px", 
  height: "250px", 
  background: "pink", 
  borderRadius: "12px", 
  display: "flex", 
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  borderColor: "gray",
  //boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
  boxShadow: "blue",
  paddingBottom: "15px"
}