'use client'
import {useEffect} from "react";

interface Movie {
    id: number;
    title: string;
    poster_path: string;
    release_date: string;
    runtime: number;
    genres: [Genre];
    popularity: number;
    budget: number;
    backdrop_path: string;
    overview: string;
}

interface Genre {
    id: number, name: string
}

export default function LocalStorage({movie} : {movie: Movie}) {

    useEffect(() => {
        let recentMovies : Movie[] = JSON.parse(localStorage.getItem("recentMovies") as string) || [];
        if (!recentMovies.some((m) => m.id === movie.id)) {
            if (recentMovies.length >= 4) recentMovies.shift();
            recentMovies.push(movie);
            localStorage.setItem("recentMovies", JSON.stringify(recentMovies));
        }
    })

    return null
}