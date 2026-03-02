"use client"

import { HTTP_BACKEND } from "@/config";
import axios from "axios";
import { useEffect, useRef, useState } from "react";


export function AuthPage({isSignin}: {
    isSignin: boolean
}) {
    const emailRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);
    const nameRef = useRef<HTMLInputElement>(null);
    const [msg, setMsg] = useState(""); //backend response msg


    useEffect(() => { //msg aur input box ko clear krega after 5 sec\
        //clear the input box
        if (emailRef.current) emailRef.current.value = "";
        if (passwordRef.current) passwordRef.current.value = "";
        if (nameRef.current) nameRef.current.value = "";

        if(msg) {
            const timer = setTimeout(() => {
                setMsg("");
            }, 5000);

            return () => clearTimeout(timer);
        }
    }, [msg])


    async function Signin() { //login func
        try {
            const email = emailRef.current?.value;
            const password = passwordRef.current?.value;

            const response = await axios.post(`${HTTP_BACKEND}/signin`, {
                email,
                password
            })

            if(response.status === 200 ){
                setMsg(response.data.message);
            }
            //console.log(response.data);

            //now set the token in headers
            

        } catch (err: any) {
            if(err.response) {
                if(err.response.status === 400) {
                    setMsg("Something is missing");

                } else if(err.response.status === 401) {
                    setMsg("Wrong password");

                } else if(err.response.status === 404) {
                    setMsg("Can't find the user");
                } else {
                    setMsg("Something is wrong, try again");
                }
            }
            console.log(err);
        }
    }

    async function Signup() { //register func

        try {
            const email = emailRef.current?.value;
            const password = passwordRef.current?.value;
            const name = nameRef.current?.value;
            
            const response = await axios.post(`${HTTP_BACKEND}/signup`, {
                email,
                password,
                name
            })

            if(response.status === 200) {
                setMsg("User created successfully");
            }
    
            console.log(response);
        } catch (err: any) {
            if(err.response) {
                if(err.response.status === 409) {
                    setMsg("Username already exists in database");
                }
            }
        }
    }

    async function sendBackendReq() { //send sigin or signup req
        if(isSignin) {
            await Signin();
        } else {
            Signup();
        }
    }

    return (
        <div className="w-screen h-screen flex justify-center items-center bg-gray-400">
            <div className="bg-white h-130 w-100 flex flex-col rounded-lg p-2 pb-5 m-2 justify-center items-center shadow shadow-blue-400 hover:shadow-2xl">

                <h2 className="text-black text-4xl font-bold pt-5 mb-2">{isSignin ? "Signin Page" : "Signup Page"}</h2>

                <p className="text-black mb-10">Enter your credintials to connect with us</p>

                { msg && 
                    <p className="text-sm font-medium text-black tracking-tight italic"> {msg} </p>
                }

                <div className="flex flex-col items-center w-full px-5">
                    { !isSignin && 
                        <div className="w-full">
                            <label>Name</label>
                            <input type="name" placeholder="Enter your name" className="border border-gray-500 py-2 rounded-md text-black mb-2 mt-1 pl-5 w-full" ref={nameRef}/>
                        </div>
                    }

                    <div className="w-full">
                        <label>Email</label>
                        <input type="name" placeholder="Enter your email" className="border border-gray-500 py-2 rounded-md text-black mb-2 mt-1 pl-5 w-full" ref={emailRef}/>
                    </div>

                    <div className="w-full">
                        <label>Password</label>
                        <input type="password" placeholder="Enter your name" className="border border-gray-500 py-2 rounded-md text-black mb-2 mt-1 pl-5 w-full" ref={passwordRef}/>
                    </div>
                </div>

                <button className="bg-black py-2 w-9/10 rounded-md text-white mt-15 hover:bg-gray-800 cursor-pointer" onClick={sendBackendReq}> 
                    {isSignin ? "Signin" : "Signup"}
                </button>
                
                {!isSignin && 
                    <p className="pt-2 pb-5">Already have an account? <a href="/signin" className="underline hover:no-underline">Signin</a></p>
                }
            </div>
        </div>
    )
}