"use client"
import { HTTP_BACKEND } from "@/config";
import axios from "axios";
import { useEffect, useRef, useState } from "react"
import { useRouter } from "next/navigation";
import CreateRoomModal from "../modals/CreateRoomModal";
import CollabRoomModal from "../modals/CollabRoomModal";

export default function Section1() {
    const router = useRouter();
    const [roomModal, setRoomModal] = useState(false);
    const [collabModal, setCollabModal] = useState(false); //collabe room nodal
    const roomIdRef = useRef<HTMLInputElement>(null!);
    const joinRoomIdRef = useRef<HTMLInputElement>(null!);
    const [roomCreateMesssage, setRoomCreateMessage] = useState("");
    const [collabRoomMesssage, setCollabRoomMesssage] = useState("");

    useEffect(() => {
        if (roomIdRef.current) roomIdRef.current.value = "";

        if (roomCreateMesssage) {
            const timer = setTimeout(() => {
                setRoomCreateMessage("");
                if (roomIdRef.current) roomIdRef.current.value = "";
            }, 8000);

            return () => clearTimeout(timer);
        }
    }, [roomCreateMesssage])


    async function sendCreateRoom() {
        try {
            const roomSlug = (roomIdRef.current?.value);
    
            const response = await axios.post(`${HTTP_BACKEND}/room`, {
                name: roomSlug
            }, {
                headers: {
                    "Authorization": localStorage.getItem("token"),
                }
            })
            console.log(response.data);

            if(response.status === 200) {
                setRoomCreateMessage(`Room created successfully!, Your roomId is: ${response.data.roomId}`);
            }

            console.log(roomCreateMesssage);

        } catch (err: any) {
            if(err.response) {
                const backendData = err.response.data;
                //console.log("Backend Error Message:", backendData);
                
                if (backendData.message === "Room already created") {
                    setRoomCreateMessage(`Room already created, Your roomId is: ${backendData.Room}`);
                }
            }
            console.log(err);
        }
    }

    async function joinCollabRoom() {
        setCollabRoomMesssage("Joining the room. Please wait...")

        const timer = setTimeout(() => {
            setCollabRoomMesssage("");
            router.push(`/canvas/${joinRoomIdRef.current?.value}`);
        }, 3000);

        return () => {
            clearTimeout(timer);
        }
    }

    function showHistory() {
        const elm = document.getElementById("drawing-history")
        if(elm) {
            elm.scrollIntoView({behavior: "smooth"});
        }
    }

    return (
        <div className="flex pl-12 gap-8 justify-center pt-10">
            <Card 
                icon={<i className="fa-solid fa-plus"></i>} 
                iconColor="blue" 
                label="Blank canvas" 
                onClick={() => router.push("/canvas/quickDraw")}
            />
            <Card 
                icon={<i className="fa-regular fa-folder-open"></i>} 
                iconColor="green" 
                label="Create room" 
                onClick={() => setRoomModal(true)}    
            />
            <Card 
                icon={<i className="fa-solid fa-user-group"></i>} 
                iconColor="orange" 
                label="Start collab" 
                onClick={() => setCollabModal(true)}
            />
            <Card 
                icon={<i className="fa-regular fa-clock"></i>}
                iconColor="pink" 
                label="Recent"
                onClick={showHistory}
            />

            <CreateRoomModal
                roomModal={roomModal}
                setRoomModal={setRoomModal}
                roomCreateMesssage={roomCreateMesssage}
                roomIdRef={roomIdRef}
                sendCreateRoom={sendCreateRoom}
            />

            <CollabRoomModal 
                collabModal={collabModal}
                setCollabModal={setCollabModal}
                collabRoomMesssage={collabRoomMesssage}
                joinRoomIdRef={joinRoomIdRef}
                joinCollabRoom={joinCollabRoom}
            />
        </div>
    )
}

interface CardInt {
    icon: React.ReactNode, 
    iconColor: string, 
    label: string, 
    onClick: () => void
}

function Card({icon, iconColor, label, onClick}: CardInt) {
    return (
        <div className="flex flex-col outline-1 outline-gray-300 hover:outline-blue-300 py-3 w-65 items-center rounded-2xl bg-white cursor-pointer" onClick={onClick}>
            <p style={{ color: iconColor }}> {icon} </p>
            <p className="text-xs pt-2"> {label} </p>
        </div>
    )
}