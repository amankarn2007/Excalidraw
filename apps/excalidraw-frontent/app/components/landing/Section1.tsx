

export default function Section1() {
    return(
        <div className="flex justify-center flex-col items-center pt-15 pb-20">
            <div className="flex flex-col justify-center items-center">
                <div className="flex flex-col max-w-4xl">
                    <h1 className="text-7xl font-bold text-center">Sketch ideas with <span className="text-blue-600 block">virtual whiteboard</span></h1>

                    <p className="text-2xl pt-10 text-center px-10 text-gray-600">Create beautiful hand-drawn diagrams, wireframes, and illustrations. Collaborate in real-time with your team, anywhere in the world.</p>
                </div>

                <div className="pt-8">
                    <button className="px-8 py-4 bg-blue-600 rounded-2xl text-white text-lg font-medium cursor-pointer hover:bg-blue-700 scale-100 transition-transform hover:scale-105">Start Drawing Now</button>

                    <button className="px-8 py-4 bg-gray-200 rounded-2xl text-lg mx-5 font-medium cursor-pointer hover:bg-gray-300 scale-100 transition-transform hover:scale-105">View Examples</button>
                </div>
            </div>

            <div className="mt-20 rounded-4xl bg-gray-100 px-140 py-75 border-35 border-white hover:shadow-blue-500 shadow-2xl group">
                <div className="flex flex-col items-center justify-center">
                    <i className="fa-solid fa-pencil text-7xl text-blue-500 group-hover:scale-105 transition-transform"></i>

                    <h4 className="text-gray-600 text-lg">Your canvas awaits</h4>
                </div>
            </div>
        </div>
    )
}