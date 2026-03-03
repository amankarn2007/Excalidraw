"use client"
import { HTTP_BACKEND } from "@/config";
import axios from "axios";
import { useEffect, useRef, useState } from "react"
import { useRouter } from "next/navigation";

export default function Section1() {
    const router = useRouter();
    const [roomModal, setRoomModal] = useState(false);
    const [collabModal, setCollabModal] = useState(false); //collabe room nodal
    const roomIdRef = useRef<HTMLInputElement>(null);
    const joinRoomIdRef = useRef<HTMLInputElement>(null);
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

    return (
        <div className="flex gap-8 justify-center pt-10">
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
                onClick={() => {}}
            />

            { roomModal && 
                <div className="fixed z-5 inset-0 w-full h-screen backdrop-blur-sm flex items-center justify-center">
                    <div className=" h-90 w-130 bg-white border border-gray-300 rounded-xl">
                        <div className="flex justify-end p-4">
                            <button className="cursor-pointer" onClick={() => setRoomModal(false)}>
                                <span className="material-symbols-outlined scale-100 hover:scale-130 transition-transform">close_small</span>
                            </button>
                        </div>

                        <div className="flex flex-col items-center w-full px-15">
                            <h2 className="text-xl font-medium tracking-tight italic">Create your Drawing room</h2>

                            { roomCreateMesssage && 
                                <p className="absolute z-20 text-[16px] font-medium text-green-500 tracking-tight italic pt-10">
                                    {roomCreateMesssage} 
                                </p>
                            }

                            <div className="flex flex-col w-full pt-10">
                                <label className="pb-2">Room Name:</label>
                                <input type="text" placeholder="Enter your room name" className="py-2 px-5 rounded-lg w-full outline focus:outline-blue-400 focus:outline-2" ref={roomIdRef}/>
                            </div>

                            <button className="py-2 mt-8 text-white w-full bg-green-600 rounded-lg hover:bg-green-700 cursor-pointer" onClick={sendCreateRoom}>Create</button>
                        </div>
                    </div>
                </div>
            }

            { collabModal && 
                <div className="fixed z-5 inset-0 w-full h-screen backdrop-blur-sm flex items-center justify-center">
                    <div className=" h-90 w-130 bg-white border border-gray-300 rounded-xl">
                        <div className="flex justify-end p-4">
                            <button className="cursor-pointer" onClick={() => setCollabModal(false)}>
                                <span className="material-symbols-outlined scale-100 hover:scale-130 transition-transform">close_small</span>
                            </button>
                        </div>

                        <div className="flex flex-col items-center w-full px-15">
                            <h2 className="text-xl font-medium tracking-tight italic">Join your Drawing room</h2>

                            { collabRoomMesssage && 
                                <p className="absolute z-20 text-[16px] font-medium text-green-500 tracking-tight italic pt-10">
                                    {collabRoomMesssage}
                                </p>
                            }

                            <div className="flex flex-col w-full pt-10">
                                <label className="pb-2">Room id:</label>
                                <input type="text" placeholder="Enter your room id" className="py-2 px-5 rounded-lg w-full outline focus:outline-blue-400 focus:outline-2" ref={joinRoomIdRef}/>
                            </div>

                            <button className="py-2 mt-8 text-white w-full bg-blue-500 rounded-lg hover:bg-blue-600 cursor-pointer" onClick={joinCollabRoom}>Join</button>
                        </div>
                    </div>
                </div>
            }
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