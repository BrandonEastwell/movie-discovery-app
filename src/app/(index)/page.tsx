import "../styles/globals.css"
import {
    MovieList, Recommended,
} from '../../components/client/movies-list';
import {getTrendingWeekMovie, getTopRated, getUpcoming, getPopular} from "../../lib/movieLists";

export async function Page() {
    const trending = await getTrendingWeekMovie()
    const topRated = await getTopRated()
    const popular = await getPopular()
    const upcoming = await getUpcoming()

    return (
        <div className="w-full h-100 flex flex-col gap-10 justify-start overflow-auto no-scrollbar">
            <b className="flex items-center text-[3rem] font-vt323 text-pearl-white mt-4 ml-2 font-medium">
                TRENDING FILM
            </b>
            <div className="flex w-full h-full flex-row gap-[3rem] overflow-hidden overflow-x-auto no-scrollbar">
                <MovieList movies={trending.results}/>
            </div>
            <Recommended></Recommended>
            <b className="flex items-center text-[3rem] font-vt323 text-pearl-white mt-4 ml-2 font-medium">
                POPULAR FILM
            </b>
            <div className="flex w-full h-full flex-row gap-[3rem] overflow-hidden overflow-x-auto no-scrollbar">
                <MovieList movies={popular.results}/>
            </div>
            <b className="flex items-center text-[3rem] font-vt323 text-pearl-white mt-4 ml-2 font-medium">
                CRITICALLY ACCLAIMED FILM
            </b>
            <div className="flex w-full h-full flex-row gap-[3rem] overflow-hidden overflow-x-auto no-scrollbar">
                <MovieList movies={topRated.results}/>
            </div>
            <b className="flex items-center text-[3rem] font-vt323 text-pearl-white mt-4 ml-2 font-medium">
                UPCOMING FILM
            </b>
            <div className="flex w-full h-full flex-row gap-[3rem] overflow-hidden overflow-x-auto no-scrollbar">
                <MovieList movies={upcoming.results}/>
            </div>
        </div>
    )
}

export default Page
