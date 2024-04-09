import "../app/styles/globals.css"
import MoviesTrending from '../components/client/movies-trending';
import {getTrendingWeekMovie} from "../lib/movieLists";
import React from "react";
export async function Page() {
    const trending = await getTrending()
    async function getTrending() {
        let trendingMovies = getTrendingWeekMovie()
        console.log(trendingMovies)
        return await trendingMovies
    }
    return (
        <div className="wrapper w-full h-full flex flex-col items-start justify-start flex-nowrap overflow-hidden">
            <b className="flex items-center h-[5rem] font-vt323">
                TRENDING FILM
            </b>
            <div
                className="w-full h-full top-[0px] left-[0px] flex flex-row flex-auto items-start justify-start gap-[1rem] overflow-x-scroll .scrollbar-hide">
                <MoviesTrending movies={trending.results}/>
            </div>
            <div
                className="w-full h-full top-[0px] left-[0px] flex flex-row flex-auto items-start justify-start gap-[1rem] overflow-x-scroll .scrollbar-hide">
                <MoviesTrending movies={trending.results}/>
            </div>
            <div
                className="w-full h-full top-[0px] left-[0px] flex flex-row flex-auto items-start justify-start gap-[1rem] overflow-x-scroll .scrollbar-hide">
                <MoviesTrending movies={trending.results}/>
            </div>
            <div
                className="w-full h-full top-[0px] left-[0px] flex flex-row flex-auto items-start justify-start gap-[1rem] overflow-x-scroll .scrollbar-hide">
                <MoviesTrending movies={trending.results}/>
            </div>
        </div>
    )
}

export default Page
