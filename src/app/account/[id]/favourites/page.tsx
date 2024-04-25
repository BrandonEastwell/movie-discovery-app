'use client'
import Link from 'next/link'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faCirclePlus, faHeart} from "@fortawesome/free-solid-svg-icons";
import Image from 'next/image'
import '../../../styles/globals.css';
import {getMovieDetails} from "../../../../lib/movieDetails";
import React, {useEffect, useState} from "react";
import {MovieList} from "../../../../components/client/movies-list";

interface Movie {
    id: number;
    title: string;
    poster_path: string;
    backdrop_path: string;
}

export default function FavouriteMovies() {
    const [movies, setMovies] = useState<Movie[]>([]);

    useEffect(() => {
        const fetchMovies = async () => {
            try {
                const response = await fetch('http://localhost:3000/api/favourite', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });
                if (!response.ok) {
                    throw new Error('Failed to fetch favourite movies');
                }
                const data = await response.json();
                setMovies(data.result);
            } catch (error) {
                console.error('Error fetching favourite movies:', error);
                // Handle error, maybe display an error message to the user
            }
        };

        fetchMovies();
    }, []);

    if (!movies || movies.length === 0) {
        return <p>No movies found.</p>;
    }

    const imageLoader = ({ src }: any) => {
        return `https://image.tmdb.org/t/p/w500${src}`
    }

    return (
        <div className="wrapper w-full h-full flex flex-col gap-10 items-start justify-start flex-nowrap">
            <b className="flex items-center text-[3rem] font-vt323 text-pearl-white mt-4 ml-2 font-medium">
                YOUR FAVOURITES
            </b>
            <div className="flex flex-row flex-wrap gap-6">
                <MovieList movies={movies}/>
            </div>
        </div>
    )
}
