import {MoviesList} from "./MoviesList";
import React from "react";

interface Movie {
    id: number;
    title: string;
    poster_path: string;
    backdrop_path: string;
}

interface Person {
    name: string;
}

interface RecommendedProps {
    favouriteMoviesIds: number[];
    recommendedCastMovies: Movie[];
    recommendedCastMembers: Person[];
}

const MoviesRecommendedByCast: React.FC<RecommendedProps> = ({ favouriteMoviesIds, recommendedCastMovies, recommendedCastMembers }) => {
    // Map over recommended cast strings and concatenate names
    const castNames = recommendedCastMembers.map((person) => person.name).join(', ');

    return (
        <>
            <b className="flex items-center text-[1rem] font-vt323 text-pearl-white mt-1 ml-2 font-medium">
                because you like {castNames && ` ${castNames}`}
            </b>
            <div className="flex w-full h-auto flex-row gap-[3rem] overflow-hidden overflow-x-auto no-scrollbar">
                <MoviesList movies={recommendedCastMovies} favouriteMovieIds={favouriteMoviesIds} isLoggedIn={true}/>
            </div>
        </>
    )
}

export { MoviesRecommendedByCast }