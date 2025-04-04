"use client"
import React, {useEffect, useState} from "react";
import CreateWatchlistBtn from "./CreateWatchlistBtn";
import {getPlaylists, addPlaylist} from "../../lib/api/client/watchlist";

interface WatchlistListProps {
    cursorPosition: { x: number; y: number };
    movieid: number | undefined;
}

interface PlaylistProps {
    playlistid: number;
    playlist_name: string;
    playlist_desc: string | null;
}

const Watchlist: React.FC<WatchlistListProps> = ({ cursorPosition, movieid}) => {
    const [playlists, setPlaylists] = useState<PlaylistProps[]>([]);
    const [message, setMessage] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        getPlaylists().then((res) => {
            if (res) {
                setPlaylists(res.result)
            }
        });
    }, []);

    return (
        <div className="absolute w-[200px] bg-[#212121] border p-2 rounded flex flex-col gap-1 z-20" style={{ left: `${cursorPosition.x}px`, top: `${cursorPosition.y}px`, height: 'auto'}}>
            <CreateWatchlistBtn />
            { playlists.map((playlist) => (
                <button key={playlist.playlistid} className="w-full font-robotomono bg-transparent text-pearl-white rounded p-2 cursor-pointer text-start z-20"
                        type="submit" onClick={addPlaylist} value={`${playlist.playlistid},${movieid}`}>
                    {playlist.playlist_name}
                </button>
            ))}
            <div className="message-handle w-full flex flex-col">
                {message && <p className="font-michroma text-Purple text-[1rem] m-1">{message}</p>}
                {error && <p className="font-michroma text-red-800 text-[1rem] m-1">{error}</p>}
            </div>
        </div>
    );
};

export default Watchlist;