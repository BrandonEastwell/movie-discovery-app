import React from "react";
import CreateWatchlistBtn from "../../../../components/client/CreateWatchlistBtn";
import Watchlists from "../../../../components/client/Watchlists";
import {AuthService} from "../../../../lib/services/authService";
import WatchlistService from "../../../../lib/services/watchlistService";

interface Playlists {
    playlistid: number;
    playlist_name: string;
    playlist_desc: string | null;
}

export default async function Page() {
    const {isLoggedIn, userData} = await AuthService.getAuthState();
    let watchlists : Playlists[] = [];

    if (isLoggedIn && userData?.userid) {
        watchlists = await WatchlistService.getAllUserWatchlists(userData?.userid)
    }

    return (
        <div className="wrapper w-full h-full flex flex-col gap-2 items-start justify-start flex-nowrap">
            <b className="flex items-center text-[3rem] font-vt323 text-pearl-white mt-4 ml-2 font-medium">
                YOUR WATCHLIST
            </b>
            <CreateWatchlistBtn />
            <div className="flex flex-row flex-wrap mt-10 gap-10">
                <Watchlists initPlaylists={watchlists} />
            </div>
        </div>
    )
}
