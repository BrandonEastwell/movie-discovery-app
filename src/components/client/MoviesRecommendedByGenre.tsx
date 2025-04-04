import {Movies} from "./MoviesList";
import React from "react";

interface Movie {
    id: number;
    title: string;
    poster_path: string;
    backdrop_path: string;
}

interface RecommendedProps {
    favouriteMoviesIds: number[];
    recommendedGenreMovies: Movie[];
    recommendedGenreNames: string[];
}

const MoviesRecommendedByGenre: React.FC<RecommendedProps> = ({ favouriteMoviesIds, recommendedGenreMovies, recommendedGenreNames }) => {
    // Map over recommended genre strings and concatenate names
    const genreNames = recommendedGenreNames.join(', ');

    return (
        <>
            <b className="flex items-center text-[1rem] font-vt323 text-pearl-white mt-1 ml-2 font-medium">
                because you like {genreNames && ` ${genreNames}`}
            </b>
            <div className="flex w-full h-auto flex-row gap-[3rem] overflow-hidden overflow-x-auto no-scrollbar">
                <Movies movies={recommendedGenreMovies} favouriteMovieIds={favouriteMoviesIds} isLoggedIn={true}/>
            </div>
        </>
    )
}

export { MoviesRecommendedByGenre }