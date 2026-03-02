"use client"

import { useRef, useState } from "react"

export default function Section1() {
    const [roomModal, setRoomModal] = useState(false);
    const roomIdRef = useRef<HTMLInputElement>(null);

    function createRoomModal() {
        setRoomModal(true);
    }

    function sendCreateRoom() {
        const roomId = (roomIdRef.current?.value)
        
    }
    
    return (
        <div className="flex gap-8 justify-center pt-10">
            <Card 
                icon={<i className="fa-solid fa-plus"></i>} 
                iconColor="blue" 
                label="Blank canvas" 
                onClick={() => console.log("sddddddddd")}
            />
            <Card 
                icon={<i className="fa-regular fa-folder-open"></i>} 
                iconColor="green" 
                label="Create room" 
                onClick={createRoomModal}    
            />
            <Card 
                icon={<i className="fa-solid fa-user-group"></i>} 
                iconColor="orange" 
                label="Start collab" 
                onClick={() => {}}
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
                            <button onClick={() => setRoomModal(false)}>
                                <span className="material-symbols-outlined scale-100 hover:scale-130 transition-transform">close_small</span>
                            </button>
                        </div>

                        <div className="flex flex-col items-center w-full px-15">
                            <h2 className="text-xl font-medium tracking-tight italic">Create your Drawing room</h2>

                            <div className="flex flex-col w-full pt-10">
                                <label className="pb-2">Room id:</label>
                                <input type="text" placeholder="Enter your room id" className="py-2 px-5 rounded-lg w-full outline focus:outline-blue-400 focus:outline-2" ref={roomIdRef}/>
                            </div>

                            <button className="py-2 mt-8 text-white w-full bg-green-600 rounded-lg hover:bg-green-700 cursor-pointer" onClick={sendCreateRoom}>Create</button>
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