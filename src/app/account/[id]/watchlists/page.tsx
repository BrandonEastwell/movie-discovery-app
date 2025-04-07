import React from "react";
import {AuthService} from "../../../../lib/services/authService";
import WatchlistService from "../../../../lib/services/watchlistService";
import WatchlistSection from "./WatchlistSection";

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
        <div className="w-full h-full flex flex-col gap-2 items-start justify-start flex-nowrap">
            <h1 className="flex items-center text-5xl font-vt323 text-pearl-white mt-4 ml-2 font-bold">
                Your Watchlist Library
            </h1>
            <WatchlistSection initWatchlists={watchlists} />
        </div>
    )
}
