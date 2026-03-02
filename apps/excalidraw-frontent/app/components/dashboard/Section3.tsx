

export default function Section3() {
    return (
        <div className="px-8 pb-5">
            <div className="pt-10 px-2">
                <p className="text-sm font-medium opacity-80">Shared with me</p>
            </div>

            <div className="mt-5 mx-2 px-2 border rounded-xl border-gray-300 ">
                <List label="API Design" by="by Sarah K. · 5 min ago" />
                <List label="Landing Page Draft" by="by Mike R. · 1 day ago" />
            </div>
        </div>
    )
}


function List({label, by}: {label: string, by: string}) {
    return (
        <div className="flex justify-between items-center my-4 cursor-pointer">
            <div className="flex-col px-3">
                <h4 className="text-sm"> {label} </h4>
                <p className="text-xs opacity-80"> {by} </p>
            </div>

            <button className="hover:bg-pink-500 py-1.5 px-2.5 mr-2 rounded-md text-xs">Open</button>
        </div>
    )
}