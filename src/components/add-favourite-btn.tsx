import {router} from "next/client";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faHeart} from "@fortawesome/free-solid-svg-icons";
import React from "react";

export default function AddFavouriteBtn({movieId, isFavourite} : {movieId: number, isFavourite: boolean}) {
    return (
        <button onClick={handleFavourite} value={movieId}
                className="p-0 bg-transparent max-h-[32px] max-w-[32px] cursor-pointer">
            <FontAwesomeIcon
                className={isFavourite ? "text-Purple" : "text-pearl-white" + " opacity-75"}
                icon={faHeart} size="xl"/>
        </button>
    )
}

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
                await router.push('/signup');
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
}