"use client"


export function AuthPage({isSignin}: {
    isSignin: boolean
}) {
    return (
        <div className="w-screen h-screen flex justify-center items-center bg-gray-400">
            <div className="bg-white h-130 w-100 flex flex-col rounded-lg p-2 m-2 justify-center items-center shadow shadow-blue-400 hover:shadow-2xl">

                <h2 className="text-black text-3xl font-medium mb-2">{isSignin ? "Signin Page" : "Signup Page"}</h2>

                <p className="text-black mb-15">Enter your credintials to connect with us</p>

                <div className="">
                    <input type="text" placeholder="Email" className="border border-gray-500 py-2 px-18 rounded-md text-black"/>
                </div>

                <div>
                <input type="password" placeholder="Password" className="border border-gray-500 py-2 rounded-md text-black mt-8 px-18" />
                </div>
                <button className="bg-black py-2 w-9/10 rounded-md mb-5 mt-12 hover:bg-gray-800 cursor-pointer" onClick={() => {}}>{isSignin ? "Signin" : "Signup"}</button>
            </div>
        </div>
    )
}