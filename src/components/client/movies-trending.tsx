'use client'
import React, {useEffect, useState} from "react"
import Link from 'next/link'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faCirclePlus, faHeart} from "@fortawesome/free-solid-svg-icons";
import Image from 'next/image'
import {router} from "next/client";
import '../../app/styles/globals.css'; // Import the stylesheet

interface Movie {
    id: number;
    title: string;
    poster_path: string;
}

interface MovieListProps {
    movies: Movie[] | null;
}
const MoviesTrending: React.FC<MovieListProps> = ({ movies }) => {
    const [isMovieFavourite, setIsMovieFavourite] = useState(false);

    const handleFavourite = async (e : any) => {
        const id = e.currentTarget.getAttribute("data-id")
        try {
            await fetch('api/favourite', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ id }),
            }).then(async response => {
                if (!response.ok) {
                    const errorData = response.json();
                    console.error('Action failed:', errorData);
                    useEffect(() => {
                        router.push('/signup');
                    })
                }
                return response.json()
            }).then(data => {
                const result = data.result;
                switch (result) {
                    case "favourite added":

                        break;
                    case "favourite removed":

                        break;
                }
            }).catch(errorData => {
                console.error('Action failed:', errorData);

            })
        } catch (error : any) {
            console.error('Action failed:', error.response?.data);
        }
    };

    const checkFavourite = async (id : any) => {
        try {
            const response = await fetch('api/favourite', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ id }),
            });
            if (!response.ok) {
                const errorData = await response.json();
                console.error('Action failed:', errorData);
                setIsMovieFavourite(false);
                return;
            }
            const data = await response.json();
            const bool = data.result;
            setIsMovieFavourite(bool);
        } catch (error) {
            console.error('Action failed:', error);
            setIsMovieFavourite(false);
        }
    }

    if (!movies || movies.length === 0) {
        return <p>No movies found.</p>;
    }
    return (
        movies.map((movie) => (
            <div key={movie.id}
                 className="flex flex-row flex-auto justify-start items-center max-h-[275px] max-w-[300px]">
                <div className="flex flex-col">
                    <p className="rotate-90 text-[#5F43B2] opacity-75 font-poppins font-semibold max-h-[10px] max-w-[10px] text-[0.6rem]">KODAK</p>
                    <p className="rotate-90 text-[#5F43B2] opacity-75 font-poppins font-semibold max-h-[10px] max-w-[10px] text-[0.6rem]">17 42</p>
                    <p className="rotate-90 text-[#5F43B2] opacity-75 font-poppins font-semibold max-h-[10px] max-w-[10px] text-[0.6rem]">KODAK PORTRA 400</p>
                </div>
                <Link href={`/product/${movie.id}`} className="max-h-[275px] max-w-[275px]">
                    {movie.poster_path
                        && (
                            <div className="bg-gainsboro">
                                <Image className="w-full h-full dark:shadow-gray-800 object-contain object-center"
                                       src={`${movie.poster_path}`}
                                       alt={`${movie.title} Poster`}
                                       width={275}
                                       height={275}
                                />
                            </div>
                        )}
                </Link>
                <div className="flex flex-col">
                    <button onClick={handleFavourite} value={movie.id}>
                        <FontAwesomeIcon className={'${checkFavourite(movie.id)} ${isMovieFavourite ? text-Purple : text-pearl-white} max-h-[20px] max-w-[20px] w-5 h-5 rotate-90 text-pearl-white opacity-75'} icon={faHeart} />
                    </button>
                    <FontAwesomeIcon className="max-h-[20px] max-w-[20px] w-5 h-5 rotate-90 text-pearl-white opacity-75" icon={faCirclePlus} />
                    <p className="text-[2rem] rotate-90 text-pearl-white opacity-75 font-vt323">${movie.title}</p>
                </div>
            </div>
        ))
    )
}

export default MoviesTrending;
