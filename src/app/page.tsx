import Navigation from "../components/navigation";
import Header from "../components/header";
import "../app/styles/globals.css"
import {getTrendingWeekMovie} from "../apis/themoviedb/requests/movieLists";
import TrendingMovies from '../components/trendingMovies';

export async function Page() {
    const trending = await getTrending()
    return (
        <div>
            <div className="grid grid-cols-layout grid-rows-layout">
                <div className="content-wrapper col-start-2 row-start-2">
                    <div className="trending flex flex-row flex-nowrap overflow-hidden">
                        <TrendingMovies movies={trending.results}/>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Page

async function getTrending() {
    let trendingMovies = await getTrendingWeekMovie()
    console.log(trendingMovies)
    return await trendingMovies
}