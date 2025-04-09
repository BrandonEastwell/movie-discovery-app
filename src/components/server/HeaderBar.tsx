import HeaderMenu from "../client/HeaderMenu";
import React from "react";
import Link from "next/link";
import SearchBar from "../client/SearchBar";

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
            <div className="w-full flex flex-row place-content-center gap-4 py-2">
                <SearchBar/>
            </div>
            <HeaderMenu isLoggedIn={isLoggedIn} userData={userData}></HeaderMenu>
        </div>
    );
}

