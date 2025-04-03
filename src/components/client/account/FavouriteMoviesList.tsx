"use client"
import React, {useState} from "react";
import FavouriteMovieCard from "./FavouriteMovieCard";

interface Movie {
    id: number;
    title: string;
    poster_path: string;
    backdrop_path: string;
}

const FavouriteMoviesList = ({initialMovies} : {initialMovies: Movie[]}) => {
    const [movies, setMovies] = useState<Movie[]>(initialMovies);

    return (
        <>
            {movies.map((movie) => (
                <FavouriteMovieCard key={movie.id} favouriteMovie={{
                    id: movie.id,
                    title: movie.title,
                    poster_path: movie.poster_path,
                    backdrop_path: movie.backdrop_path
                }} setMovie={setMovies} movies={movies} />
            ))}
        </>
    )
}

export {FavouriteMoviesList}