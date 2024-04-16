'use client'
import React, {useEffect, useState} from "react";
import WatchlistBtn from "./create-watchlist-btn";

interface WatchlistListProps {
    cursorPosition: { x: number; y: number };
    movieid: number;
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
        const getPlaylists = async () => {
            try {
                await fetch('http://localhost:3000/api/watchlist', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    }
                }).then(async response => {
                    if (!response.ok) {
                        const errorData = response.json();
                        console.error('Action failed:', errorData);
                    }
                    return response.json()
                }).then(data => {
                    const result = data.result;
                    setPlaylists(result)
                }).catch(errorData => {
                    console.error('Action failed:', errorData);

                })
            } catch (error : any) {
                console.error('Action failed:', error.response?.data);
            }
        };
        getPlaylists()
    }, []);

    const handlePlaylistAdd = async (e : any) => {
        const values = e.currentTarget.value
        const [playlistid, movieid] = values.split(','); // Split combined value
        try {
            const response = await fetch('http://localhost:3000/api/watchlist-add', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ playlistid, movieid }),
            });
            const data = await response.json()
            if (response.ok) {
                setMessage(data.message);
                setError(null);

            } else {
                setMessage(null);
                setError(data.error);
                console.error('Action failed:', data.error);
            }
        } catch (error : any) {
            console.error('Action failed:', error.response?.data);
        }
    };

    return (
        <div className="absolute bg-[#212121] border p-2 rounded flex flex-col gap-1 z-20" style={{ left: `${cursorPosition.x}px`, top: `${cursorPosition.y}px`, width: '200px', height: 'auto'}}>
            <WatchlistBtn></WatchlistBtn>
            {
                playlists.map((playlist, index) => (
                    <button key={playlist.playlistid} className="w-full font-robotomono bg-transparent text-pearl-white rounded p-2 cursor-pointer text-start z-20"
                            type="submit" onClick={handlePlaylistAdd} value={`${playlist.playlistid},${movieid}`}>
                        {playlist.playlist_name}
                    </button>
                ))
            }
            <div className="message-handle w-full flex flex-col">
                {message && <p className="font-michroma text-Purple text-[1rem] m-1">{message}</p>}
                {error && <p className="font-michroma text-red-800 text-[1rem] m-1">{error}</p>}
            </div>
        </div>
    );
};

export default Watchlist;