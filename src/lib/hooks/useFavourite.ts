import React, {useState} from "react";
import {useRouter} from "next/navigation";
import {toggleFavouriteMovie} from "../api/client_requests/favourites";

const useFavourite = (isFavourite : boolean, movieid : number, isLoggedIn : boolean) => {
    const [favourite, setFavourite] = useState<boolean>(isFavourite);
    const router = useRouter();

    const toggleFavourite = async (event : React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        event.stopPropagation();
        setFavourite(!favourite);
        if (isLoggedIn) {
            const response: {success: boolean} = await toggleFavouriteMovie(movieid);
            if (!response.success) {
                setFavourite(!favourite);
                return response;
            }
            return response;
        } else {
            router.push('auth/login');
        }
    }

    return {favourite, toggleFavourite}
}

export default useFavourite