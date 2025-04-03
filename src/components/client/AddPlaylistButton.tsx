"use client"
import Watchlist from "./watchlist-list";
import React, {useState} from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCirclePlus} from "@fortawesome/free-solid-svg-icons";

export default function AddToPlaylist({movieId} : {movieId: number}) {
    const [isVisible, setIsVisible] = useState(false); // Add isVisible state
    const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
    const [watchlistMovieID, setWatchlistMovieID] = useState<number | undefined>(undefined);

    const handlePlaylistClick = (event: React.MouseEvent, id: number) => {
        event.stopPropagation(); // Prevent the click event from bubbling up to parent elements
        const { clientX, clientY } = event;
        setCursorPosition({ x: clientX + 25, y: clientY + 25 });
        setIsVisible(!isVisible); // Toggle visibility of Watchlist component
        setWatchlistMovieID(id); // Set the movie id in state
    };

    return (
        <>
            <button onClick={(e) => handlePlaylistClick(e, movieId)}
                    className="p-0 bg-transparent max-h-[32px] max-w-[32px] cursor-pointer">
                <FontAwesomeIcon className="text-pearl-white opacity-75" icon={faCirclePlus} size="xl"/>
            </button>
            {isVisible && cursorPosition && (
                <div className="fixed left-0 top-0 w-screen h-screen bg-transparent z-10"
                     onClick={() => setIsVisible(false)}>
                    <Watchlist cursorPosition={cursorPosition} movieid={watchlistMovieID}></Watchlist>
                </div>
            )}
        </>
    )
}