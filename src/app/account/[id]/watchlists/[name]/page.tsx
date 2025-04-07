import Link from "next/link";
import Image from "next/image";
import WatchlistService from "../../../../../lib/services/watchlistService";
import {getMovieDetails} from "../../../../../lib/api/TMDB/movieDetails";

interface WatchlistMovie {
    movieid: number, position: number
}

interface Movie {
    id: number;
    title: string;
    poster_path: string;
    backdrop_path: string;
}

type Props = {
    params: { id: string; name: string };
    searchParams: { [key: string]: string | string[] | undefined };
};

export default async function Page({ params, searchParams }: Props) {
    const userid = params.id;
    const watchlistName = params.name;
    const watchlistID = searchParams.id;

    let movies : Movie[] = [];
    let watchlistDesc;
    let moviesInWatchlist : WatchlistMovie[] = [];

    if (typeof watchlistID === "string") {
        watchlistDesc = await WatchlistService.getWatchlistDetailsByWatchlistId(parseInt(watchlistID)).then((res) => {
            if (res) return res.playlist_desc
        });
        moviesInWatchlist = await WatchlistService.getWatchlistsMoviesByWatchlistId(parseInt(watchlistID));
    }

    if (moviesInWatchlist.length != 0) {
        const watchlistMovieIds = moviesInWatchlist.map(movie => movie.movieid);

        for (const id of watchlistMovieIds) {
            const movieDetails : Movie = await getMovieDetails(id);
            movies.push(movieDetails);
        }
    }

    const findPositionByMovieId = (movieid: number): number | undefined => {
        const movie = moviesInWatchlist.find(item => item.movieid === movieid);
        return movie?.position;
    };

    if (!movies || movies.length === 0) {
        return <p>No movies found.</p>;
    }

    return (
        <div className="wrapper w-full h-full flex flex-col gap-10 items-start justify-start flex-nowrap">
            <div className="flex flex-row w-full max-h-[200px] mt-7 gap-5">
                <div className="relative w-full h-full max-w-[200px] aspect-square rounded overflow-hidden">
                    {movies[0].backdrop_path
                        && (
                            <Image className="object-cover"
                                   src={`https://image.tmdb.org/t/p/w500${movies[0]?.backdrop_path}`}
                                   alt={`${movies[0]?.title} Poster`}
                                   fill
                            />
                        )}
                </div>
                <div className="flex flex-col gap-2">
                    <p className="text-base font-iconsolata text-pearl-white m-0 ml-2">
                        Private Watchlist
                    </p>
                    <h1 className="text-8xl font-vt323 text-pearl-white ml-2 font-extrabold">
                        {watchlistName}
                    </h1>
                    <p className="text-xl font-vt323 text-pearl-white/80 m-0 ml-2">
                        {watchlistDesc}
                    </p>
                </div>
            </div>
            <div className="w-full flex flex-col flex-wrap gap-5"> {
                movies.map((movie) => (
                    <Link key={movie.id} href={`/title/${movie.id}`} className="no-underline">
                        <div className="flex flex-row max-h-[50px] max-w-full w-auto justify-start items-center gap-1">
                            <p className="w-auto text-left font-iconsolata text-silver opacity-75 text-lg font-bold overflow-hidden m-0 p-2">{findPositionByMovieId(movie.id)}</p>
                            <div className="relative w-full max-w-[50px] aspect-square rounded overflow-hidden">
                                {movie.backdrop_path
                                    && (
                                        <Image className="object-cover"
                                               src={`https://image.tmdb.org/t/p/w500${movie?.backdrop_path}`}
                                               alt={`${movie?.title} Poster`}
                                               fill
                                        />
                                    )}
                            </div>
                            <p className="w-full text-left font-iconsolata text-white text-base m-0 p-2">{movie.title}</p>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    )
}
