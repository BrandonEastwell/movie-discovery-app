import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faHeart} from "@fortawesome/free-solid-svg-icons";
import React from "react";
import { motion } from "framer-motion";

export default function AddToFavouriteBtn({isFavourite, toggleFavourite} : {isFavourite: boolean, toggleFavourite: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void}) {

    return (
        <motion.button onClick={(event) => toggleFavourite(event)} whileHover={{scale: 1.1}} whileTap={{scale: 0.9}}
                className="p-0 bg-transparent max-h-[32px] max-w-[32px] cursor-pointer">
            <FontAwesomeIcon
                className={isFavourite ? "text-Purple" : "text-pearl-white" + " opacity-75"}
                icon={faHeart} size="xl"/>
        </motion.button>
    )
}
