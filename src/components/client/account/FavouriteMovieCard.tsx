import React, {useState} from "react";
import {useRouter} from "next/navigation";
import {toggleFavouriteMovie} from "../../../lib/api/client_requests/favourites";
import {AnimatePresence, motion} from "framer-motion";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faHeart} from "@fortawesome/free-solid-svg-icons";
import Image from "next/image";

export default function FavouriteMovieCard({favouriteMovie, setMovie, movies} : {favouriteMovie: Movie, setMovie: (movies: Movie[]) => void, movies: Movie[]}) {
    const [hover, setHover] = useState<boolean>(false);
    const router = useRouter();

    const imageLoader = ({src}: any) => {
        return `https://image.tmdb.org/t/p/w500${src}`;
    }

    const cardHoverVarients = {
        visible: {
            opacity: 1,
            transition: {
                duration: 0.2,
                ease: "easeInOut"
            }
        },
        hidden: {
            opacity: 0,
            transition: {
                duration: 0.2,
                ease: "easeInOut"
            }
        }
    }

    const toggleFavourite = async (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        event.stopPropagation();
        const response: { success: boolean } = await toggleFavouriteMovie(favouriteMovie.id);
        if (response.success) {
            setMovie(movies.filter(movie => movie.id !== favouriteMovie.id))
        }
    }

    const navigateToMovie = async () => {
        router.push(`/title/${favouriteMovie.id}`)
    }

    return (
        <div className="flex flex-col w-full max-h-[325px] max-w-[250px]">
            <div className="flex h-full w-full flex-row max-h-[250px] align-middle">
                <div className="flex flex-col max-w-[10px] justify-end gap-16 whitespace-nowrap mr-1">
                    <p className="m-0 -rotate-90 text-[#5F43B2] opacity-50 font-poppins font-semibold max-h-[10px] max-w-[10px] text-[0.6rem]">KODAK
                        PORTRA 400</p>
                    <p className="m-0 -rotate-90 text-[#5F43B2] opacity-50 font-poppins font-semibold max-h-[10px] max-w-[10px] text-[0.6rem]">17
                        42</p>
                    <p className="m-0 -rotate-90 text-[#5F43B2] opacity-50 font-poppins font-semibold max-h-[10px] max-w-[10px] text-[0.6rem]">KODAK</p>
                </div>
                <motion.div onClick={navigateToMovie} className="cursor-pointer relative max-h-[250px] max-w-[250px]" onHoverStart={() => setHover(true)} onHoverEnd={() => setHover(false)}>
                    <AnimatePresence>
                        { hover &&
                            <motion.div className="absolute bg-midnight/50 w-full h-full flex flex-col place-items-center justify-center" variants={cardHoverVarients} animate="visible" exit="hidden" initial="hidden">
                                <motion.div className="max-w-[80px] pl-1" initial={{scale: 0}} animate={{scale: 1}} exit={{scale: 0}}>
                                    <motion.button onClick={(event) => toggleFavourite(event)} whileHover={{scale: 1.1}} whileTap={{scale: 0.9}}
                                                   className="z-20 p-0 bg-transparent max-h-[60px] max-w-[60px] cursor-pointer">
                                        <FontAwesomeIcon
                                            className="text-Purple w-full h-full"
                                            icon={faHeart} size={"xl"}/>
                                    </motion.button>
                                </motion.div>
                            </motion.div>
                        }
                    </AnimatePresence>
                    {favouriteMovie.poster_path
                        && (
                            <Image
                                className="w-[250px] h-[250px] object-cover object-center overflow-hidden"
                                loader={imageLoader}
                                src={`${favouriteMovie?.backdrop_path}`}
                                alt={`${favouriteMovie?.title} Poster`}
                                width={250}
                                height={250}
                            />
                        )}
                </motion.div>
            </div>
            <p onClick={navigateToMovie} className="cursor-pointer px-3 m-0 text-3xl uppercase text-pearl-white font-vt323">{favouriteMovie.title}</p>
        </div>
    )
}