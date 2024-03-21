'use client'
import React from "react"
import Link from 'next/link'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faCirclePlus, faHeart} from "@fortawesome/free-solid-svg-icons";
import Image from 'next/image'

interface Movie {
    id: number;
    title: string;
    poster_path: string;
}

const TMDB_IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w500';
interface MovieListProps {
    movies: Movie[] | null;
}
const MoviesTrending: React.FC<MovieListProps> = ({ movies }) => {
    const handleFavourite = async (e : any) => {
        const id = e.currentTarget.getAttribute("data-id")
        try {
            const response = await fetch('api/favourite', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ id }),
            });
            if (response.ok) {
                // Redirect to dashboard or another protected route
                console.log("movie " + id + " favourite")
            } else {
                const errorData = await response.json();
                console.error('Action failed:', errorData);
            }
        } catch (error : any) {
            console.error('Action failed:', error.response?.data);
        }
    };

    if (!movies || movies.length === 0) {
        return <p>No movies found.</p>;
    }
    return (
            <div className="media-scroller w-full flex flex-row flex-auto items-start justify-start gap-[1rem] overflow-x-auto overscroll-contain">
                {movies.map((movie) => (
                    <div key={movie.id}
                         className="flex flex-row flex-auto justify-start items-center max-h-[275px] max-w-[300px]">
                        <div className="flex flex-col">
                            <p className="rotate-90 text-[#5F43B2] opacity-75 font-poppins font-semibold max-h-[10px] max-w-[10px] text-[0.6rem]">KODAK</p>
                            <p className="rotate-90 text-[#5F43B2] opacity-75 font-poppins font-semibold max-h-[10px] max-w-[10px] text-[0.6rem]">17 42</p>
                            <p className="rotate-90 text-[#5F43B2] opacity-75 font-poppins font-semibold max-h-[10px] max-w-[10px] text-[0.6rem]">KODAK PORTRA 400</p>
                        </div>
                        <Link href={`/product/${movie.id}`} className="max-h-[275px] max-w-[275px]">
                            {movie.poster_path && (
                                <div className="bg-gainsboro">
                                    <Image className="w-full h-full dark:shadow-gray-800 object-contain object-center"
                                         src={`${TMDB_IMAGE_BASE_URL}${movie.poster_path}`}
                                         alt={`${movie.title} Poster`}
                                         width={275}
                                         height={275}
                                    />
                                </div>
                            )}
                        </Link>
                        <div className="flex flex-col">
                            <button onClick={handleFavourite} value={movie.id}>
                                <FontAwesomeIcon className="max-h-[20px] max-w-[20px] w-5 h-5 rotate-90 text-pearl-white opacity-75" icon={faHeart} />
                            </button>
                            <FontAwesomeIcon className="max-h-[20px] max-w-[20px] w-5 h-5 rotate-90 text-pearl-white opacity-75" icon={faCirclePlus} />
                            <p className="text-[2rem] rotate-90 text-pearl-white opacity-75 font-vt323">${movie.title}</p>
                        </div>
                    </div>
                ))}
            </div>
    );
};

export default MoviesTrending;
