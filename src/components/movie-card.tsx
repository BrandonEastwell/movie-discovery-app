import Link from "next/link";
import Image from "next/image";
import React, {useRef} from "react";
import AddToPlaylist from "./add-playlist-btn";
import AddFavouriteBtn from "./add-favourite-btn";

interface Movie {
    id: number;
    title: string;
    poster_path: string;
    backdrop_path: string;
    isFavourite: boolean;
}

export default function MovieCard(movie : Movie) {
    const elemRefs = useRef<HTMLParagraphElement[]>([]);

    const imageLoader = ({src}: any) => {
        return `https://image.tmdb.org/t/p/w500${src}`;
    }

    const handleRef = (elem: HTMLParagraphElement | null) => {
        if (elem) {
            elemRefs.current.push(elem);
        }
    };

    return (
        <>
            <div className="flex h-full w-full flex-row max-h-[250px] max-w-[300px] align-middle">
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
                                className="w-[250px] h-[250px] dark:shadow-gray-800 object-cover object-center overflow-hidden"
                                loader={imageLoader}
                                src={`${movie?.backdrop_path}`}
                                alt={`${movie?.title} Poster`}
                                width={250}
                                height={250}
                            />
                        )}
                </Link>
                <div className="flex flex-col max-w-[40px] justify-end gap-4">
                    <div className="gap-2 flex flex-col items-center max-w-[40px]">
                        <p ref={handleRef} className="pointer-events-none mb-20 text-[2rem] m-0 w-[180px] max-h-[40px] uppercase -rotate-90 text-pearl-white opacity-75 font-vt323 whitespace-nowrap overflow-x-auto no-scrollbar">{movie.title}</p>
                        <AddFavouriteBtn movieId={movie.id} isFavourite={movie.isFavourite} />
                        <AddToPlaylist movieId={movie.id}/>
                    </div>
                </div>
            </div>
        </>
    );
}