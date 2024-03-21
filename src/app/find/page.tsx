import MoviesSearch from "../../components/server/movies-search";
import {getMediaBySearch} from "../../util/movieLists";
export async function Page({ searchParams, }: { searchParams?: { q?: string; }; }) {
    const query = searchParams?.q || '';

    const moviesResult = await getMediaBySearch(query.replaceAll(' ', '%20'));
        return (
            <div className="content-container grid grid-cols-layout grid-rows-layout">
                <div className="col-start-2 row-start-2">
                    <div className=" flex flex-row flex-wrap">
                        <MoviesSearch movies={moviesResult.results}/>
                    </div>
                </div>
            </div>
        )
}

export default Page