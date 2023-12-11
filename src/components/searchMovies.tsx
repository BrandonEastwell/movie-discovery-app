// components/MovieList.tsx
import React from 'react';
import {getMediaBySearch} from "../apis/themoviedb/requests/movieLists";

interface Movie {
    id: number;
    title: string;
    poster_path: string;
}

const TMDB_IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w500';

interface MovieListProps {
    movies: Movie[] | null;
}

const SearchMovies: React.FC<MovieListProps> = ({ movies }) => {
    console.log(movies)
    if (!movies || movies.length === 0) {
        return <p>No movies found.</p>;
    }

    return (
        <ul>
            {movies.map((movie) => (
                <li key={movie.id}>
                    <h3>{movie.title}</h3>
                    {movie.poster_path && (
                        <img
                            src={`${TMDB_IMAGE_BASE_URL}${movie.poster_path}`}
                            alt={`${movie.title} Poster`}
                        />
                    )}
                </li>
            ))}
        </ul>
    );
};

export default SearchMovies;