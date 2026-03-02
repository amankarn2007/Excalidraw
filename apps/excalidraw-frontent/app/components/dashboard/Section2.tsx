"use client";
import { useState } from "react";


export default function Section2() {
    const [showCard, setShowCard] = useState(true);

    return (
        <div className="px-8">

            <div className="pt-10 flex justify-between px-2 items-center">
                <p className="text-sm font-medium opacity-80">Recent drawings</p>

                <div className="border border-gray-300 rounded-lg text-sm flex justify-center">
                    <button className="hover:bg-gray-300 p-1 rounded-lg" onClick={() => setShowCard(true)}>
                        <span className="material-symbols-outlined text-lg! px-1">grid_on</span>
                    </button>
                    <button className="hover:bg-gray-300 p-1 px-2 rounded-lg" onClick={() => setShowCard(false)}>
                        <i className="fa-solid fa-bars-staggered"></i>
                    </button>
                </div>
            </div>

            { showCard ? 
                <div className="flex flex-wrap justify-center gap-5 mt-5">
                    <Card label="System Architecture" time="2 min ago" />
                    <Card label="Wireframe v2" time="1 hour ago" />
                    <Card label="Flowchart Onboarding" time="2 min ago" />
                    <Card label="Brand Moodboard" time="Yesterday" />
                    <Card label="DB Schema" time="2 days ago" />
                    <Card label="Sprint Planning" time="3 days ago" />
                </div> :

                <div className="mt-5 mx-2 px-4 border rounded-xl border-gray-300">
                    <List label="System Architecture" time="2 min ago" />
                    <List label="Wireframe v2" time="1 hour ago" />
                    <List label="Flowchart Onboarding" time="2 min ago" />
                    <List label="Brand Moodboard" time="Yesterday" />
                    <List label="DB Schema" time="2 days ago" />
                    <List label="Sprint Planning" time="3 days ago" />
                </div>
            }
        </div>
    )
}

function Card({label, time}: {label: string, time: string}) {
    return (
        <div className="w-90 rounded-2xl border border-gray-300 shadow cursor-pointer hover:border-blue-400">
            <div className="h-30 bg-blue-200 rounded-t-2xl"></div>

            <div className="flex justify-between items-center bg-white px-3 py-5 rounded-b-2xl">
                <div className="flex-col">
                    <h4 className="text-sm"> {label} </h4>
                    <p className="text-xs opacity-80"> {time} </p>
                </div>

                <div className="hover:bg-gray-300 px-0.5 rounded-md">
                    <i className="fa-solid fa-ellipsis text-sm"></i>
                </div>
            </div>
        </div>
    )
}

function List({label, time}: {label: string, time: string}) {
    return (
        <div className="flex justify-between items-center my-2 cursor-pointer rounded-lg py-2 px-3 hover:bg-gray-200">
            <div className="flex">
                <div className="bg-blue-100 w-10 h-10 rounded-lg"></div>

                <div className="flex-col px-3">
                    <h4 className="text-sm"> {label} </h4>
                    <p className="text-xs opacity-80"> {time} </p>
                </div>
            </div>

            <div className=" hover:bg-gray-300 px-0.5 rounded-md">
                <i className="fa-solid fa-ellipsis"></i>
            </div>
        </div>
    )
}