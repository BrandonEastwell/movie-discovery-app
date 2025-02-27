import React, {useEffect, useState} from "react";
import {Movies} from "./client/movies-list";
import {getFavouriteMovies} from "../lib/api/client/favourites";

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

        useEffect(() => {
            const generatePreferences = async () => {
                try {
                    const response = await fetch('http://localhost:3000/api/update-preferences', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({}),
                    });
                    const updatedPreferences = await response.json();
                    if (response.ok && updatedPreferences.result) {
                        const cast = await fetchRecommendedMovies('http://localhost:3000/api/recommended/cast');
                        const genre = await fetchRecommendedMovies('http://localhost:3000/api/recommended/genre');
                        const crew = await fetchRecommendedMovies('http://localhost:3000/api/recommended/crew');
                        const favourites: Movie[] = await getFavouriteMovies();

                        setRecommendedCast(cast[0]);
                        setRecommendedGenre(genre[0]);
                        setRecommendedCrew(crew[0]);

                        // Store string values of each recommended genre, cast, and crew
                        setRecommendedGenreStrings(genre[1]);
                        setRecommendedCastStrings(cast[1]);
                        setRecommendedCrewStrings(crew[1]);

                        // Store favourite movies in state
                        setFavourites(favourites);

                    }
                } catch (error: any) {
                    console.error('Action failed:', error.response?.data);
                }
            }

            generatePreferences();
        }, []);

        return (
            <>
                <b className="flex items-center text-[3rem] font-vt323 text-pearl-white mt-4 ml-2 font-medium">
                    SELECTED FOR YOU
                </b>
                <b className="flex items-center text-[1rem] font-vt323 text-pearl-white mt-1 ml-2 font-medium">
                    because you like {genreNames && ` ${genreNames}`}
                </b>
                <div className="flex w-full h-auto flex-row gap-[3rem] overflow-hidden overflow-x-auto no-scrollbar">
                    <Movies movies={filteredRecommendedGenre} favouriteMovieIds={favouriteMoviesIds}/>
                </div>
                <b className="flex items-center text-[1rem] font-vt323 text-pearl-white mt-1 ml-2 font-medium">
                    because you like {castNames && ` ${castNames}`}
                </b>
                <div className="flex w-full h-auto flex-row gap-[3rem] overflow-hidden overflow-x-auto no-scrollbar">
                    <Movies movies={filteredRecommendedCast} favouriteMovieIds={favouriteMoviesIds}/>
                </div>
                <b className="flex items-center text-[1rem] font-vt323 text-pearl-white mt-1 ml-2 font-medium">
                    because you like {crewNames && ` ${crewNames}`}
                </b>
                <div className="flex w-full h-auto flex-row gap-[3rem] overflow-hidden overflow-x-auto no-scrollbar">
                    <Movies movies={filteredRecommendedCrew} favouriteMovieIds={favouriteMoviesIds}/>
                </div>
            </>
        )
    }

const fetchRecommendedMovies = async (url: string): Promise<[Movie[], any[]]> => {
    try {
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        });
        const data = await response.json();
        if (response.ok && data.result) {
            return [data.movies, data.strings];
        } else {
            throw new Error('Failed to fetch recommended movies');
        }
    } catch (error: any) {
        console.error('Action failed:', error.response?.data);
        throw new Error('Failed to fetch recommended movies');
    }
};

export {UserRecommendedMovies}