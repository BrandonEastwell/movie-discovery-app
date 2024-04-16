'use client'
import Link from 'next/link'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faCirclePlus, faHeart} from "@fortawesome/free-solid-svg-icons";
import Image from 'next/image'
import '../../../styles/globals.css';
import {getMovieDetails} from "../../../../lib/movieDetails";
import React, {useEffect, useState} from "react";

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
                Your favourites
            </b>
            <div className="flex flex-row flex-wrap"> {
                movies.map((movie, index) => (
                    <div key={movie.id} className="flex flex-row max-h-[275px] max-w-[300px] align-middle">
                        <div className="flex flex-col max-w-[10px] justify-end gap-16 whitespace-nowrap mr-1">
                            <p className="m-0 -rotate-90 text-[#5F43B2] opacity-75 font-poppins font-semibold max-h-[10px] max-w-[10px] text-[0.6rem]">KODAK
                                PORTRA 400</p>
                            <p className="m-0 -rotate-90 text-[#5F43B2] opacity-75 font-poppins font-semibold max-h-[10px] max-w-[10px] text-[0.6rem]">17
                                42</p>
                            <p className="m-0 -rotate-90 text-[#5F43B2] opacity-75 font-poppins font-semibold max-h-[10px] max-w-[10px] text-[0.6rem]">KODAK</p>
                        </div>
                        <Link href={`/title/${movie.id}`} className="max-h-[250px] max-w-[250px]">
                            {movie.poster_path
                                && (
                                    <Image
                                        className="w-[250px] h-[250px] dark:shadow-gray-800 object-cover object-center"
                                        loader={imageLoader}
                                        src={`${movie?.backdrop_path}`}
                                        alt={`${movie?.title} Poster`}
                                        width={275}
                                        height={275}
                                    />
                                )}
                        </Link>
                        <div className="flex flex-col max-w-[40px] justify-end gap-4">
                            <div className="gap-2 flex flex-col items-center max-w-[40px]">
                                <p className="mb-20 text-[2rem] m-0 w-[180px] max-h-[40px] uppercase -rotate-90 text-pearl-white opacity-75 font-vt323 whitespace-nowrap overflow-x-auto no-scrollbar">{movie.title}</p>
                                <button value={movie.id}
                                        className="p-0 bg-transparent max-h-[32px] max-w-[32px]">
                                    <FontAwesomeIcon
                                        className={'${checkFavourite(movie.id)} ${isMovieFavourite ? text-pearl-white : text-Purple} opacity-75'}
                                        icon={faHeart} size="xl"/>
                                </button>
                                <button value={movie.id}
                                        className="p-0 bg-transparent max-h-[32px] max-w-[32px]">
                                    <FontAwesomeIcon className="text-pearl-white opacity-75" icon={faCirclePlus}
                                                     size="xl"/>
                                </button>
                            </div>
                        </div>
                    </div>))}
            </div>
        </div>
    )
}
