"use client"
import React from "react";
import {useRouter} from "next/navigation";

interface Watchlists {
    playlistid: number;
    playlist_name: string;
    playlist_desc: string | null;
}

export default function Watchlists({watchlists} : {watchlists: Watchlists[]}) {
    const router = useRouter();

    const handleNavigate = (e: any) => {
        const values = e.currentTarget.value
        const [playlist_name, playlistid] = values.split(','); // Split combined value
        router.push(`watchlists/${playlist_name}?id=${playlistid}`)
    }

    return (
        watchlists.map((watchlists) => (
            <div key={watchlists.playlistid} className="max-h-[300px] max-w-[250px] p-4 rounded bg-[#212121]">
                <div className="flex flex-col justify-start gap-1 max-h-[300px] max-w-[250px] align-middle">
                    <button onClick={handleNavigate} value={`${watchlists.playlist_name},${watchlists.playlistid}`} className="cursor-pointer no-underline bg-transparent p-0 m-0">
                        <div className="w-[225px] h-[225px] bg-black"></div>
                        <p className="w-full text-left font-vt323 text-pearl-white text-[1.5rem] m-0 pt-1 whitespace-nowrap">{watchlists.playlist_name}</p>
                        <p className="w-full text-left font-vt323 text-silver opacity-75 text-[0.8rem] m-0 overflow-hidden whitespace-nowrap">{watchlists.playlist_desc}</p>
                    </button>
                </div>
            </div>
        ))
    )
}