import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faHeart} from "@fortawesome/free-solid-svg-icons";
import React from "react";
import useFavourite from "../lib/hooks/useFavourite";

export default function AddFavouriteButton({movieId, isFavourite, isLoggedIn} : {movieId: number, isFavourite: boolean, isLoggedIn: boolean}) {
    const favourite = useFavourite(isFavourite, movieId)

    const handleFavourite = async (e: any) => {
        const movieid = e.currentTarget.value;
        await favourite.toggleFavourite();
    }

    return (
        <button onClick={(event) => handleFavourite(event)} value={movieId}
                className="p-0 bg-transparent max-h-[32px] max-w-[32px] cursor-pointer">
            <FontAwesomeIcon
                className={favourite.favourite ? "text-Purple" : "text-pearl-white" + " opacity-75"}
                icon={faHeart} size="xl"/>
        </button>
    )
}
