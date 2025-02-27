'use client'
import React, {useEffect, useState} from "react"
import '../../app/styles/globals.css';
import MovieCard from "../movie-card";

interface Movie {
    id: number;
    title: string;
    poster_path: string;
    backdrop_path: string;
}

interface MovieListProps {
    movies: Movie[];
    favouriteMovieIds: number[];
}

const Movies: React.FC<MovieListProps> = ({ movies, favouriteMovieIds }) => {
    const [favouriteIds, setFavouriteIds] = useState<number[] | null>(favouriteMovieIds);

    const isFavourite = (idToCheck: number) => {
        return favouriteIds != null && favouriteIds.includes(idToCheck);
    }

    return (
        <>
            {movies.map((movie) => (
                <MovieCard key={movie.id}
                           id={movie.id}
                           title={movie.title}
                           poster_path={movie.poster_path}
                           backdrop_path={movie.backdrop_path}
                           isFavourite={isFavourite(movie.id)}
                />
            ))}
        </>
    );
}

export {Movies}