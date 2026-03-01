

export default function Section3() {
    return (
        <div className="flex flex-col justify-center items-center py-15 max-w-7xl mx-auto px-50">
            <h1 className="text-5xl font-bold">Built for creators and teams</h1>
            
            <p className="text-xl text-gray-600 text-center mt-8">Whether you're sketching a quick wireframe, mapping out system architecture, or brainstorming with your team, Excalidraw provides the perfect canvas for your ideas. Simple enough for anyone, powerful enough for professionals.</p>

            <div className="flex w-full justify-between py-15">
                <div>
                    <h3 className="text-4xl font-bold text-blue-600">1M+</h3>
                    <p className="text-gray-600 pt-2">Active Users</p>
                </div>
                <div>
                    <h3 className="text-4xl font-bold text-blue-600">50M+</h3>
                    <p className="text-gray-600 pt-2">Drawings Created</p>
                </div>
                <div>
                    <h3 className="text-4xl font-bold text-blue-600">100%</h3>
                    <p className="text-gray-600 pt-2">Open Source</p>
                </div>
            </div>
        </div>
    )
}