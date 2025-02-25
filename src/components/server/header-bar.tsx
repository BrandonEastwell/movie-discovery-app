import HeaderMenu from "../client/header-menu";
import React from "react";

export default function HeaderBar({isLoggedIn, userData} : {isLoggedIn: boolean, userData: { userid: number; username: string } | null}){
    return (
        <div className="fixed grid grid-cols-3 w-full max-w-[1920px] pt-0 font-vt323">
            <h1 className="place-self-start self-center m-0 p-0 tracking-[0.31em] text-[3rem] text-[#5F43B2] font-medium">
                SIVTER
            </h1>
            <h1 className="place-self-center m-0 p-0 tracking-[0.31em] text-[4rem] text-white font-michroma font-medium">
                FILM
            </h1>
            <HeaderMenu isLoggedIn={isLoggedIn} userData={userData}></HeaderMenu>
        </div>
    );
};

