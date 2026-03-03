import { ReactNode } from "react"

interface IconProps {
    iconName?: string,
    fontIcon?: ReactNode,
    isActive: boolean,
    onClick: () => void
}

export default function IconButton({ iconName, fontIcon, isActive, onClick }: IconProps) {
    return (
        <div onClick={onClick} className={`hover:bg-[#7a77a3] px-2 py-1 rounded-lg cursor-pointer ${isActive && "bg-[#7a77a3]"}`} >

            {iconName &&
                <span className="material-symbols-outlined text-lg! opacity-80">{iconName}</span>
            }

            {fontIcon &&
                <div>{fontIcon}</div>
            }
        </div>
    )
}