import React from "react";
import {getMovieDetails} from "../../../util/movieDetails";
const TMDB_IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w500';
export default async function Page({ params }: { params: { id: number } }) {
    interface Movie {
        id: number;
        title: string;
        poster_path: string;
        release_date: string;
        runtime: number;
        genres: [id: number, name: string];


    }
    const movieData = await getMovie(params.id)
    const movie: Movie = movieData as Movie

    return (
        <div className="grid grid-cols-layout grid-rows-layout">
            <div className="content-wrapper col-start-2 row-start-2">
                <div className="content flex flex-col flex-wrap">
                    <img className="w-80 h-44 dark:shadow-gray-800 object-contain"
                         src={`${TMDB_IMAGE_BASE_URL}${movie.poster_path}`}
                         alt={`${movie.title} Poster`}
                    />
                    <div>Release Date: {movie.release_date}</div>
                    <div>Runtime: {movie.runtime} Minutes</div>
                    <div>Provider: Netflix</div>
                </div>
            </div>
        </div>
    )
}

async function getMovie(id: number) {
    let movie = await getMovieDetails(id)
    console.log(movie)
    return await movie
}