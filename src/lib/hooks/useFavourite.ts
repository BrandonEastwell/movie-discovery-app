import {useState} from "react";
import {useRouter} from "next/navigation";
import {toggleFavouriteMovie} from "../api/client/favourites";

const useFavourite = (isFavourite : boolean, movieid : number) => {
    const [favourite, setFavourite] = useState<boolean>(isFavourite);
    const router = useRouter();

    const toggleFavourite = async () => {
        const response = await toggleFavouriteMovie(movieid);

        if (response.success) {
            setFavourite(!favourite);
        } else {
            router.push('/signup');
        }
    }

    return {favourite, toggleFavourite}
}

export default useFavourite