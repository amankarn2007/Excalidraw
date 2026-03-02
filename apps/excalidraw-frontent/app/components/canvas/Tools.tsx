import { ReactNode, useState } from "react"

type Shape = "mouse" | "rect" | "diamond" | "circle" | "arrow" | "line" | "pencil" | "text";

export default function Tools() {
    const [selectedTool, setSelectTool] = useState<Shape>("rect");
    
    return (
        <div className="absolute top-5 place-self-center bg-[#232329] flex text-white gap-3 py-1 px-3 rounded-lg items-center">
            <IconElem
                onClick={() => setSelectTool("mouse")} //set type as 'mouse'
                iconName="arrow_selector_tool"
                isActive={selectedTool === "mouse"} //true | false
            />
            <IconElem
                onClick={() => setSelectTool("rect")} 
                iconName={"rectangle"}
                isActive={selectedTool === "rect"}
            />
            <IconElem
                onClick={() => setSelectTool("diamond")} 
                fontIcon={<i className="fa-solid fa-diamond"></i>}
                isActive={selectedTool === "diamond"}
            />
            <IconElem
                onClick={() => setSelectTool("circle")} 
                iconName={"circle"}
                isActive={selectedTool === "circle"}
            />
            <IconElem
                onClick={() => setSelectTool("arrow")} 
                iconName="arrow_right_alt"
                isActive={selectedTool === "arrow"}
            />
            <IconElem
                onClick={() => setSelectTool("line")} 
                iconName="check_indeterminate_small"
                isActive={selectedTool === "line"}
            />
            <IconElem
                onClick={() => setSelectTool("pencil")} 
                iconName="stylus"
                isActive={selectedTool === "pencil"}
            />
            <IconElem
                onClick={() => setSelectTool("text")} 
                iconName="text_format"
                isActive={selectedTool === "text"}
            />
        </div>
    )
}


interface IconProps {
    iconName?: string,
    fontIcon?: ReactNode,
    isActive: boolean,
    onClick: () => void
}

function IconElem({ iconName, fontIcon, isActive, onClick }: IconProps) {
    return (
        <div onClick={onClick} className={`hover:bg-[#7a77a3] px-2 py-1 rounded-lg cursor-pointer 
        ${isActive ? "bg-[#7a77a3]": ""}`} >
            
            {iconName &&
                <span className="material-symbols-outlined text-lg! opacity-80">{iconName}</span>
            }

            {fontIcon &&
                <div>{fontIcon}</div>
            }
        </div>
    )
}