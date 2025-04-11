"use client"
import React from "react"
import '../app/globals.css';
import MovieCard from "./cards/MovieCard";

import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/free-mode';
import { FreeMode } from 'swiper/modules';

interface Movie {
    id: number;
    title: string;
    poster_path: string;
    backdrop_path: string;
}

interface props {
    movies: Movie[];
    favouriteMovieIds: number[];
    isLoggedIn : boolean;
}

const MoviesList: React.FC<props> = ({movies, favouriteMovieIds, isLoggedIn}) => {
    const isFavourite = (idToCheck: number) => {
        return favouriteMovieIds != null && favouriteMovieIds.includes(idToCheck);
    }

    return (
        <Swiper
            slidesPerView={"auto"}
            spaceBetween={50}
            freeMode={true}
            modules={[FreeMode]}
            className="mySwiper"
        >
            {movies.map((movie) => (
                <SwiperSlide key={movie.id} className="flex flex-col w-full max-h-[325px] max-w-[250px]">
                    <MovieCard movie={{id: movie.id, title: movie.title, poster_path: movie.poster_path,
                        backdrop_path: movie.backdrop_path, isFavourite: isFavourite(movie.id)}}
                               isLoggedIn={isLoggedIn}
                    />
                </SwiperSlide>
            ))}
        </Swiper>
    );
}

export {MoviesList}