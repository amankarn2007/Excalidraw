

export default function Section1() {
    return(
        <div className="flex justify-center flex-col items-center pt-15 pb-20">
            <div className="flex flex-col justify-center items-center">
                <div className="flex flex-col max-w-4xl">
                    <h1 className="text-7xl font-bold text-center">Sketch ideas with <span className="text-blue-600 block">virtual whiteboard</span></h1>

                    <p className="text-2xl pt-10 text-center px-10 text-gray-600">Create beautiful hand-drawn diagrams, wireframes, and illustrations. Collaborate in real-time with your team, anywhere in the world.</p>
                </div>

                <div className="pt-8">
                    <button className="px-8 py-4 bg-blue-600 rounded-2xl text-white text-lg font-medium">Start Drawing Now</button>

                    <button className="px-8 py-4 bg-gray-200 rounded-2xl text-lg mx-5 font-medium">View Examples</button>
                </div>
            </div>

            <div className="mt-20 rounded-4xl bg-gray-100 px-140 py-75 border-35 border-white shadow-2xl">
                <div className="flex flex-col items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-25 fill-blue-500" viewBox="0 0 640 640">
                        <path d="M100.4 417.2C104.5 402.6 112.2 389.3 123 378.5L304.2 197.3L338.1 163.4C354.7 180 389.4 214.7 442.1 267.4L476 301.3L442.1 335.2L260.9 516.4C250.2 527.1 236.8 534.9 222.2 539L94.4 574.6C86.1 576.9 77.1 574.6 71 568.4C64.9 562.2 62.6 553.3 64.9 545L100.4 417.2zM156 413.5C151.6 418.2 148.4 423.9 146.7 430.1L122.6 517L209.5 492.9C215.9 491.1 221.7 487.8 226.5 483.2L155.9 413.5zM510 267.4C493.4 250.8 458.7 216.1 406 163.4L372 129.5C398.5 103 413.4 88.1 416.9 84.6C430.4 71 448.8 63.4 468 63.4C487.2 63.4 505.6 71 519.1 84.6L554.8 120.3C568.4 133.9 576 152.3 576 171.4C576 190.5 568.4 209 554.8 222.5C551.3 226 536.4 240.9 509.9 267.4z" /></svg>

                    <h4 className="text-gray-600 text-lg">Your canvas awaits</h4>
                </div>
            </div>
        </div>
    )
}