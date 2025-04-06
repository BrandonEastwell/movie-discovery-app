"use client"
import React, {useEffect, useState} from "react";
import CreateWatchlistBtn from "./CreateWatchlistBtn";
import {getWatchlist, addWatchlist} from "../../lib/api/client/watchlist";
import {AnimatePresence, motion} from "framer-motion";

interface Playlists {
    playlistid: number;
    playlist_name: string;
    playlist_desc: string | null;
}

export default function WatchlistPopup({ cursorPosition, movieid} : {cursorPosition: { x: number; y: number }, movieid: number | undefined}) {
    const [isVisible, setIsVisible] = useState(true);
    const [playlists, setPlaylists] = useState<Playlists[]>([]);

    useEffect(() => {
        getWatchlist().then((res) => {
            if (res) {
                setPlaylists(res.result)
            }
        });
    }, []);

    const handleAddToWatchlist = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        event.stopPropagation();
        event.preventDefault();
        setIsVisible(false)

        const values = event.currentTarget.value;
        const [watchlistID, movieID] = values.split(',');

        addWatchlist(watchlistID, movieID);
    }

    return (
        <AnimatePresence>
            {isVisible &&
            <motion.div initial={{scale: 0}} animate={{scale: 1}} exit={{scale: 0}}
                        className="absolute w-[200px] bg-[#212121] border p-2 rounded flex flex-col gap-1 z-20" style={{ left: `${cursorPosition.x}px`, top: `${cursorPosition.y}px`, height: 'auto'}}>
                <CreateWatchlistBtn />
                {playlists.map((playlist) => (
                    <motion.button initial={{backgroundColor: '#212121'}} whileHover={{backgroundColor: '#333333'}}
                                   key={playlist.playlistid} className="w-full rounded font-iconsolata bg-transparent text-pearl-white p-2 cursor-pointer text-start"
                                   type="submit" onClick={(event) => {handleAddToWatchlist(event)}} value={`${playlist.playlistid},${movieid}`}>
                        {playlist.playlist_name}
                    </motion.button>
                ))}
            </motion.div>}
        </AnimatePresence>
    );
};