import HeaderMenu from "../client/HeaderMenu";
import React from "react";
import Link from "next/link";

export default function HeaderBar({isLoggedIn, userData} : {isLoggedIn: boolean, userData: { userid: number; username: string } | null}){
    return (
        <div className="w-full grid grid-cols-3">
            <div className="flex flex-row place-items-center">
                <Link href="/" className="no-underline">
                    <h1 className="tracking-[0.3em] text-6xl text-[#5F43B2] font-vt323 font-semibold">
                        SIVTER
                    </h1>
                </Link>
            </div>
            <h1 className="text-center self-center tracking-[0.1em] text-8xl text-white font-vt323 font-semibold">
                FILM
            </h1>
            <HeaderMenu isLoggedIn={isLoggedIn} userData={userData}></HeaderMenu>
        </div>
    );
}

