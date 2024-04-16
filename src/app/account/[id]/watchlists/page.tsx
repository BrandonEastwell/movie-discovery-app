'use client'
import "../../styles/globals.css"
import React, {useEffect, useState} from "react";
import WatchlistBtn from "../../../../components/client/create-watchlist-btn";
import Link from "next/link";

interface PlaylistProps {
    playlistid: number;
    playlist_name: string;
    playlist_desc: string | null;
}

export async function Page() {
    const [playlists, setPlaylists] = useState<PlaylistProps[]>([]);

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


    return (
        <div className="wrapper w-full h-full flex flex-col gap-10 items-start justify-start flex-nowrap">
            <b className="flex items-center text-[3rem] font-vt323 text-pearl-white mt-4 ml-2 font-medium">
                Your watchlists
            </b>
            <WatchlistBtn></WatchlistBtn>
            <div className="flex flex-row flex-wrap "> {
                playlists.map((playlist, index) => (
                <div key={playlist.playlistid} className="flex flex-col gap-1 max-h-[300px] max-w-[250px] align-middle">
                    <Link href={`/${playlist.playlist_name}?id=${playlist.playlistid.toString()}`} className="max-h-[250px] max-w-[250px]">
                        <div className="w-[250px] h-[250px] bg-black"></div>
                        <p className="w-full text-left font-michroma text-pearl-white text-[1rem] p-2">{playlist.playlist_name}</p>
                        <p className="w-full text-left font-michroma text-silver opacity-75 text-[0.8rem] p-2 overflow-hidden">{playlist.playlist_desc}</p>
                    </Link>
                </div>))}
            </div>
        </div>
    )
}

export default Page
