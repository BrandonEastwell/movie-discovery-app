"use client"
import Image from "next/image";
import React, {useState} from "react";
import AddToWatchlistBtn from "./AddToWatchlistBtn";
import AddToFavouriteBtn from "./AddToFavouriteBtn";
import {AnimatePresence, motion} from "framer-motion";
import {useRouter} from "next/navigation";
import useFavourite from "../../lib/hooks/useFavourite";
import {movieCardHover} from "../../lib/utils/framer/varients";

interface Movie {
    id: number;
    title: string;
    poster_path: string;
    backdrop_path: string;
    isFavourite: boolean;
}

export default function MovieCard({movie, isLoggedIn} : {movie: Movie, isLoggedIn: boolean}) {
    const [hover, setHover] = useState<boolean>(false);
    const favouriteState = useFavourite(movie.isFavourite, movie.id, isLoggedIn)
    const router = useRouter();

    const imageLoader = ({src}: any) => {
        return `https://image.tmdb.org/t/p/w500${src}`;
    }

    const navigateToMovie = async (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        event.stopPropagation();
        router.push(`/title/${movie.id}`)
    }

    return (
        <>
            <div className="flex h-full w-full flex-row max-h-[250px] align-middle">
                <div className="flex flex-col max-w-[10px] justify-end gap-16 whitespace-nowrap mr-1">
                    <p className="m-0 -rotate-90 text-[#5F43B2] opacity-50 font-poppins font-semibold max-h-[10px] max-w-[10px] text-[0.6rem]">KODAK
                        PORTRA 400</p>
                    <p className="m-0 -rotate-90 text-[#5F43B2] opacity-50 font-poppins font-semibold max-h-[10px] max-w-[10px] text-[0.6rem]">17
                        42</p>
                    <p className="m-0 -rotate-90 text-[#5F43B2] opacity-50 font-poppins font-semibold max-h-[10px] max-w-[10px] text-[0.6rem]">KODAK</p>
                </div>
                <motion.div onClick={(event) => navigateToMovie(event)} className="cursor-pointer relative max-h-[250px] max-w-[250px]" onHoverStart={() => setHover(true)} onHoverEnd={() => setHover(false)}>
                    <AnimatePresence>
                        <motion.div
                            className="absolute bg-midnight/25 w-full h-full flex flex-col place-items-end justify-end"
                            variants={movieCardHover}
                            animate={hover ? "visible" : "hidden"}
                            initial="hidden"
                            exit="hidden"
                        >
                            <motion.div className="flex flex-row gap-2 max-w-[80px] p-2" animate={{ scale: hover ? 1 : 0 }}>
                                <AddToWatchlistBtn movieId={movie.id} isLoggedIn={isLoggedIn} />
                                <AddToFavouriteBtn isFavourite={favouriteState.favourite} toggleFavourite={favouriteState.toggleFavourite} />
                            </motion.div>
                        </motion.div>
                    </AnimatePresence>
                    {!hover && favouriteState.favourite &&
                        <div className="absolute flex flex-col w-full h-full place-items-end justify-end">
                            <div className="flex flex-row gap-2 max-w-[80px] p-2">
                                <AddToFavouriteBtn isFavourite={favouriteState.favourite} toggleFavourite={favouriteState.toggleFavourite} />
                            </div>
                        </div>
                    }
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
                </motion.div>
            </div>
            <p className="px-3 m-0 text-3xl uppercase text-pearl-white font-vt323">{movie.title}</p>
        </>
    );
}