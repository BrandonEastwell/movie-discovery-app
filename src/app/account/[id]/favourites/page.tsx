import '../../../globals.css';
import React, {Suspense} from "react";
import UserFavourites from "../../../../components/account/UserFavourites";

export default function Page() {

    return (
        <div className="wrapper w-full h-full flex flex-col gap-10 items-start justify-start flex-nowrap">
            <h1 className="flex items-center text-5xl font-vt323 text-pearl-white mt-4 ml-2 font-bold">
                Your Favourites Library
            </h1>
            <div className="flex flex-row flex-wrap gap-6">
                <div className="flex flex-row flex-wrap gap-6">
                    <Suspense fallback={<FavouriteFallback count={15} />}>
                        <UserFavourites />
                    </Suspense>
                </div>
            </div>
        </div>
    )
}

function FavouriteFallback({ count } : { count: number }) {
    const arr = Array.from({ length: count }, (_, i) => i);

    const Fallback = () => {
        return (
            <div className="flex flex-col w-full max-h-[325px] max-w-[250px]">
                <div className="cursor-pointer flex flex-row h-full w-full max-h-[250px] bg-midnight/80 backdrop-blur-[15px] ">
                </div>
                <div className="cursor-pointer w-full h-full px-3 m-0 backdrop-blur-[15px] bg-pearl-white"></div>
            </div>
        )
    }

    return (
        <>
            {arr.map((_, i) => (
                <Fallback key={i} />
            ))}
        </>
    )
}

