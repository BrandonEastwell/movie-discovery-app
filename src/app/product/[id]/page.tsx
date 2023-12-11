import {getMovieDetails} from "../../../apis/themoviedb/requests/movieDetails";
import React from "react";
const TMDB_IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w500';
export default async function Page({ params }: { params: { id: number } }) {
    interface Movie {
        id: number;
        title: string;
        poster_path: string;
    }
    const movieData = await getMovie(params.id)
    const movie: Movie = movieData as Movie

    return (
        <img className="w-full h-full dark:shadow-gray-800 object-contain"
             src={`${TMDB_IMAGE_BASE_URL}${movie.poster_path}`}
             alt={`${movie.title} Poster`}
        />
    )
}

async function getMovie(id: number) {
    let movie = await getMovieDetails(id)
    console.log(movie)
    return await movie
}