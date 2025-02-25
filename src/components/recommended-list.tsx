import React, {useEffect, useState} from "react";

interface Person {
    name: string;
}

const Recommended: React.FC = () => {
    const [recommendedCast, setRecommendedCast] = useState<Movie[]>([]);
    const [recommendedCastStrings, setRecommendedCastStrings] = useState<Person[]>([]);
    const [recommendedGenre, setRecommendedGenre] = useState<Movie[]>([]);
    const [recommendedGenreStrings, setRecommendedGenreStrings] = useState<string[]>([]);
    const [recommendedCrew, setRecommendedCrew] = useState<Movie[]>([]);
    const [recommendedCrewStrings, setRecommendedCrewStrings] = useState<Person[]>([]);

    const [loggedIn, setLoggedIn] = useState<boolean>(false);
    const [favouriteMovies, setFavourites] = useState<Movie[]>([]);


    useEffect(() => {
        const authenticate = async () => {
            try {
                const response = await fetch(`http://localhost:3000/api/auth-session`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({}),
                });
                const data = await response.json();
                if (response.ok) {
                    setLoggedIn(true)
                } else {
                    console.error(data.error);
                }
            } catch (error) {
                console.error('Error:', error);
            }
        };
        authenticate();
    }, []);

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

                    setRecommendedCast(cast[0]);
                    setRecommendedGenre(genre[0]);
                    setRecommendedCrew(crew[0]);

                    // Store string values of each recommended genre, cast, and crew
                    setRecommendedGenreStrings(genre[1]);
                    setRecommendedCastStrings(cast[1]);
                    setRecommendedCrewStrings(crew[1]);
                    const fetchMovies = async () => {
                        try {
                            const response = await fetch('http://localhost:3000/api/favourite', {
                                method: 'GET',
                                headers: {
                                    'Content-Type': 'application/json',
                                },
                            });
                            if (!response.ok) {
                                throw new Error('Failed to fetch favourite movies');
                            }
                            const data = await response.json();
                            setFavourites(data.result);


                        } catch (error) {
                            console.error('Error fetching favourite movies:', error);
                            // Handle error, maybe display an error message to the user
                        }
                    };
                    fetchMovies();


                }
            } catch (error: any) {
                console.error('Action failed:', error.response?.data);
            }
        }
        if (loggedIn) {
            generatePreferences()
        }
    }, [loggedIn]);


    if (loggedIn) {
        // Remove favorite movies from the recommended movie sets
        const filteredRecommendedGenre = recommendedGenre.filter(movie => !favouriteMovies.some(fav => fav.id === movie.id));
        const filteredRecommendedCast = recommendedCast.filter(movie => !favouriteMovies.some(fav => fav.id === movie.id));
        const filteredRecommendedCrew = recommendedCrew.filter(movie => !favouriteMovies.some(fav => fav.id === movie.id));

        if (filteredRecommendedGenre.length + filteredRecommendedCrew.length + filteredRecommendedCast.length === 0) {
            return <p>Add movies to your favorites to get recommendations.</p>;
        }

        // Map over recommended genre strings and concatenate names
        const genreNames = recommendedGenreStrings.join(', ');
        // Map over recommended cast strings and concatenate names
        const castNames = recommendedCastStrings.map(person => person.name).join(', ');
        // Map over recommended crew strings and concatenate names
        const crewNames = recommendedCrewStrings.map(person => person.name).join(', ');

        return (
            <>
                <b className="flex items-center text-[3rem] font-vt323 text-pearl-white mt-4 ml-2 font-medium">
                    SELECTED FOR YOU
                </b>
                <b className="flex items-center text-[1rem] font-vt323 text-pearl-white mt-1 ml-2 font-medium">
                    because you like {genreNames && ` ${genreNames}`}
                </b>
                <div className="flex w-full h-auto flex-row gap-[3rem] overflow-hidden overflow-x-auto no-scrollbar">
                    <MovieList movies={filteredRecommendedGenre}/>
                </div>
                <b className="flex items-center text-[1rem] font-vt323 text-pearl-white mt-1 ml-2 font-medium">
                    because you like {castNames && ` ${castNames}`}
                </b>
                <div className="flex w-full h-auto flex-row gap-[3rem] overflow-hidden overflow-x-auto no-scrollbar">
                    <MovieList movies={filteredRecommendedCast}/>
                </div>
                <b className="flex items-center text-[1rem] font-vt323 text-pearl-white mt-1 ml-2 font-medium">
                    because you like {crewNames && ` ${crewNames}`}
                </b>
                <div className="flex w-full h-auto flex-row gap-[3rem] overflow-hidden overflow-x-auto no-scrollbar">
                    <MovieList movies={filteredRecommendedCrew}/>
                </div>
            </>
        )
    }
};

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


export { Recommended, MovieList };