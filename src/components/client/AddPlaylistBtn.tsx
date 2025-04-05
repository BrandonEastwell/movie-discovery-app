"use client"
import Watchlist from "./Watchlist";
import React, {useState} from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCirclePlus} from "@fortawesome/free-solid-svg-icons";
import ReactDOM from "react-dom";

export default function AddToPlaylistBtn({ movieID } : { movieID: number }) {
    const [isVisible, setIsVisible] = useState(false);
    const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });

    const handleBtnClick = (event: React.MouseEvent) => {
        event.stopPropagation();
        const { clientX, clientY } = event;
        setCursorPosition({ x: clientX + 25, y: clientY + 25 });
        setIsVisible(!isVisible);
    };

    return (
        <>
            <button onClick={(e) => handleBtnClick(e)}
                    className="p-0 bg-transparent max-h-[32px] max-w-[32px] cursor-pointer">
                <FontAwesomeIcon className="text-pearl-white opacity-75" icon={faCirclePlus} size="xl"/>
            </button>
            {isVisible && ReactDOM.createPortal(
                <div onClick={(event) => { event.stopPropagation(); setIsVisible(false); }} className="absolute left-0 top-0 w-screen h-screen bg-transparent z-10">
                    <Watchlist cursorPosition={cursorPosition} movieid={movieID} />
                </div>, document.body
            )}
        </>
    )
}