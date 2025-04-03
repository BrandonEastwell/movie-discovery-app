import '../../../styles/globals.css';
import React, {Suspense} from "react";
import UserFavourites from "../../../../components/client/account/UserFavourites";

export default function Page() {

    return (
        <div className="wrapper w-full h-full flex flex-col gap-10 items-start justify-start flex-nowrap">
            <b className="flex items-center text-[3rem] font-vt323 text-pearl-white mt-4 ml-2 font-medium">
                YOUR FAVOURITES
            </b>
            <div className="flex flex-row flex-wrap gap-6">
                <div className="flex flex-row flex-wrap gap-6">
                    <Suspense fallback={<p>Loading favourites..</p>}>
                        <UserFavourites />
                    </Suspense>
                </div>
            </div>
        </div>
    )
}

