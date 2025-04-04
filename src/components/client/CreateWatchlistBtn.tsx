"use client"
import React, {useState} from "react";
import WatchlistForm from "./watchlist-form";

export default function CreateWatchlistBtn() {
    const [isFormVisible, setIsFormVisible] = useState<boolean>(false);

    return (
        <div>
            <button onClick={() => setIsFormVisible(true)}
                    className="w-full cursor-pointer text-left [border:none] p-2 bg-[transparent] text-gray-100 font-robotomono opacity-75 z-20">
                + New Watchlist
            </button>
            {isFormVisible && <WatchlistForm/>}
        </div>
    )
}
