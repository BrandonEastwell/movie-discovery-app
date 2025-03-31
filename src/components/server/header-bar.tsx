import HeaderMenu from "../client/header-menu";
import React from "react";

export default function HeaderBar({isLoggedIn, userData} : {isLoggedIn: boolean, userData: { userid: number; username: string } | null}){
    return (
        <div className="w-full grid grid-cols-3">
            <h1 className="text-left self-center tracking-[0.3em] text-6xl text-[#5F43B2] font-vt323 font-semibold">
                SIVTER
            </h1>
            <h1 className="text-center self-center tracking-[0.1em] text-8xl text-white font-vt323 font-semibold">
                FILM
            </h1>
            <HeaderMenu isLoggedIn={isLoggedIn} userData={userData}></HeaderMenu>
        </div>
    );
}

