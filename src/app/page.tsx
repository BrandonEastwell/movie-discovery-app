import "./styles/globals.css"
import {Movies} from '../components/client/movies-list';
import {getTrendingWeekMovie, getTopRated, getUpcoming, getPopular} from "../lib/movieLists";
import React from "react";

export default async function Page() {
    const { trending, topRated, popular, upcoming } = await fetchMovieData()

    return (
        <div className="main-content w-full h-full col-span-1 col-start-2 row-start-3 z-0 overflow-auto no-scrollbar">
            <div className="w-full h-100 flex flex-col gap-10 justify-start overflow-hidden no-scrollbar">
                <b className="flex items-center text-[3rem] font-vt323 text-pearl-white mt-4 ml-2 font-medium">
                    TRENDING FILM
                </b>
                <div
                    className="flex w-full h-full flex-row gap-[3rem] overflow-hidden overflow-x-auto no-scrollbar">
                    <Movies movies={trending.results}/>
                </div>
                <b className="flex items-center text-[3rem] font-vt323 text-pearl-white mt-4 ml-2 font-medium">
                    POPULAR FILM
                </b>
                <div
                    className="flex w-full h-full flex-row gap-[3rem] overflow-hidden overflow-x-auto no-scrollbar">
                    <Movies movies={popular.results}/>
                </div>
                <b className="flex items-center text-[3rem] font-vt323 text-pearl-white mt-4 ml-2 font-medium">
                    CRITICALLY ACCLAIMED FILM
                </b>
                <div
                    className="flex w-full h-full flex-row gap-[3rem] overflow-hidden overflow-x-auto no-scrollbar">
                    <Movies movies={topRated.results}/>
                </div>
                <b className="flex items-center text-[3rem] font-vt323 text-pearl-white mt-4 ml-2 font-medium">
                    UPCOMING FILM
                </b>
                <div
                    className="flex w-full h-full flex-row gap-[3rem] overflow-hidden overflow-x-auto no-scrollbar">
                    <Movies movies={upcoming.results}/>
                </div>
            </div>
        </div>
    )
}

async function fetchMovieData() {
    const trending = await getTrendingWeekMovie()
    const topRated = await getTopRated()
    const popular = await getPopular()
    const upcoming = await getUpcoming()

    return {
        trending,
        topRated,
        popular,
        upcoming
    }
}