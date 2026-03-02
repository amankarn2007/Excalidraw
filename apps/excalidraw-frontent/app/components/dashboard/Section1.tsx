

export default function Section1() {
    return (
        <div className="flex gap-8 justify-center pt-10">
            <Card icon={<i className="fa-solid fa-plus"></i>} iconColor="blue" label="Blank canvas" />
            <Card icon={<i className="fa-regular fa-folder-open"></i>} iconColor="green" label="Form template" />
            <Card icon={<i className="fa-solid fa-user-group"></i>} iconColor="orange" label="Start collab" />
            <Card icon={<i className="fa-regular fa-clock"></i>} iconColor="pink" label="Recent" />
        </div>
    )
}

function Card({icon, iconColor, label}: {icon: React.ReactNode, iconColor: string, label: string}) {
    return (
        <div className="flex flex-col outline-1 outline-gray-300 hover:outline-blue-300 py-3 w-65 items-center rounded-2xl bg-white cursor-pointer">
            <p style={{ color: iconColor }}> {icon} </p>
            <p className="text-xs pt-2"> {label} </p>
        </div>
    )
}