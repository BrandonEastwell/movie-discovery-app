"use client"
import React, {useState} from "react";
import WatchlistForm from "./WatchlistForm";
import ReactDOM from "react-dom";

export default function CreateWatchlistBtn() {
    const [isFormVisible, setIsFormVisible] = useState<boolean>(false);

    return (
        <>
            <button onClick={(event) => {event.stopPropagation(); setIsFormVisible(true)}}
                    className="w-full cursor-pointer text-left [border:none] p-2 bg-[transparent] text-gray-100 font-robotomono opacity-75">
                + New Watchlist
            </button>
            {isFormVisible && ReactDOM.createPortal(<WatchlistForm/>, document.body)}
        </>
    )
}
