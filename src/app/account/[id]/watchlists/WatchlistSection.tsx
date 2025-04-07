"use client"
import CreateWatchlistBtn from "../../../../components/client/CreateWatchlistBtn";
import Watchlists from "./Watchlists";
import React, {useState} from "react";

interface Watchlists {
    playlistid: number;
    playlist_name: string;
    playlist_desc: string | null;
}

export default function WatchlistSection({initWatchlists}: {initWatchlists: Watchlists[]}) {
    const [watchlists, setWatchlists] = useState<Watchlists[]>(initWatchlists);

    return (
        <>
            <CreateWatchlistBtn setWatchlists={setWatchlists} />
            <div className="flex flex-row flex-wrap mt-10 gap-10">
                <Watchlists watchlists={watchlists} />
            </div>
        </>
    )
}