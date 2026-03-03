import { Dispatch, RefObject, SetStateAction } from "react";

interface ColllabRoom {
    collabModal: boolean,
    setCollabModal: Dispatch<SetStateAction<boolean>>,
    collabRoomMesssage: string,
    joinRoomIdRef: RefObject<HTMLInputElement>,
    joinCollabRoom: () => void,
}


export default function CollabRoomModal({ collabModal, setCollabModal, collabRoomMesssage, joinRoomIdRef, joinCollabRoom }: ColllabRoom) {

    return (
        <div>
            {collabModal &&
                <div className="fixed z-5 inset-0 w-full h-screen backdrop-blur-sm flex items-center justify-center">
                    <div className=" h-90 w-130 bg-white border border-gray-300 rounded-xl">
                        <div className="flex justify-end p-4">
                            <button className="cursor-pointer" onClick={() => setCollabModal(false)}>
                                <span className="material-symbols-outlined scale-100 hover:scale-130 transition-transform">close_small</span>
                            </button>
                        </div>

                        <div className="flex flex-col items-center w-full px-15">
                            <h2 className="text-xl font-medium tracking-tight italic">Join your Drawing room</h2>
                            <p className="absolute mt-7  text-center text-sm font-medium text-red-700 tracking-tight italic">*before joinig the room, make sure you have created the room</p>

                            {collabRoomMesssage &&
                                <p className="absolute z-20 text-[16px] font-medium text-green-500 tracking-tight italic mt-11">
                                    {collabRoomMesssage}
                                </p>
                            }

                            <div className="flex flex-col w-full pt-10">
                                <label className="pb-2">Room name:</label>
                                <input type="text" placeholder="Enter your room name" className="py-2 px-5 rounded-lg w-full outline focus:outline-blue-400 focus:outline-2" ref={joinRoomIdRef} />
                            </div>

                            <button className="py-2 mt-8 text-white w-full bg-blue-500 rounded-lg hover:bg-blue-600 cursor-pointer" onClick={joinCollabRoom}>Join</button>
                        </div>
                    </div>
                </div>
            }
        </div>
    )
}