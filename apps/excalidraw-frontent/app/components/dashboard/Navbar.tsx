

export default function Navbar() {
    return (
        <div className="h-16 w-full flex items-center bg-white fixed border border-gray-300 shadow justify-evenly z-2">

            <div className="flex items-center mr-120 cursor-pointer scale-100 hover:scale-115 transition-transform">
                <i className="fa-solid fa-pencil text-blue-500 text-3xl"></i>
                <h4 className="text-black text-2xl font-bold">Excalidraw</h4>
            </div>

            <div className="flex gap-5">
                <div className="outline-1 outline-gray-300 bg-gray-100 rounded-lg py-1 px-4 focus-within:outline-2 focus-within:outline-blue-600">
                    <i className="fa-brands fa-sistrix opacity-70"></i>
                    <input type="text" placeholder="Search drawings..." className="outline-0 group pl-2"/>
                </div>

                <div className="flex bg-blue-700 rounded-lg items-center justify-center py-1.5 px-2.5 text-white cursor-pointer">
                    <i className="fa-solid fa-plus text-sm"></i>
                    <h2 className="pl-1">New</h2>
                </div>
            </div>
        </div>
    )
}