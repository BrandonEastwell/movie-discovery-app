"use client"
import React, {useEffect, useState} from "react";
import CreateWatchlistBtn from "./CreateWatchlistBtn";
import {getWatchlistDetails, addMovieToWatchlist} from "../../lib/api/client_requests/watchlist";
import {AnimatePresence, motion} from "framer-motion";
import {Watchlists} from "../../lib/utils/types/watchlist";
import CheckMark from "../../assets/playlist_add_check_circle_24dp_E3E3E3_FILL0_wght400_GRAD0_opsz24.svg"

export default function WatchlistPopup({ cursorPosition, movieId} : {cursorPosition: { x: number; y: number }, movieId: number}) {
    const [watchlists, setWatchlists] = useState<Watchlists[]>([]);

    useEffect(() => {
        getWatchlistDetails().then((res) => {
            if (res) {
                setWatchlists(res.result)
            }
        });

    }, []);

    const isMovieInWatchlist = (watchlistMovies?: { movieId: number }[]) => {
        return watchlistMovies?.some(movie => movie.movieId === movieId) || false;
    }

    const handleAddToWatchlist = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        event.stopPropagation();
        event.preventDefault();

        const watchlistid = event.currentTarget.value;

        setWatchlists(prevState => {
            const i = prevState.findIndex((watchlist) => watchlist.id === parseInt(watchlistid));
            if (i === -1) return prevState;

            const copyOfPrevState = JSON.parse(JSON.stringify(prevState));

            if (copyOfPrevState[i].playlistMovies.some((movie: { movieid: number; }) => movie.movieid === movieId)) {
                copyOfPrevState[i].playlistMovies = copyOfPrevState[i].playlistMovies.filter((movie: { movieid: number; }) => movie.movieid !== movieId)
            } else {
                copyOfPrevState[i].playlistMovies.push({movieid: movieId})
            }

            return copyOfPrevState;
        })

        addMovieToWatchlist(watchlistid, movieId);
    }

    return (
        <AnimatePresence>
            <motion.div initial={{scale: 0}} animate={{scale: 1}} exit={{scale: 0}}
                        className="absolute w-[200px] bg-[#212121] border p-2 rounded flex flex-col gap-1 z-20" style={{ left: `${cursorPosition.x}px`, top: `${cursorPosition.y}px`, height: 'auto'}}>
                <CreateWatchlistBtn setWatchlists={setWatchlists} />
                {watchlists.map((watchlist) => (
                    <motion.button initial={{backgroundColor: '#212121'}} whileHover={{backgroundColor: '#333333'}}
                                   key={watchlist.id} className="w-full min-h-[45px] flex flex-row justify-between items-center rounded font-iconsolata bg-transparent text-pearl-white p-2 cursor-pointer"
                                   type="submit" onClick={(event) => {handleAddToWatchlist(event)}} value={`${watchlist.id},${movieId}`}>
                        {watchlist.watchlistName}
                        {isMovieInWatchlist(watchlist.watchlistMovies) && <motion.span initial={{scale: 0}} animate={{scale: 1}} exit={{scale: 0}}
                                                                                       className="text-end"><CheckMark fill="currentColor" className="text-Purple" /></motion.span>}
                    </motion.button>
                ))}
            </motion.div>
        </AnimatePresence>
    )
}