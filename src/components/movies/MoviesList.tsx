"use client"
import React from "react"
import '../../app/globals.css';
import MovieCard from "./MovieCard";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/free-mode';
import { FreeMode } from 'swiper/modules';
import {Movie} from "../../lib/utils/types/movies";
import {AnimatePresence} from "framer-motion";

const MoviesList = ({movies, favouriteMovieIds, isLoggedIn} : {movies: Movie[], favouriteMovieIds: number[], isLoggedIn: boolean}) => {
    const isFavourite = (idToCheck: number) => {
        return favouriteMovieIds != null && favouriteMovieIds.includes(idToCheck);
    }

    return (
        <Swiper
            slidesPerView={"auto"}
            freeMode={true}
            modules={[FreeMode]}
            className="mySwiper"
        >
            {movies.map((movie) => (
                <AnimatePresence>
                    <SwiperSlide key={movie.id} className="mr-10 flex flex-col w-full max-h-[325px] max-w-[270px]">
                        <MovieCard movie={{id: movie.id, title: movie.title, poster_path: movie.poster_path,
                            backdrop_path: movie.backdrop_path, isFavourite: isFavourite(movie.id)}}
                                   isLoggedIn={isLoggedIn}
                        />
                    </SwiperSlide>
                </AnimatePresence>
            ))}
        </Swiper>
    );
}

export {MoviesList}