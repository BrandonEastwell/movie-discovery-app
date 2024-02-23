import {getMediaBySearch} from "../../apis/themoviedb/requests/movieLists";
import SearchMovies from "../../components/searchMovies";
export async function Page({ searchParams, }: { searchParams?: { q?: string; }; }) {
    const query = searchParams?.q || '';

    const moviesResult = await getMediaBySearch(query.replaceAll(' ', '%20'));
        return (
            <section>
                <div className="grid grid-cols-layout grid-rows-layout">
                    <div className="content-wrapper col-start-2 row-start-2">
                        <div className="content flex flex-row flex-wrap">
                            <SearchMovies movies={moviesResult.results}/>
                        </div>
                    </div>
                </div>
            </section>
        )
}

export default Page