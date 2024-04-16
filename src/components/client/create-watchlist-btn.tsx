'use client'
import React, {useState} from "react";
import WatchlistForm from "./watchlist-form";
export default function WatchlistBtn() {
    const [isVisible, setIsVisible] = useState<boolean>(false);
    function handleCreatePlaylist() {
        setIsVisible(true)
    }
    return (
        <div>
            <button onClick={handleCreatePlaylist}
                    className="w-full cursor-pointer text-left [border:none] p-2 bg-[transparent] text-gray-100 font-robotomono opacity-75 z-20">
                + New Watchlist
            </button>
            {isVisible && <WatchlistForm/>}
        </div>
    )
}
