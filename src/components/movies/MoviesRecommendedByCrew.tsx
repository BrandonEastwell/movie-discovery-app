import {MoviesList} from "./MoviesList";
import React from "react";
import {Movie} from "../../lib/utils/types/movies";
import {Person} from "../../lib/utils/types/person";

interface RecommendedProps {
    favouriteMoviesIds: number[];
    recommendedCrewMovies: Movie[];
    recommendedCrewMembers: Person[];
}

const MoviesRecommendedByCrew: React.FC<RecommendedProps> = ({ favouriteMoviesIds, recommendedCrewMovies, recommendedCrewMembers }) => {
    // Map over recommended crew strings and concatenate names
    const crewNames = recommendedCrewMembers.map((person) => person.name).join(', ');

    return (
        <>
            <b className="flex items-center text-[1rem] font-vt323 text-pearl-white mt-1 ml-2 font-medium">
                because you like {crewNames && ` ${crewNames}`}
            </b>
            <div className="flex w-full h-auto flex-row gap-[3rem] overflow-hidden overflow-x-auto no-scrollbar">
                <MoviesList movies={recommendedCrewMovies} favouriteMovieIds={favouriteMoviesIds} isLoggedIn={true}/>
            </div>
        </>
    )
}

export default MoviesRecommendedByCrew