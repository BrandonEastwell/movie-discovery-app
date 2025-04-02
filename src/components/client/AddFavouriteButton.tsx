import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faHeart} from "@fortawesome/free-solid-svg-icons";
import React from "react";
import useFavourite from "../../lib/hooks/useFavourite";
import { motion } from "framer-motion";

export default function AddFavouriteButton({movieId, isFavourite, isLoggedIn} : {movieId: number, isFavourite: boolean, isLoggedIn: boolean}) {
    const favourite = useFavourite(isFavourite, movieId, isLoggedIn)

    return (
        <motion.button onClick={favourite.toggleFavourite} value={movieId} whileHover={{scale: 1.1}} whileTap={{scale: 0.9}}
                className="p-0 bg-transparent max-h-[32px] max-w-[32px] cursor-pointer">
            <FontAwesomeIcon
                className={favourite.favourite ? "text-Purple" : "text-pearl-white" + " opacity-75"}
                icon={faHeart} size="xl"/>
        </motion.button>
    )
}
