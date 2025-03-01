import {router} from "next/client";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faHeart} from "@fortawesome/free-solid-svg-icons";
import React, {useState} from "react";

export default function AddFavouriteBtn({movieId, isFavourite} : {movieId: number, isFavourite: boolean}) {
    const [favourite, setFavourite] = useState<boolean>(isFavourite);

    return (
        <button onClick={(event) => {
            handleFavourite(event);
            setFavourite(!favourite);
        }} value={movieId}
                className="p-0 bg-transparent max-h-[32px] max-w-[32px] cursor-pointer">
            <FontAwesomeIcon
                className={favourite ? "text-Purple" : "text-pearl-white" + " opacity-75"}
                icon={faHeart} size="xl"/>
        </button>
    )
}

const handleFavourite = async (e: any) => {
    const movieid = e.currentTarget.value
    try {
        const response = await fetch('http://localhost:3000/api/favourite', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({movieid}),
        })
        const data = await response.json();

        if (response.ok) {
            console.log(data.result);
        } else {
            console.error('Action failed:', data.error);
            await router.push('/signup');
        }
    } catch (error: any) {
        console.error('Action failed:', error.response?.data);
    }
}