"use client"
import React from "react"
import '../../app/styles/globals.css';
import MovieCard from "../MovieCard";

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

interface MovieListProps {
    movies: Movie[];
    favouriteMovieIds: number[];
}

const Movies: React.FC<MovieListProps> = ({movies, favouriteMovieIds}) => {
    const isFavourite = (idToCheck: number) => {
        return favouriteMovieIds != null && favouriteMovieIds.includes(idToCheck);
    }

    return (
        <Swiper
            slidesPerView={4}
            spaceBetween={30}
            freeMode={true}
            modules={[FreeMode]}
            className="mySwiper"
        >
            {movies.map((movie) => (
                <SwiperSlide>
                    <MovieCard key={movie.id}
                               id={movie.id}
                               title={movie.title}
                               poster_path={movie.poster_path}
                               backdrop_path={movie.backdrop_path}
                               isFavourite={isFavourite(movie.id)}
                    />
                </SwiperSlide>
            ))}
        </Swiper>
    );
}

export {Movies}