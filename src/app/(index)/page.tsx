import "../styles/globals.css"
import MoviesTrending from '../../components/client/movies-trending';
import {getTrendingWeekMovie} from "../../lib/movieLists";
import React from "react";
export async function Page() {
    const trending = await getTrending()
    async function getTrending() {
        let trendingMovies = getTrendingWeekMovie()
        console.log(trendingMovies)
        return await trendingMovies
    }
    return (
        <div className="wrapper w-full h-full flex flex-col gap-10 items-start justify-start flex-nowrap">
            <b className="flex items-center text-[3rem] font-vt323 text-pearl-white mt-4 ml-2 font-medium">
                TRENDING FILM
            </b>
            <div className="flex w-full h-full flex-row gap-[3rem] overflow-hidden overflow-x-auto no-scrollbar">
                <MoviesTrending movies={trending.results}/>
            </div>
        </div>
    )
}

export default Page
