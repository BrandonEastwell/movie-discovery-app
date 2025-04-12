import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faHeart} from "@fortawesome/free-solid-svg-icons";
import React, {useState} from "react";
import { motion } from "framer-motion";
import {toggleFavouriteMovie} from "../../lib/api/client_requests/favourites";
import ReactDOM from "react-dom";
import AuthPopup from "../forms/AuthPopup";

export default function AddToFavouriteBtn({isLoggedIn, setIsFavourite, isFavourite, movieId} : {isLoggedIn: boolean, setIsFavourite: (value: boolean) => void, isFavourite: boolean, movieId: number}) {
    const [showAuthForm, setShowAuthForm] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false);

    const toggleFavourite = async (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        event.stopPropagation();

        if (isLoggedIn) {
            const newFavouriteState = !isFavourite;
            setIsFavourite(newFavouriteState); // Optimistic UI
            setLoading(true); // Set loading state to disable button
            try {
                const response: {success: boolean} = await toggleFavouriteMovie(movieId);
                if (!response.success) throw new Error('Failed to add to favourites')
            } catch (e) {
                // Set favourite back to original state if request fails
                setIsFavourite(!newFavouriteState);
            } finally {
                setLoading(false);
            }
        } else {
            setShowAuthForm(true);
            setLoading(false);
        }
    }

    return (
        <>
            <motion.button disabled={loading} onClick={toggleFavourite} whileHover={{scale: 1.1}} whileTap={{scale: 0.9}}
                           className="p-0 bg-transparent max-h-[32px] max-w-[32px] cursor-pointer">
                <FontAwesomeIcon
                    className={isFavourite ? "text-Purple" : "text-pearl-white" + " opacity-75"}
                    icon={faHeart} size="xl"/>
            </motion.button>
            {showAuthForm && ReactDOM.createPortal(<AuthPopup action={"login"} setIsVisible={(visible: boolean) => setShowAuthForm(visible)} />, document.body)}
        </>
    )
}
