

//export default function CreateRoomModal() {
//    return(
//        <div>
//            { roomModal && 
//                <div className="fixed z-5 inset-0 w-full h-screen backdrop-blur-sm flex items-center justify-center">
//                    <div className=" h-90 w-130 bg-white border border-gray-300 rounded-xl">
//                        <div className="flex justify-end p-4">
//                            <button onClick={() => setRoomModal(false)}>
//                                <span className="material-symbols-outlined scale-100 hover:scale-130 transition-transform">close_small</span>
//                            </button>
//                        </div>

//                        <div className="flex flex-col items-center w-full px-15">
//                            <h2 className="text-xl font-medium tracking-tight italic">Create your Drawing room</h2>

//                            <div className="flex flex-col w-full pt-10">
//                                <label className="pb-2">Room id:</label>
//                                <input type="text" placeholder="Enter your room id" className="py-2 px-5 rounded-lg w-full outline focus:outline-blue-400 focus:outline-2" ref={roomIdRef}/>
//                            </div>

//                            <button className="py-2 mt-8 text-white w-full bg-green-600 rounded-lg hover:bg-green-700 cursor-pointer" onClick={sendCreateRoom}>Create</button>
//                        </div>
//                    </div>
//                </div>
//            }
//        </div>
//    )
//}