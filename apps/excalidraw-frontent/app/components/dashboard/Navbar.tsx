"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react"

export default function Navbar() {
    const router = useRouter();
    const [profile, setProfile] = useState<boolean>(false);

    useEffect(() => {
        const timer = setTimeout(() => {
            setProfile(false);
        }, 3000)

        return () => clearTimeout(timer);
    }, [profile])

    
    function handleLogout() {
        localStorage.removeItem("token");
        router.push("/");
    }

    function popupNewModal() {
        
    }

    return (
        <div className="h-16 w-full flex items-center bg-white fixed border border-gray-300 shadow justify-evenly z-2">

            <div className="flex items-center mr-120 cursor-pointer scale-100 hover:scale-115 transition-transform">
                <i className="fa-solid fa-pencil text-blue-500 text-3xl"></i>
                <h4 className="text-black text-2xl font-bold">Excalidraw</h4>
            </div>

            <div className="flex items-center gap-8">
                <div className="outline-1 outline-gray-300 bg-gray-100 rounded-lg py-1 px-4 focus-within:outline-2 focus-within:outline-blue-600">
                    <i className="fa-brands fa-sistrix opacity-70"></i>
                    <input type="text" placeholder="Search drawings..." className="outline-0 group pl-2"/>
                </div>

                <div className="flex bg-blue-700 rounded-lg items-center justify-center py-1.5 px-2.5 text-white cursor-pointer" onClick={popupNewModal}>
                    <i className="fa-solid fa-plus text-sm"></i>
                    <h2 className="px-1">New</h2>
                </div>

                <div className="bg-pink-300 text-white border border-gray-400 px-2 py-1 rounded-4xl hover:scale-110 transition-transform cursor-pointer hover:bg-pink-400" onClick={() => setProfile((prev) => !prev)}>
                    <span className="material-symbols-outlined">person</span>
                </div>

                { profile && <ProfileModal onLogout={handleLogout}/> }
            </div>
        </div>
    )
}

function ProfileModal({onLogout}: {onLogout: () => void}) {
    return (
        <div className="absolute right-20 top-16 bg-white px-5 py-5 gap-5 rounded-2xl border border-gray-300 flex hover:bg-gray-200 cursor-pointer" onClick={onLogout}>
            <p className="">Logout</p>
            <span className="material-symbols-outlined">logout</span>
        </div>
    )
}