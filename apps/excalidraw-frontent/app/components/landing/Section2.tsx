

export default function Section2() {
    
    return (
        <div className="py-15 bg-gray-100 flex flex-col items-center" id="section2">
            <div className="text-center">
                <h2 className="text-5xl font-bold">Everything you need to create</h2>
                <p className="text-gray-500 text-xl pt-3">Powerful features that make drawing and collabration effortless</p>
            </div>

            <div className="py-15 grid grid-cols-3 gap-8">
                <Card 
                    icon={<span className="material-symbols-outlined text-4xl!">edit</span>} 
                    title="Hand-drawn Style" 
                    para="Create beautiful diagrams with a hand-drawn, sketch-like aesthetic that feels natural and approachable."
                    iconColor="bg-blue-100"
                    fontColor="text-blue-600"
                />

                <Card 
                    icon={<span className="material-symbols-outlined">group</span>} 
                    title="Real-time Collaboration" 
                    para="Work together with your team in real-time. See changes instantly as multiple users draw simultaneously."
                    iconColor="bg-green-100"
                    fontColor="text-green-600"
                />

                <Card 
                    icon={<span className="material-symbols-outlined">bolt</span>} 
                    title="Lightning Fast" 
                    para="Optimized performance ensures smooth drawing even with complex diagrams and large canvases."
                    iconColor="bg-orange-100"
                    fontColor="text-orange-600"
                />

                <Card 
                    icon={<span className="material-symbols-outlined">download</span>} 
                    title="Export Anywhere"
                    para="Export your drawings as PNG, SVG, or clipboard. Perfect for documentation and presentations."
                    iconColor="bg-cyan-100"
                    fontColor="text-fontColor-600"
                />

                <Card 
                    icon={<span className="material-symbols-outlined">lock_open</span>} 
                    title="Privacy First" 
                    para="Your data stays private. Work offline or use end-to-end encryption for sensitive projects."
                    iconColor="bg-red-100"
                    fontColor="text-red-600"
                />

                <Card 
                    icon={<span className="material-symbols-outlined">palette</span>} 
                    title="Infinite Canvas"
                    para="Never run out of space. Pan and zoom freely across an unlimited canvas for your biggest ideas."
                    iconColor="bg-pink-100"
                    fontColor="text-pink-600"
                />
            </div>
        </div>
    )
}

type CardProps = {
    icon: React.ReactNode,
    title: string,
    para: string,
    iconColor: string
    fontColor: string
}

function Card({icon, iconColor, title, para, fontColor}: CardProps) {
    return(
        <div className="flex flex-col bg-white rounded-2xl w-100 h-70 py-8 px-10 hover:scale-105 transition-transform shadow-2xl hover:shadow-blue-500">
            <div className={`${iconColor} ${fontColor} h-15 w-15 rounded-xl flex items-center justify-center`}>{icon}</div>
            <h3 className="text-2xl font-bold my-5">{title}</h3>
            <p className="text-lg text-gray-600">{para}</p>
        </div>
    )
}