"use client"
import CreateWatchlistBtn from "../../../../components/client/CreateWatchlistBtn";
import UserWatchlists from "./UserWatchlists";
import React, {useState} from "react";

interface Watchlists {
    playlistid: number;
    playlist_name: string;
    playlist_desc: string | null;
}

export default function WatchlistSection({initWatchlists}: {initWatchlists: UserWatchlists[]}) {
    const [watchlists, setWatchlists] = useState<UserWatchlists[]>(initWatchlists);

    return (
        <>
            <CreateWatchlistBtn setWatchlists={setWatchlists} />
            <div className="flex flex-row flex-wrap mt-10 gap-10">
                <UserWatchlists watchlists={watchlists} />
            </div>
        </>
    )
}