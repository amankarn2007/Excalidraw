"use client"
import { useRouter } from "next/navigation"


export default function Navbar() {
    const router = useRouter();

    function showFeatures(id: string) { //scroll to features section
        const element = document.getElementById(id);

        if(element){
            element.scrollIntoView({ behavior: "smooth" });
        }
    }

    function showAbout(id: string) {
        const element = document.getElementById(id);

        if(element) {
            element.scrollIntoView({behavior: "smooth"});
        }
    }

    return(
        <div className="h-16 sticky bg-white flex justify-evenly items-center border border-b-gray-300">
            <div className="flex items-center mr-120 cursor-pointer scale-100 hover:scale-115 transition-transform">
                <i className="fa-solid fa-pencil text-blue-500 text-3xl"></i>
                <h4 className="text-black text-2xl font-bold">Excalidraw</h4>
            </div>

            <div className="flex text-gray-600 hover:text-gray-800 cursor-pointer items-center">
                <div className="px-7 hover:scale-110 transition-transform " onClick={() => showFeatures("section2")}>Features</div>

                <div className="px-7 hover:scale-110 transition-transform " onClick={() => showAbout("section3")}>About</div>
                
                <div className="ml-2 px-5 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg text-white font-bold" 
                onClick={() => router.push("signup")}>Get Started</div>
            </div>
        </div>
    )
}