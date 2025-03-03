import React from "react"
import '../../app/styles/globals.css';
import MovieCard from "../MovieCard";
import {AuthService} from "../../lib/services/authService";

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

const Movies: React.FC<MovieListProps> = async ({movies, favouriteMovieIds}) => {
    const isFavourite = (idToCheck: number) => {
        return favouriteMovieIds != null && favouriteMovieIds.includes(idToCheck);
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