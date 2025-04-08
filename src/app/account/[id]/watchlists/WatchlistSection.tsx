"use client"
import CreateWatchlistBtn from "../../../../components/client/CreateWatchlistBtn";
import UserWatchlists from "./UserWatchlists";
import React, {useState} from "react";
import {Watchlists} from "../../../../lib/utils/types/watchlist";

export default function WatchlistSection({initWatchlists}: {initWatchlists: Watchlists[]}) {
    const [watchlists, setWatchlists] = useState<Watchlists[]>(initWatchlists);

    return (
        <>
            <CreateWatchlistBtn setWatchlists={setWatchlists} />
            <div className="flex flex-row flex-wrap mt-10 gap-10">
                <UserWatchlists watchlists={watchlists} />
            </div>
        </>
    )
}