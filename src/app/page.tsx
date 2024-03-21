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
        <div className="content-container grid grid-cols-layout grid-rows-layout">
            <div className="content-wrapper col-start-2 row-start-2">
                <div className="trending flex flex-row flex-nowrap overflow-hidden">
                    <div className="top-[0px] left-[0px] flex flex-col items-start justify-start text-left text-4rem text-pearl-white">
                        <b className="flex items-center w-full h-[5rem] font-vt323">
                            TRENDING FILM
                        </b>
                        <MoviesTrending movies={trending.results}/>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Page
