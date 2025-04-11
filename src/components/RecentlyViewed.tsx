'use client'
import React, {useEffect, useState} from "react";
import Image from "next/image";
import {usePathname, useRouter} from "next/navigation";
import { motion } from "framer-motion";

interface Movie {
    id: number;
    title: string;
    poster_path: string;
    release_date: string;
    runtime: number;
    genres: [Genre];
    popularity: number;
    budget: number;
    backdrop_path: string;
    overview: string;
}

interface Genre {
    id: number, name: string
}

export default function RecentlyViewed() {
    const [movies, setMovies] = useState<Movie[]>([]);
    const pathname = usePathname();
    const router = useRouter();

    useEffect(() => {
        const storedMovies = JSON.parse(localStorage.getItem("recentMovies") as string) || [];
        setMovies(storedMovies);
    }, [pathname]);

    const imageLoader = ({src}: any) => {
        return `https://image.tmdb.org/t/p/w500${src}`;
    }

    const navigateToMovie = (id: number) => {
        router.push(`/title/${id}`)
    }

    if (movies.length > 0) {
        return (
            <div className="w-full flex flex-col gap-1.5">
                <span className="text-2xl text-pearl-white opacity-80 font-vt323 font-semibold px-2">RECENTLY VIEWED</span>
                {movies.map((movie) => (
                    <motion.div initial={{backgroundColor: '#28282840'}} whileHover={{backgroundColor: '#28282890'}} key={movie.id} onClick={() => navigateToMovie(movie.id)} className="grid grid-cols-[1fr_2fr] grid-rows-[1fr_1fr] w-full cursor-pointer bg-[#282828]/40 border-[#132C4F]/[0.04] rounded-xl overflow-hidden">
                        <div className="relative row-span-2 col-start-1 rounded aspect-square m-2 overflow-hidden">
                            <Image className="object-cover" fill loader={imageLoader} src={movie.backdrop_path} alt={movie.title} />
                        </div>
                        <span className="row-start-1 col-start-2 px-1 self-end text-sm font-iconsolata text-pearl-white truncate">{movie.title}</span>
                        <span className="row-start-2 col-start-2 px-1 self-start text-xs opacity-80 font-iconsolata truncate">{movie.popularity}</span>
                    </motion.div>
                ))}
            </div>
        )
    }

    return null
}