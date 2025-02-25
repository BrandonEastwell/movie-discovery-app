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
}

const Movies: React.FC<MovieListProps> = ({ movies }) => {
    const [favouriteIds, setFavouriteIds] = useState<number[] | null>(null);

    useEffect(() => {
        (async () => {
            const ids = await getFavouriteIds();
            setFavouriteIds(ids);
        })();
    }, []);

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

const getFavouriteIds = async () => {
    try {
        const response = await fetch('http://localhost:3000/api/favourite', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });
        if (!response.ok) {
            const errorData = await response.json();
            console.error('Action failed:', errorData);
        }
        const body = await response.json();
        const data = body.result

        // Extracting movie IDs from the response
        return data.map((movie: Movie) => movie.id);
    } catch (error) {
        console.error('Action failed:', error);
    }
    return [];
};

export {Movies}