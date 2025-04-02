"use client"
import Link from "next/link";
import Image from "next/image";
import React from "react";
import AddToPlaylist from "./AddPlaylistButton";
import AddFavouriteButton from "./AddFavouriteButton";

interface Movie {
    id: number;
    title: string;
    poster_path: string;
    backdrop_path: string;
    isFavourite: boolean;
}

export default function MovieCard({movie, isLoggedIn} : {movie: Movie, isLoggedIn: boolean}) {
    const imageLoader = ({src}: any) => {
        return `https://image.tmdb.org/t/p/w500${src}`;
    }

    return (
        <div className="flex flex-col max-h-[325px] max-w-[300px]">
            <div className="flex h-full w-full flex-row max-h-[250px] align-middle">
                <div className="flex flex-col max-w-[10px] justify-end gap-16 whitespace-nowrap mr-1">
                    <p className="m-0 -rotate-90 text-[#5F43B2] opacity-50 font-poppins font-semibold max-h-[10px] max-w-[10px] text-[0.6rem]">KODAK
                        PORTRA 400</p>
                    <p className="m-0 -rotate-90 text-[#5F43B2] opacity-50 font-poppins font-semibold max-h-[10px] max-w-[10px] text-[0.6rem]">17
                        42</p>
                    <p className="m-0 -rotate-90 text-[#5F43B2] opacity-50 font-poppins font-semibold max-h-[10px] max-w-[10px] text-[0.6rem]">KODAK</p>
                </div>
                <Link href={`/title/${movie.id}`} className="max-h-[250px] max-w-[250px]">
                    {movie.poster_path
                        && (
                            <Image
                                className="w-[250px] h-[250px] object-cover object-center overflow-hidden"
                                loader={imageLoader}
                                src={`${movie?.backdrop_path}`}
                                alt={`${movie?.title} Poster`}
                                width={250}
                                height={250}
                            />
                        )}
                </Link>
                <div className="flex flex-col max-w-[40px] justify-end gap-4">
                    <div className="gap-2 pl-1 flex flex-col items-center max-w-[40px]">
                        <AddFavouriteButton movieId={movie.id} isFavourite={movie.isFavourite} isLoggedIn={isLoggedIn} />
                        <AddToPlaylist movieId={movie.id}/>
                    </div>
                </div>
            </div>
            <p className="px-3 m-0 text-3xl uppercase text-pearl-white font-vt323">{movie.title}</p>
        </div>
    );
}