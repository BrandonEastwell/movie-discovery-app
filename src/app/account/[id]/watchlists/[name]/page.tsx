'use client'
import React, {useEffect, useState} from "react";
import Link from "next/link";
import {usePathname, useSearchParams} from "next/navigation";
import Image from "next/image";

interface PlaylistProps {
    movieid: number, position: number
}

interface Movie {
    id: number;
    title: string;
    poster_path: string;
    backdrop_path: string;
}

export function Page() {
    const [movies, setMovies] = useState<Movie[]>([]);
    const [playlists, setPlaylists] = useState<PlaylistProps[]>([]);
    const searchParams = useSearchParams()
    const pathname = usePathname()
    const playlistid = searchParams.get('id')
    const pathSegments = pathname.split('/');
    const playlistName = pathSegments[pathSegments.length - 1];

    useEffect(() => {
        const fetchMovies = async () => {
            try {
                const response = await fetch(`http://localhost:3000/api/watchlist-movies?id=${playlistid}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });
                if (!response.ok) {
                    throw new Error('Failed to fetch playlist movies');
                }
                const data = await response.json();
                setPlaylists(data.result.movies);
                setMovies(data.result.movieData);
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

    const imageLoader = ({src}: any) => {
        return `https://image.tmdb.org/t/p/w500${src}`
    }

    const findPositionByMovieId = (movieid: number): number | undefined => {
        const playlist = playlists.find(item => item.movieid === movieid);
        return playlist?.position;
    };

    return (
        <div className="wrapper w-full h-full flex flex-col gap-10 items-start justify-start flex-nowrap">
            <b className="flex items-center text-[3rem] font-vt323 text-pearl-white mt-4 ml-2 font-medium">
                {playlistName}
            </b>
            <div className="flex flex-col flex-wrap gap-5"> {
                movies.map((movie, index) => (
                    <Link key={movie.id} href={`http://localhost:3000/title/${movie.id}`} className="no-underline">
                        <div className="flex flex-row max-h-[50px] max-w-full w-auto justify-start items-center gap-1">
                            <p className="w-auto text-left font-michroma text-silver opacity-75 text-[0.8rem] overflow-hidden m-0 p-2">{findPositionByMovieId(movie.id)}</p>
                            {movie.backdrop_path
                                && (
                                    <Image className="w-[50px] h-[50px] dark:shadow-gray-800 object-cover object-center"
                                           loader={imageLoader}
                                           src={`${movie?.backdrop_path}`}
                                           alt={`${movie?.title} Poster`}
                                           width={50}
                                           height={50}
                                    />
                                )}
                            <p className="w-full text-left font-michroma text-pearl-white text-[1rem] m-0 p-2">{movie.title}</p>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    )
}

export default Page