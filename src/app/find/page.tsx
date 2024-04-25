import MoviesSearch from "../../components/client/movies-search";
import {getMediaBySearch} from "../../lib/movieLists";
import React from "react";
export async function Page({ searchParams, }: { searchParams?: { q?: string; }; }) {
    const query = searchParams?.q || '';

    const moviesResult = await getMediaBySearch(query.replaceAll(' ', '%20'));
        return (
            <div className="w-full h-full flex flex-col gap-1 justify-start overflow-hidden no-scrollbar">
                <b className="flex items-center text-[1rem] font-vt323 text-pearl-white mt-4 ml-2 font-medium">
                    {" results for " + query}
                </b>
                <div className="flex flex-row flex-wrap mt-10 gap-10 overflow-hidden overflow-x-hidden no-scrollbar">
                    <MoviesSearch movies={moviesResult.results} query={query}/>
                </div>
            </div>
        )
}

export default Page