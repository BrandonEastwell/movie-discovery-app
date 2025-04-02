'use client'
import React, {Suspense} from 'react';
import Link from 'next/link'
import Image from "next/image";

interface Movie {
    id: number;
    title: string;
    poster_path: string;
    backdrop_path: string;
    overview: string;
}

interface MovieListProps {
    movies: Movie[] | null;
    query: string;
}

const MoviesSearchList: React.FC<MovieListProps> = ({ movies }) => {
    if (!movies || movies.length === 0) {
        return <p>No movies found.</p>;
    }
    const imageLoader = ({src}: any) => {
        return `https://image.tmdb.org/t/p/w500${src}`
    }

    return (
        movies.map((movie) => (
            movie.poster_path && (
                    <Suspense key={movie.id} fallback={<p>loading..</p>}>
                        <div className="max-w-[250px] rounded p-4 bg-[#121212]">
                            <div className="flex flex-col justify-start gap-1 align-middle">
                                <Link href={`/title/${movie.id}`} className="cursor-pointer no-underline bg-transparent">
                                    <Image className="w-full object-cover object-center"
                                           loader={imageLoader}
                                           src={movie.backdrop_path ? `${movie?.backdrop_path}` : `${movie?.poster_path}`}
                                           alt={`${movie.title} Poster`}
                                           width={225}
                                           height={300}
                                    />
                                    <p className="w-full text-left font-vt323 text-pearl-white text-[1.5rem] m-0 pt-1 overflow-hidden whitespace-nowrap">{movie.title}</p>
                                    <p className="w-full text-left font-vt323 text-silver opacity-75 text-[0.8rem] m-0 pt-1 overflow-hidden whitespace-nowrap">{movie.overview}</p>
                                </Link>
                            </div>
                        </div>
                    </Suspense>
            )
        ))
    )
};

export default MoviesSearchList;