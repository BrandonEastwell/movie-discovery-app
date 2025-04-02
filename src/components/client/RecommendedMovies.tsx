"use client"
import React, {useState} from "react";
import {Movies} from "./MoviesList";

interface Movie {
    id: number;
    title: string;
    poster_path: string;
    backdrop_path: string;
}

interface RecommendedProps {
    favouriteMoviesIds: number[];
    initFavouriteMovies: Movie[];
    initRecommendedCastMovies: Movie[];
    initRecommendedCastMembers: string[];
    initRecommendedGenreMovies: Movie[];
    initRecommendedGenreNames: string[];
    initRecommendedCrewMovies: Movie[];
    initRecommendedCrewMembers: string[];
}

const UserRecommendedMovies: React.FC<RecommendedProps> = ({ favouriteMoviesIds, initFavouriteMovies, initRecommendedCastMovies, initRecommendedCrewMovies, initRecommendedCrewMembers, initRecommendedGenreMovies, initRecommendedGenreNames, initRecommendedCastMembers }) => {
    const [recommendedCast, setRecommendedCast] = useState<Movie[]>(initRecommendedCastMovies);
    const [recommendedCastStrings, setRecommendedCastStrings] = useState<string[]>(initRecommendedCastMembers);
    const [recommendedGenre, setRecommendedGenre] = useState<Movie[]>(initRecommendedGenreMovies);
    const [recommendedGenreStrings, setRecommendedGenreStrings] = useState<string[]>(initRecommendedGenreNames);
    const [recommendedCrew, setRecommendedCrew] = useState<Movie[]>(initRecommendedCrewMovies);
    const [recommendedCrewStrings, setRecommendedCrewStrings] = useState<string[]>(initRecommendedCrewMembers);
    const [favouriteMovies, setFavourites] = useState<Movie[]>(initFavouriteMovies);

    // Remove favorite movies from the recommended movie sets
    const filteredRecommendedGenre = recommendedGenre.filter(movie => !favouriteMovies.some(fav => fav.id === movie.id));
    const filteredRecommendedCast = recommendedCast.filter(movie => !favouriteMovies.some(fav => fav.id === movie.id));
    const filteredRecommendedCrew = recommendedCrew.filter(movie => !favouriteMovies.some(fav => fav.id === movie.id));

    // Map over recommended genre strings and concatenate names
    const genreNames = recommendedGenreStrings.join(', ');
    // Map over recommended cast strings and concatenate names
    const castNames = recommendedCastStrings.map((name) => name).join(', ');
    // Map over recommended crew strings and concatenate names
    const crewNames = recommendedCrewStrings.map((name) => name).join(', ');

    return (
        <>
            <b className="flex items-center text-[3rem] font-vt323 text-pearl-white mt-4 ml-2 font-medium">
                SELECTED FOR YOU
            </b>
            <b className="flex items-center text-[1rem] font-vt323 text-pearl-white mt-1 ml-2 font-medium">
                because you like {genreNames && ` ${genreNames}`}
            </b>
            <div className="flex w-full h-auto flex-row gap-[3rem] overflow-hidden overflow-x-auto no-scrollbar">
                <Movies movies={filteredRecommendedGenre} favouriteMovieIds={favouriteMoviesIds} isLoggedIn={true}/>
            </div>
            <b className="flex items-center text-[1rem] font-vt323 text-pearl-white mt-1 ml-2 font-medium">
                because you like {castNames && ` ${castNames}`}
            </b>
            <div className="flex w-full h-auto flex-row gap-[3rem] overflow-hidden overflow-x-auto no-scrollbar">
                <Movies movies={filteredRecommendedCast} favouriteMovieIds={favouriteMoviesIds} isLoggedIn={true}/>
            </div>
            <b className="flex items-center text-[1rem] font-vt323 text-pearl-white mt-1 ml-2 font-medium">
                because you like {crewNames && ` ${crewNames}`}
            </b>
            <div className="flex w-full h-auto flex-row gap-[3rem] overflow-hidden overflow-x-auto no-scrollbar">
                <Movies movies={filteredRecommendedCrew} favouriteMovieIds={favouriteMoviesIds} isLoggedIn={true}/>
            </div>
        </>
    )
}

export { UserRecommendedMovies }