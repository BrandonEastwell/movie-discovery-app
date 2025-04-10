"use client"
import React from "react";
import {useRouter} from "next/navigation";
import { motion } from "framer-motion";
import {Watchlists} from "../../../../lib/utils/types/watchlist";

export default function UserWatchlists({watchlists} : {watchlists: Watchlists[]}) {
    const router = useRouter();

    const handleNavigate = (e: any) => {
        const values = e.currentTarget.value
        const [playlist_name, playlistid] = values.split(','); // Split combined value
        router.push(`watchlists/${playlist_name}?id=${playlistid}`)
    }

    return (
        watchlists.map((watchlists) => (
            <motion.div initial={{backgroundColor: '#21212180'}} whileHover={{backgroundColor: '#212121'}} key={watchlists.id} className="max-h-[275px] min-h-[275px] max-w-[250px] cursor-pointer p-4 rounded">
                <div className="flex flex-col cursor-pointer justify-start gap-1 max-h-[300px] max-w-[250px] align-middle">
                    <button onClick={handleNavigate} value={`${watchlists.watchlistName},${watchlists.id}`} className="no-underline bg-transparent p-0 m-0">
                        <div className="w-[225px] h-[225px] bg-black cursor-pointer"></div>
                        <p className="w-full cursor-pointer text-left font-vt323 text-pearl-white text-[1.5rem] m-0 pt-1 whitespace-nowrap">{watchlists.watchlistName}</p>
                        <p className="w-full cursor-pointer text-left font-vt323 text-silver opacity-75 text-[0.8rem] m-0 overflow-hidden whitespace-nowrap">{watchlists.watchlistDesc}</p>
                    </button>
                </div>
            </motion.div>
        ))
    )
}