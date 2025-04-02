'use client'
import '../../../styles/globals.css';
import React, {useEffect, useState} from "react";
import {getFavouriteMovies, toggleFavouriteMovie} from "../../../../lib/api/client/favourites";
import Link from "next/link";
import Image from "next/image";
import {AnimatePresence, motion} from 'framer-motion';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faHeart} from "@fortawesome/free-solid-svg-icons";

interface Movie {
    id: number;
    title: string;
    poster_path: string;
    backdrop_path: string;
}

export default function FavouriteMovies() {
    const [movies, setMovies] = useState<Movie[]>([]);

    useEffect(() => {
        if (!movies) return;
        getFavouriteMovies().then((data) => setMovies(data))
    }, []);

    if (!movies || movies.length === 0) {
        return <p>No movies found.</p>;
    }

    return (
        <div className="wrapper w-full h-full flex flex-col gap-10 items-start justify-start flex-nowrap">
            <b className="flex items-center text-[3rem] font-vt323 text-pearl-white mt-4 ml-2 font-medium">
                YOUR FAVOURITES
            </b>
            <div className="flex flex-row flex-wrap gap-6">
                {movies.map((movie) => (
                    <FavouriteMovieCard favouriteMovie={{
                        id: movie.id,
                        title: movie.title,
                        poster_path: movie.poster_path,
                        backdrop_path: movie.backdrop_path
                    }} setMovie={setMovies} movies={movies} />
                ))}
            </div>
        </div>
    )
}

function FavouriteMovieCard({favouriteMovie, setMovie, movies} : {favouriteMovie: Movie, setMovie: (movies: Movie[]) => void, movies: Movie[]}) {
    const [hover, setHover] = useState<boolean>(false);

    const imageLoader = ({src}: any) => {
        return `https://image.tmdb.org/t/p/w500${src}`;
    }

    const cardHoverVarients = {
        visible: {
            opacity: 1,
            transition: {
                duration: 0.2,
                ease: "easeInOut"
            }
        },
        hidden: {
            opacity: 0,
            transition: {
                duration: 0.2,
                ease: "easeInOut"
            }
        }
    }

    const toggleFavourite = async () => {
        const response: { success: boolean } = await toggleFavouriteMovie(favouriteMovie.id);
        if (response.success) {
            setMovie(movies.filter(movie => movie.id !== favouriteMovie.id))
        }
    }

    return (
        <div key={favouriteMovie.id} className="flex flex-col max-h-[325px] max-w-[300px]">
            <div className="flex h-full w-full flex-row max-h-[250px] align-middle">
                <div className="flex flex-col max-w-[10px] justify-end gap-16 whitespace-nowrap mr-1">
                    <p className="m-0 -rotate-90 text-[#5F43B2] opacity-50 font-poppins font-semibold max-h-[10px] max-w-[10px] text-[0.6rem]">KODAK
                        PORTRA 400</p>
                    <p className="m-0 -rotate-90 text-[#5F43B2] opacity-50 font-poppins font-semibold max-h-[10px] max-w-[10px] text-[0.6rem]">17
                        42</p>
                    <p className="m-0 -rotate-90 text-[#5F43B2] opacity-50 font-poppins font-semibold max-h-[10px] max-w-[10px] text-[0.6rem]">KODAK</p>
                </div>
                <motion.div className="cursor-pointer relative max-h-[250px] max-w-[250px]" onHoverStart={() => setHover(true)} onHoverEnd={() => setHover(false)}>
                    <AnimatePresence>
                        { hover &&
                            <motion.div className="absolute bg-midnight/50 w-full h-full flex flex-col place-items-center justify-center" variants={cardHoverVarients} animate="visible" exit="hidden" initial="hidden">
                                <motion.div className="max-w-[80px] pl-1" initial={{scale: 0}} animate={{scale: 1}} exit={{scale: 0}}>
                                    <motion.button onClick={toggleFavourite} whileHover={{scale: 1.1}} whileTap={{scale: 0.9}}
                                                   className="p-0 bg-transparent max-h-[32px] max-w-[32px] cursor-pointer">
                                        <FontAwesomeIcon
                                            className={"text-Purple"}
                                            icon={faHeart} size="xl"/>
                                    </motion.button>
                                </motion.div>
                            </motion.div>
                        }
                    </AnimatePresence>
                    <Link href={`/title/${favouriteMovie.id}`} className="max-h-[250px] max-w-[250px]">
                        {favouriteMovie.poster_path
                            && (
                                <Image
                                    className="w-[250px] h-[250px] object-cover object-center overflow-hidden"
                                    loader={imageLoader}
                                    src={`${favouriteMovie?.backdrop_path}`}
                                    alt={`${favouriteMovie?.title} Poster`}
                                    width={250}
                                    height={250}
                                />
                            )}
                    </Link>
                </motion.div>
            </div>
            <p className="px-3 m-0 text-3xl uppercase text-pearl-white font-vt323">{favouriteMovie.title}</p>
        </div>
    )
}
