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

interface MovieListProps {
    movies: Movie[] | null;
}
const MoviesTrending: React.FC<MovieListProps> = ({ movies }) => {
    const [isMovieFavourite, setIsMovieFavourite] = useState(false);
    const router = useRouter()
    const [ids, setIds] = useState<number[]>([]);

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

    const handleFavourite = async (e : any) => {
        const movieid = e.currentTarget.value
        try {
            await fetch('http://localhost:3000/api/favourite', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ movieid }),
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
        } catch (error : any) {
            console.error('Action failed:', error.response?.data);
        }
    };

    const checkFavourite = (idToCheck : number) => {
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

    if (!movies || movies.length === 0) {
        return <p>No movies found.</p>;
    }
    const imageLoader = ({src}: any) => {
        return `https://image.tmdb.org/t/p/w500${src}`
    }

    const elemRefs = useRef<HTMLParagraphElement[]>([]);
    const scrollIntervalRef = useRef<NodeJS.Timeout[]>([]);
    const [scrollDirections, setScrollDirections] = useState<(1 | -1)[]>(movies.map(() => 1)); // 1 for right, -1 for left

    useEffect(() => {
        scrollIntervalRef.current = movies.map((_, index) => {
            return setInterval(() => {
                const elem = elemRefs.current[index];
                if (elem) {
                    const isAtStart = elem.scrollLeft === 0;
                    const isAtEnd = elem.scrollLeft + elem.clientWidth === elem.scrollWidth;
                    if (isAtStart && scrollDirections[index] === -1) {
                        setScrollDirections((prevDirections) => {
                            const newDirections = [...prevDirections];
                            newDirections[index] = 1; // Change direction to right
                            return newDirections;
                        });
                    } else if (isAtEnd && scrollDirections[index] === 1) {
                        setScrollDirections((prevDirections) => {
                            const newDirections = [...prevDirections];
                            newDirections[index] = -1; // Change direction to left
                            return newDirections;
                        });
                    }
                    elem.scrollTo({
                        left: elem.scrollLeft + scrollDirections[index],
                        behavior: 'smooth',
                    });
                }
            }, 50);
        });

        return () => {
            scrollIntervalRef.current.forEach((interval) => clearInterval(interval));
        };
    }, [movies, scrollDirections]);

    return (
        movies.map((movie, index) => {
            const [isVisible, setIsVisible] = useState<boolean>(false);
            const [cursorPosition, setCursorPosition] = useState<{ x: number; y: number } | null>(null);
            const handlePlaylistClick = (event: React.MouseEvent) => {
                const { clientX, clientY } = event;
                setCursorPosition({ x: clientX + 25, y: clientY + 25 });
                setIsVisible(!isVisible); // Set visibility to false to remove the component
            };
            return (
            <div key={movie.id} className="flex flex-row max-h-[275px] max-w-[300px] align-middle">
                <div className="flex flex-col max-w-[10px] justify-end gap-16 whitespace-nowrap mr-1">
                    <p className="m-0 -rotate-90 text-[#5F43B2] opacity-75 font-poppins font-semibold max-h-[10px] max-w-[10px] text-[0.6rem]">KODAK PORTRA 400</p>
                    <p className="m-0 -rotate-90 text-[#5F43B2] opacity-75 font-poppins font-semibold max-h-[10px] max-w-[10px] text-[0.6rem]">17 42</p>
                    <p className="m-0 -rotate-90 text-[#5F43B2] opacity-75 font-poppins font-semibold max-h-[10px] max-w-[10px] text-[0.6rem]">KODAK</p>
                </div>
                <Link href={`/title/${movie.id}`} className="max-h-[250px] max-w-[250px]">
                    {movie.poster_path
                        && (
                            <Image className="w-[250px] h-[250px] dark:shadow-gray-800 object-cover object-center"
                                   loader={imageLoader}
                                   src={`${movie?.backdrop_path}`}
                                   alt={`${movie?.title} Poster`}
                                   width={275}
                                   height={275}
                            />
                        )}
                </Link>
                <div className="flex flex-col max-w-[40px] justify-end gap-4">
                    <div className="gap-2 flex flex-col items-center max-w-[40px]">
                        <p ref={(elem) => (elemRefs.current[index] = elem || undefined as unknown as HTMLParagraphElement)} className="pointer-events-none mb-20 text-[2rem] m-0 w-[180px] max-h-[40px] uppercase -rotate-90 text-pearl-white opacity-75 font-vt323 whitespace-nowrap overflow-x-auto no-scrollbar">{movie.title}</p>
                        { checkFavourite(movie.id) }
                        <button onClick={handlePlaylistClick} value={movie.id}
                                className="p-0 bg-transparent max-h-[32px] max-w-[32px] cursor-pointer">
                            <FontAwesomeIcon className="text-pearl-white opacity-75" icon={faCirclePlus} size="xl"/>
                        </button>

                        {isVisible && cursorPosition && (
                            <div className="fixed left-0 top-0 w-screen h-screen bg-transparent z-10" onClick={handlePlaylistClick}>
                                <Watchlist cursorPosition={cursorPosition} movieid={movie.id} ></Watchlist>
                            </div>
                        )}
                    </div>
                </div>
            </div>
            );
        })
    );
};

export default MoviesTrending;
