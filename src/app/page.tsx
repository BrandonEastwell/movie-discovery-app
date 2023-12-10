import Navigation from "../components/navigation";
import Header from "../components/header";
import "../app/styles/globals.css"
import {getMediaBySearch, getTrendingWeekMovie} from "../apis/themoviedb/requests/movieLists";
import SearchMovies from '../components/searchMovies';
import TrendingMovies from '../components/trendingMovies';

export async function Page({
                               searchParams,
                           }: {
    searchParams?: {
        query?: string;
    };
}) {
    const query = searchParams?.query || '';

    let moviesResult = null
    const trending = await getTrending()

    try {
        moviesResult = await getMediaBySearch(query);
    } catch (error) {
        // Handle error
        console.error('Error searching movies:', error);
    }
    if (query ) {
        return (
            <div>
                <div className="header-wrapper fixed">
                    <Header />
                </div>
                <div className="nav-wrapper fixed">
                    <div className="nav-spacer h-[64px] w-[255px]"></div>
                    <Navigation/>
                </div>
                <div className="grid grid-cols-layout grid-rows-layout">
                    <div className="content-wrapper col-start-2 row-start-2">
                        <div className="content flex flex-row flex-wrap">
                            <SearchMovies movies={moviesResult.results} />
                        </div>
                    </div>
                </div>
            </div>
        )
    } else {
        return (
            <div>
                <div className="header-wrapper fixed">
                    <Header />
                </div>
                <div className="nav-wrapper fixed">
                    <div className="nav-spacer h-[64px] w-[255px]"></div>
                    <Navigation/>
                </div>
                <div className="grid grid-cols-layout grid-rows-layout">
                    <div className="content-wrapper col-start-2 row-start-2">
                        <div className="trending flex flex-row flex-nowrap overflow-hidden">
                            <TrendingMovies movies={trending.results} />
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
export default Page

async function getTrending() {
    let trendingMovies = await getTrendingWeekMovie()
    console.log(trendingMovies)
    return await trendingMovies
}