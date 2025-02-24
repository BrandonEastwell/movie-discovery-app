'use client'
import React, {useEffect, useState} from "react";
import WatchlistBtn from "../../../../components/client/create-watchlist-btn";
import {useRouter} from "next/navigation";

interface PlaylistProps {
    playlistid: number;
    playlist_name: string;
    playlist_desc: string | null;
}

export function Page() {
    const [playlists, setPlaylists] = useState<PlaylistProps[]>([]);
    const router = useRouter()
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

    const handleNavigate = (e: any) => {
        const values = e.currentTarget.value
        const [playlist_name, playlistid] = values.split(','); // Split combined value
        router.push(`watchlists/${playlist_name}?id=${playlistid}`)

    }

    return (
        <div className="wrapper w-full h-full flex flex-col gap-2 items-start justify-start flex-nowrap">
            <b className="flex items-center text-[3rem] font-vt323 text-pearl-white mt-4 ml-2 font-medium">
                Your watchlists
            </b>
            <WatchlistBtn></WatchlistBtn>
            <div className="flex flex-row flex-wrap mt-10 gap-10"> {
                playlists.map((playlist, index) => (
                    <div key={playlist.playlistid} className="max-h-[300px] max-w-[250px] p-4 rounded bg-[#212121]">
                        <div className="flex flex-col justify-start gap-1 max-h-[300px] max-w-[250px] align-middle">
                            <button onClick={handleNavigate} value={`${playlist.playlist_name},${playlist.playlistid}`} className="cursor-pointer no-underline bg-transparent p-0 m-0">
                                <div className="w-[225px] h-[225px] bg-black"></div>
                                <p className="w-full text-left font-vt323 text-pearl-white text-[1.5rem] m-0 pt-1 whitespace-nowrap">{playlist.playlist_name}</p>
                                <p className="w-full text-left font-vt323 text-silver opacity-75 text-[0.8rem] m-0 overflow-hidden whitespace-nowrap">{playlist.playlist_desc}</p>
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Page
