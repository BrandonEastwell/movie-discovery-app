'use client'
import React, {useEffect, useRef, useState} from "react"
import Link from 'next/link'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faCirclePlus, faHeart} from "@fortawesome/free-solid-svg-icons";
import Image from 'next/image'
import '../../app/styles/globals.css';
import {useRouter} from "next/navigation";
import Watchlist from "./watchlist-list";

interface Movie {
    id: number;
    title: string;
    poster_path: string;
    backdrop_path: string;
}

interface Person {
    name: string;
}

interface MovieListProps {
    movies: Movie[];
}

const Movies: React.FC<MovieListProps> = ({ movies }) => {
    const router = useRouter()
    const [ids, setIds] = useState<number[]>([]);
    const elemRefs = useRef<HTMLParagraphElement[]>([]);
    const [isVisible, setIsVisible] = useState(false); // Add isVisible state
    const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
    const [watchlistMovieID, setWatchlistMovieID] = useState<number | undefined>(undefined);

    useEffect(() => {
        const getFavouriteIds = async () => {
            try {
                const response = await fetch('http://localhost:3000/api/favourite', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });
                if (!response.ok) {
                    const errorData = await response.json();
                    console.error('Action failed:', errorData);
                }
                const body = await response.json();
                const data = body.result

                // Extracting movie IDs from the response
                const movieIds = data.map((movie: Movie) => movie.id);
                setIds(movieIds);
            } catch (error) {
                console.error('Action failed:', error);
            }
        };

        getFavouriteIds();
    }, []); // Empty dependency array to fetch IDs only once

    const handleFavourite = async (e: any) => {
        const movieid = e.currentTarget.value
        try {
            await fetch('http://localhost:3000/api/favourite', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({movieid}),
            }).then(async response => {
                if (!response.ok) {
                    const errorData = response.json();
                    console.error('Action failed:', errorData);
                    router.push('/signup');
                }
                return response.json()
            }).then(data => {
                const result = data.result;
            }).catch(errorData => {
                console.error('Action failed:', errorData);

            })
        } catch (error: any) {
            console.error('Action failed:', error.response?.data);
        }
    };

    const checkFavourite = (idToCheck: number) => {
        if (ids != null && ids.includes(idToCheck)) {
            return <button onClick={handleFavourite} value={idToCheck}
                           className="p-0 bg-transparent max-h-[32px] max-w-[32px] cursor-pointer">
                <FontAwesomeIcon
                    className={"text-Purple opacity-75"}
                    icon={faHeart} size="xl"/>
            </button>
        } else {
            return <button onClick={handleFavourite} value={idToCheck}
                           className="p-0 bg-transparent max-h-[32px] max-w-[32px] cursor-pointer">
                <FontAwesomeIcon
                    className={"text-pearl-white opacity-75"}
                    icon={faHeart} size="xl"/>
            </button>
        }
    }

    const imageLoader = ({src}: any) => {
        return `https://image.tmdb.org/t/p/w500${src}`;
    }

    const handleRef = (elem: HTMLParagraphElement | null) => {
        if (elem) {
            elemRefs.current.push(elem);
        }
    };

    const handlePlaylistClick = (event: React.MouseEvent, id: number) => {
        event.stopPropagation(); // Prevent the click event from bubbling up to parent elements
        const { clientX, clientY } = event;
        setCursorPosition({ x: clientX + 25, y: clientY + 25 });
        setIsVisible(!isVisible); // Toggle visibility of Watchlist component
        setWatchlistMovieID(id); // Set the movie id in state
    };

    return (
        <>
            {movies.map((movie) => (
                <div key={movie.id} className="flex h-full w-full flex-row max-h-[250px] max-w-[300px] align-middle">
                    <div className="flex flex-col max-w-[10px] justify-end gap-16 whitespace-nowrap mr-1">
                        <p className="m-0 -rotate-90 text-[#5F43B2] opacity-75 font-poppins font-semibold max-h-[10px] max-w-[10px] text-[0.6rem]">KODAK
                            PORTRA 400</p>
                        <p className="m-0 -rotate-90 text-[#5F43B2] opacity-75 font-poppins font-semibold max-h-[10px] max-w-[10px] text-[0.6rem]">17
                            42</p>
                        <p className="m-0 -rotate-90 text-[#5F43B2] opacity-75 font-poppins font-semibold max-h-[10px] max-w-[10px] text-[0.6rem]">KODAK</p>
                    </div>
                    <Link href={`/title/${movie.id}`} className="max-h-[250px] max-w-[250px]">
                        {movie.poster_path
                            && (
                                <Image
                                    className="w-[250px] h-[250px] dark:shadow-gray-800 object-cover object-center overflow-hidden"
                                    loader={imageLoader}
                                    src={`${movie?.backdrop_path}`}
                                    alt={`${movie?.title} Poster`}
                                    width={250}
                                    height={250}
                                />
                            )}
                    </Link>
                    <div className="flex flex-col max-w-[40px] justify-end gap-4">
                        <div className="gap-2 flex flex-col items-center max-w-[40px]">
                            <p ref={handleRef}
                               className="pointer-events-none mb-20 text-[2rem] m-0 w-[180px] max-h-[40px] uppercase -rotate-90 text-pearl-white opacity-75 font-vt323 whitespace-nowrap overflow-x-auto no-scrollbar">{movie.title}</p>
                            {checkFavourite(movie.id)}
                            <button onClick={(e) => handlePlaylistClick(e, movie.id)}
                                    className="p-0 bg-transparent max-h-[32px] max-w-[32px] cursor-pointer">
                                <FontAwesomeIcon className="text-pearl-white opacity-75" icon={faCirclePlus} size="xl"/>
                            </button>
                        </div>
                    </div>
                </div>
            ))}
            {isVisible && cursorPosition && (
                <div className="fixed left-0 top-0 w-screen h-screen bg-transparent z-10"
                     onClick={() => setIsVisible(false)}>
                    <Watchlist cursorPosition={cursorPosition} movieid={watchlistMovieID}></Watchlist>
                </div>
            )}
        </>
    );
}

const MovieList: React.FC<MovieListProps> = ({ movies }) => {
    return <Movies movies={movies} />;
};

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