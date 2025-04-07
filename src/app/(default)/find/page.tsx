import React from "react";
import MoviesSearchList from "../../../components/client/MoviesSearchList";
import {getMediaBySearch} from "../../../lib/api/TMDB/movieLists";

export default async function Page({ searchParams }: { searchParams?: Promise<{ q?: string }> }) {
    const query = (await searchParams)?.q || '';
    const moviesResult = await getMediaBySearch(query.replaceAll(' ', '%20'));

    return (
        <div className="w-full h-full flex flex-col gap-1 justify-start overflow-hidden no-scrollbar">
            <b className="flex items-center text-lg font-vt323 text-pearl-white mt-4 ml-2 font-semibold">
                {"results for " + query}
            </b>
            <div className="grid grid-cols-[repeat(auto-fit,minmax(150px,250px))] mt-10 gap-7 overflow-x-hidden no-scrollbar">
                <MoviesSearchList movies={moviesResult.results} query={query}/>
            </div>
        </div>
    )
}