"use client"
import React, {useEffect, useState} from "react";
import CreateWatchlistBtn from "./CreateWatchlistBtn";
import {getWatchlistDetails, addMovieToWatchlist} from "../../lib/api/client_requests/watchlist";
import {AnimatePresence, motion} from "framer-motion";
import {Watchlists} from "../../lib/utils/types/watchlist";
import CheckMark from "../../assets/playlist_add_check_circle_24dp_E3E3E3_FILL0_wght400_GRAD0_opsz24.svg"

export default function WatchlistPopup({ cursorPosition, movieid} : {cursorPosition: { x: number; y: number }, movieid: number}) {
    const [watchlists, setWatchlists] = useState<Watchlists[]>([]);

    useEffect(() => {
        getWatchlistDetails().then((res) => {
            if (res) {
                setWatchlists(res.result)
            }
        });

    }, []);

    const isMovieInWatchlist = (playlistMovies?: { movieid: number }[]) => {
        return playlistMovies?.some(movie => movie.movieid === movieid) || false;
    }

    const handleAddToWatchlist = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        event.stopPropagation();
        event.preventDefault();

        const watchlistid = event.currentTarget.value;

        setWatchlists(prevState => {
            const i = prevState.findIndex((watchlist) => watchlist.playlistid === parseInt(watchlistid));
            if (i === -1) return prevState;

            const copyOfPrevState = JSON.parse(JSON.stringify(prevState));

            if (copyOfPrevState[i].playlistMovies.some((movie: { movieid: number; }) => movie.movieid === movieid)) {
                copyOfPrevState[i].playlistMovies = copyOfPrevState[i].playlistMovies.filter((movie: { movieid: number; }) => movie.movieid !== movieid)
            } else {
                copyOfPrevState[i].playlistMovies.push({movieid: movieid})
            }

            return copyOfPrevState;
        })

        addMovieToWatchlist(watchlistid, movieid);
    }

    return (
        <AnimatePresence>
            <motion.div initial={{scale: 0}} animate={{scale: 1}} exit={{scale: 0}}
                        className="absolute w-[200px] bg-[#212121] border p-2 rounded flex flex-col gap-1 z-20" style={{ left: `${cursorPosition.x}px`, top: `${cursorPosition.y}px`, height: 'auto'}}>
                <CreateWatchlistBtn setWatchlists={setWatchlists} />
                {watchlists.map((watchlist) => (
                    <motion.button initial={{backgroundColor: '#212121'}} whileHover={{backgroundColor: '#333333'}}
                                   key={watchlist.playlistid} className="w-full min-h-[45px] flex flex-row justify-between items-center rounded font-iconsolata bg-transparent text-pearl-white p-2 cursor-pointer"
                                   type="submit" onClick={(event) => {handleAddToWatchlist(event)}} value={`${watchlist.playlistid},${movieid}`}>
                        {watchlist.playlist_name}
                        {isMovieInWatchlist(watchlist.playlistMovies) && <motion.span initial={{scale: 0}} animate={{scale: 1}} exit={{scale: 0}}
                            className="text-end"><CheckMark fill="currentColor" className="text-Purple" /></motion.span>}
                    </motion.button>
                ))}
            </motion.div>
        </AnimatePresence>
    )
}