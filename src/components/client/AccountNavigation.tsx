import React from "react";
import "../../app/styles/globals.css"
import NavButton from "./NavButton";
import LogoutBtn from "./LogoutBtn";

async function AccountNavigation({userid} : {userid: number}) {

    return (
        <div className="min-w-[200px] flex flex-col place-items-start font-semibold text-gray-100">
            <nav className="grid grid-cols-1 grid-rows-4 place-items-start font-semibold">
                <NavButton params={{name: "home", symbol: "home", href: "/"}} />
                <NavButton params={{name: "profile", symbol: "person", href: `/account/${userid}`}} />
                <NavButton params={{name: "watchlists", symbol: "playlist_play", href: `/account/${userid}/watchlists`}} />
                <NavButton params={{name: "favourites", symbol: "favorite", href: `/account/${userid}/favourites`}} />
                <LogoutBtn />
            </nav>
        </div>
    );
}

export default AccountNavigation;